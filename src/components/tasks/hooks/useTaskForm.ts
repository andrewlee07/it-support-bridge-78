
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Task } from '@/utils/types/taskTypes';
import { useAuth } from '@/contexts/AuthContext';
import { createTask, updateTask } from '@/utils/api/taskApi';
import { toast } from 'sonner';

// Form schema
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
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

interface UseTaskFormProps {
  initialData?: Task;
  onTaskCreated?: (task: Task) => void;
  onTaskUpdated?: (task: Task) => void;
}

export const useTaskForm = ({ 
  initialData, 
  onTaskCreated, 
  onTaskUpdated 
}: UseTaskFormProps) => {
  const { user } = useAuth();
  const isEditMode = !!initialData;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      status: initialData.status,
      priority: initialData.priority,
      assignee: initialData.assignee || '',
      dueDate: initialData.dueDate ? new Date(initialData.dueDate) : undefined,
      dueTime: initialData.dueDate ? new Date(initialData.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : undefined,
      relatedItemId: initialData.relatedItemId || '',
      relatedItemType: initialData.relatedItemType,
    } : {
      title: '',
      description: '',
      status: 'new',
      priority: 'medium',
      assignee: user?.id || '',
      dueDate: undefined,
      dueTime: undefined,
      relatedItemId: '',
      relatedItemType: undefined,
    },
  });

  const onSubmit = async (values: TaskFormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to create tasks');
        return;
      }

      // Combine date and time if both are provided
      let dueDateTime = values.dueDate;
      if (dueDateTime && values.dueTime) {
        const [hours, minutes] = values.dueTime.split(':').map(Number);
        dueDateTime = new Date(dueDateTime);
        dueDateTime.setHours(hours, minutes);
      }

      if (isEditMode && initialData) {
        // Update existing task
        const result = await updateTask(initialData.id, {
          ...values,
          dueDate: dueDateTime,
          updatedAt: new Date()
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
          dueDate: dueDateTime,
          relatedItemId: values.relatedItemId,
          relatedItemType: values.relatedItemType
        });

        if (result.success) {
          toast.success('Task created successfully');
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
    onSubmit,
  };
};
