import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Task, ChecklistItem, TaskStatus, TaskPriority } from '@/utils/types/taskTypes';
import { useAuth } from '@/contexts/AuthContext';
import { createTask, updateTask } from '@/utils/api/taskApi';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Form schema with fixed relatedItemType type
export const taskFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  status: z.enum(['new', 'in-progress', 'on-hold', 'completed', 'cancelled'] as const),
  priority: z.enum(['critical', 'high', 'medium', 'low'] as const),
  assignee: z.string().optional(),
  dueDate: z.date().optional(),
  dueTime: z.string().optional(),
  relatedItemId: z.string().optional(),
  relatedItemType: z.enum(['incident', 'service-request', 'task']).optional(),
  // New enhanced fields
  estimatedHours: z.number().min(0).optional(),
  dependsOn: z.array(z.string()).optional(),
  blockedBy: z.array(z.string()).optional(),
  checklist: z.array(z.object({
    id: z.string(),
    text: z.string(),
    completed: z.boolean(),
    // Add these for compatibility
    content: z.string().optional(),
    status: z.string().optional(),
  })).optional(),
  isTemplate: z.boolean().optional(),
  templateId: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

interface UseTaskFormProps {
  initialData?: Task;
  onTaskCreated?: (task: Task) => void;
  onTaskUpdated?: (task: Task) => void;
  templateData?: Task; // For creating from template
}

export const useTaskForm = ({ 
  initialData, 
  onTaskCreated, 
  onTaskUpdated,
  templateData
}: UseTaskFormProps = {}) => {
  const { user } = useAuth();
  const isEditMode = !!initialData;
  const isFromTemplate = !!templateData;

  const getInitialChecklist = () => {
    if (initialData?.checklist) {
      return initialData.checklist.map(item => ({
        id: item.id,
        text: item.text || item.content || '',
        completed: item.completed || (item.status === 'completed'),
        content: item.content || item.text || '',
        status: item.status || (item.completed ? 'completed' : 'pending')
      }));
    } else if (templateData?.checklist) {
      return templateData.checklist.map(item => ({
        id: uuidv4(),
        text: item.text || item.content || '',
        completed: false,
        content: item.content || item.text || '',
        status: 'pending'
      }));
    }
    return [];
  };

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      status: initialData.status as TaskStatus,
      priority: initialData.priority as TaskPriority,
      assignee: initialData.assignee || '',
      dueDate: initialData.dueDate ? new Date(initialData.dueDate) : undefined,
      dueTime: initialData.dueDate ? new Date(initialData.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : undefined,
      relatedItemId: initialData.relatedItemId || '',
      relatedItemType: initialData.relatedItemType as "incident" | "service-request" | "task" | undefined,
      // New enhanced fields
      estimatedHours: initialData.estimatedHours,
      dependsOn: initialData.dependsOn || [],
      blockedBy: initialData.blockedBy || [],
      checklist: getInitialChecklist(),
      isTemplate: initialData.isTemplate || false,
    } : templateData ? {
      title: templateData.isTemplate ? `Copy of ${templateData.title}` : templateData.title,
      description: templateData.description,
      status: 'new' as TaskStatus,
      priority: templateData.priority as TaskPriority,
      assignee: user?.id || '',
      dueDate: undefined,
      dueTime: undefined,
      relatedItemId: '',
      relatedItemType: undefined,
      // New enhanced fields
      estimatedHours: templateData.estimatedHours,
      dependsOn: [],
      blockedBy: [],
      checklist: getInitialChecklist(),
      isTemplate: false,
      templateId: templateData.id,
    } : {
      title: '',
      description: '',
      status: 'new' as TaskStatus,
      priority: 'medium' as TaskPriority,
      assignee: user?.id || '',
      dueDate: undefined,
      dueTime: undefined,
      relatedItemId: '',
      relatedItemType: undefined,
      // New enhanced fields
      estimatedHours: undefined,
      dependsOn: [],
      blockedBy: [],
      checklist: [],
      isTemplate: false,
    },
  });

  const addChecklistItem = () => {
    const currentChecklist = form.getValues('checklist') || [];
    form.setValue('checklist', [
      ...currentChecklist,
      { 
        id: uuidv4(), 
        text: '', 
        completed: false,
        content: '',
        status: 'pending'
      }
    ]);
  };

  const removeChecklistItem = (id: string) => {
    const currentChecklist = form.getValues('checklist') || [];
    form.setValue('checklist', currentChecklist.filter(item => item.id !== id));
  };

  const onSubmit = async (values: TaskFormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to create tasks');
        return;
      }

      // Combine date and time if both are provided
      let dueDateTime: Date | undefined = values.dueDate;
      if (dueDateTime && values.dueTime) {
        const [hours, minutes] = values.dueTime.split(':').map(Number);
        dueDateTime = new Date(dueDateTime);
        dueDateTime.setHours(hours, minutes);
      }

      // Format checklist items properly and convert dates to ISO strings
      const checklist: ChecklistItem[] = values.checklist?.map(item => ({
        id: item.id,
        text: item.text,
        content: item.text, // Ensure content is always set
        completed: item.completed,
        status: item.completed ? 'completed' : 'pending', // Ensure status is always set
        createdAt: new Date().toISOString(), // Convert Date to string
        completedAt: item.completed ? new Date().toISOString() : undefined, // Convert Date to string if available
      })) || [];

      if (isEditMode && initialData) {
        // Update existing task
        const result = await updateTask(initialData.id, {
          ...values,
          dueDate: dueDateTime ? dueDateTime.toISOString() : undefined, // Convert Date to string
          updatedAt: new Date().toISOString(), // Convert Date to string
          checklist
        });

        if (result.success) {
          toast.success('Task updated successfully');
          onTaskUpdated?.(result.data);
        } else {
          toast.error('Failed to update task');
        }
      } else {
        // Create new task
        const result = await createTask({
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          creator: user.id,
          assignee: values.assignee,
          dueDate: dueDateTime ? dueDateTime.toISOString() : undefined, // Convert Date to string
          relatedItemId: values.relatedItemId,
          relatedItemType: values.relatedItemType,
          // New enhanced fields
          estimatedHours: values.estimatedHours,
          dependsOn: values.dependsOn,
          blockedBy: values.blockedBy,
          checklist,
          isTemplate: values.isTemplate,
          templateId: values.templateId,
        });

        if (result.success) {
          toast.success(values.isTemplate ? 'Task template created successfully' : 'Task created successfully');
          onTaskCreated?.(result.data);
          form.reset();
        } else {
          toast.error('Failed to create task');
        }
      }
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('An error occurred while saving the task');
    }
  };

  return {
    form,
    isEditMode,
    isFromTemplate,
    onSubmit,
    addChecklistItem: () => {
      const currentChecklist = form.getValues('checklist') || [];
      form.setValue('checklist', [
        ...currentChecklist,
        { id: uuidv4(), text: '', completed: false, content: '', status: 'pending' }
      ]);
    },
    removeChecklistItem: (id: string) => {
      const currentChecklist = form.getValues('checklist') || [];
      form.setValue('checklist', currentChecklist.filter(item => item.id !== id));
    }
  };
};
