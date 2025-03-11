
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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createReminder, updateReminder } from '@/utils/api/taskApi';
import { toast } from 'sonner';
import { Reminder, ReminderFormValues, ReminderTriggerType, ReminderFrequency, ReminderDeliveryMethod } from '@/utils/types/reminderTypes';

// Form schema
const reminderFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().optional(),
  triggerType: z.enum(['time-based', 'event-based'] as const),
  triggerTime: z.date().optional()
    .refine(date => !date || date > new Date(), {
      message: 'Trigger time must be in the future',
      path: ['triggerTime']
    }),
  frequency: z.enum(['one-time', 'daily', 'weekly', 'monthly', 'custom'] as const),
  deliveryMethods: z.array(z.enum(['in-app', 'email', 'push'] as const))
    .refine(methods => methods.length > 0, {
      message: 'At least one delivery method must be selected',
    }),
  relatedItemId: z.string().optional(),
  relatedItemType: z.enum(['task', 'incident', 'service-request']).optional(),
});

interface ReminderFormProps {
  initialData?: Reminder;
  onReminderCreated?: (reminder: Reminder) => void;
  onReminderUpdated?: (reminder: Reminder) => void;
  onCancel?: () => void;
  relatedItemId?: string;
  relatedItemType?: 'task' | 'incident' | 'service-request';
}

const ReminderForm: React.FC<ReminderFormProps> = ({ 
  initialData, 
  onReminderCreated, 
  onReminderUpdated, 
  onCancel,
  relatedItemId,
  relatedItemType
}) => {
  const { user } = useAuth();
  const isEditMode = !!initialData;

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description || '',
      triggerType: initialData.triggerType,
      triggerTime: initialData.triggerTime ? new Date(initialData.triggerTime) : undefined,
      frequency: initialData.frequency,
      deliveryMethods: initialData.deliveryMethods,
      relatedItemId: initialData.relatedItemId,
      relatedItemType: initialData.relatedItemType,
    } : {
      title: '',
      description: '',
      triggerType: 'time-based',
      triggerTime: undefined,
      frequency: 'one-time',
      deliveryMethods: ['in-app'],
      relatedItemId: relatedItemId,
      relatedItemType: relatedItemType,
    },
  });

  const watchTriggerType = form.watch('triggerType');
  const watchFrequency = form.watch('frequency');

  const deliveryMethodOptions: { id: ReminderDeliveryMethod; label: string }[] = [
    { id: 'in-app', label: 'In-app notification' },
    { id: 'email', label: 'Email' },
    { id: 'push', label: 'Mobile push notification' },
  ];

  const onSubmit = async (values: ReminderFormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to create reminders');
        return;
      }

      if (isEditMode && initialData) {
        // Update existing reminder
        const result = await updateReminder(initialData.id, {
          ...values,
          status: initialData.status,
          userId: initialData.userId,
          creatorId: initialData.creatorId,
        });

        if (result.success) {
          toast.success('Reminder updated successfully');
          onReminderUpdated?.(result.data);
        } else {
          toast.error('Failed to update reminder');
        }
      } else {
        // Create new reminder
        const result = await createReminder({
          ...values,
          status: 'active',
          userId: user.id, // The user who will receive the reminder
          creatorId: user.id, // The user who created the reminder
        });

        if (result.success) {
          toast.success('Reminder created successfully');
          onReminderCreated?.(result.data);
          form.reset();
        } else {
          toast.error('Failed to create reminder');
        }
      }
    } catch (error) {
      console.error('Error saving reminder:', error);
      toast.error('An error occurred while saving the reminder');
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
                <Input placeholder="Reminder title" {...field} />
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
                  placeholder="Optional details about this reminder" 
                  className="min-h-[80px]" 
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
            name="triggerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trigger Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select when to trigger" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="time-based">Time-based</SelectItem>
                    <SelectItem value="event-based">Event-based</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {watchTriggerType === 'time-based' 
                    ? 'Trigger at a specific date/time' 
                    : 'Trigger based on system events'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {watchTriggerType === 'time-based' && (
          <FormField
            control={form.control}
            name="triggerTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Trigger Date/Time</FormLabel>
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
                          format(field.value, "PPP p")
                        ) : (
                          <span>Pick a date and time</span>
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
                      disabled={(date) => date < new Date()}
                    />
                    <div className="p-3 border-t">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <Input
                          type="time"
                          onChange={(e) => {
                            if (field.value && e.target.value) {
                              const [hours, minutes] = e.target.value.split(':');
                              const newDate = new Date(field.value);
                              newDate.setHours(parseInt(hours, 10));
                              newDate.setMinutes(parseInt(minutes, 10));
                              field.onChange(newDate);
                            }
                          }}
                          value={field.value ? 
                            `${field.value.getHours().toString().padStart(2, '0')}:${field.value.getMinutes().toString().padStart(2, '0')}` 
                            : ''}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="deliveryMethods"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Delivery Methods</FormLabel>
                <FormDescription>
                  Select how you want to receive this reminder
                </FormDescription>
              </div>
              {deliveryMethodOptions.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name="deliveryMethods"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...field.value, option.id]
                                : field.value?.filter(
                                    (value) => value !== option.id
                                  );
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {isEditMode ? 'Update Reminder' : 'Create Reminder'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReminderForm;
