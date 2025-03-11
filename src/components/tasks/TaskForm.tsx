
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Task, TaskStatus, TaskPriority } from '@/utils/types/taskTypes';
import { useAuth } from '@/contexts/AuthContext';
import { createTask, updateTask } from '@/utils/api/taskApi';
import { toast } from 'sonner';

// Form schema
const taskFormSchema = z.object({
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

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  initialData?: Task;
  onTaskCreated?: (task: Task) => void;
  onTaskUpdated?: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  initialData, 
  onTaskCreated, 
  onTaskUpdated, 
  onCancel 
}) => {
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
      dueTime: initialData.dueDate ? format(new Date(initialData.dueDate), 'HH:mm') : undefined,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detailed description of the task" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignee</FormLabel>
                <FormControl>
                  <Input placeholder="User ID of assignee" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the user ID of the person to assign this task to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="dueTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Time (24-hour format)</FormLabel>
              <div className="flex">
                <FormControl>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="time" 
                      placeholder="Select time"
                      {...field}
                    />
                  </div>
                </FormControl>
              </div>
              <FormDescription>
                Optional. Specify a time for the due date if needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="relatedItemType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Item Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select related item type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="incident">Incident</SelectItem>
                    <SelectItem value="service-request">Service Request</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select what type of item this task relates to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relatedItemId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Item ID</FormLabel>
                <FormControl>
                  <Input placeholder="ID of the related item" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the ID of the related item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {isEditMode ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
