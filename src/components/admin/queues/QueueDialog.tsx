
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Queue } from '@/utils/types/group';
import { MultiSelect } from '@/components/ui/multi-select';
import { TicketType } from '@/utils/types/ticket';

// Form schema for queue validation
const queueFormSchema = z.object({
  name: z.string().min(2, { message: 'Queue name must be at least 2 characters' }),
  description: z.string().optional(),
  groupId: z.string(),
  ticketTypes: z.array(
    z.enum(['incident', 'service', 'change', 'security'] as const)
  ).min(1, { message: 'Select at least one ticket type' }),
  defaultAssignee: z.string().optional(),
  isDefault: z.boolean().optional(),
  capacity: z.number().optional()
});

export type QueueFormValues = z.infer<typeof queueFormSchema>;

interface QueueDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: QueueFormValues) => void;
  initialData?: Queue;
  isEditing: boolean;
}

const QueueDialog: React.FC<QueueDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEditing
}) => {
  // Initialize the form with default values or existing queue data
  const form = useForm<QueueFormValues>({
    resolver: zodResolver(queueFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      groupId: initialData?.groupId || '',
      ticketTypes: initialData?.filterCriteria.ticketTypes || [],
      defaultAssignee: initialData?.defaultAssignee || '',
      isDefault: initialData?.isDefault || false,
      capacity: initialData?.capacity || undefined
    }
  });

  // Available ticket types for dropdown
  const ticketTypeOptions = [
    { value: 'incident', label: 'Incident' },
    { value: 'service', label: 'Service Request' },
    { value: 'change', label: 'Change Request' },
    { value: 'security', label: 'Security Case' }
  ];

  // Available groups for dropdown
  const groupOptions = [
    { value: 'g1', label: 'IT Support' },
    { value: 'g2', label: 'Development' },
    { value: 'g3', label: 'Operations' }
  ];

  const handleSubmit = (values: QueueFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Queue' : 'Create New Queue'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the queue details below.'
              : 'Configure a new queue for routing tickets to the appropriate teams.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Queue Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter queue name" {...field} />
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
                    <Textarea placeholder="Describe the purpose of this queue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Group</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border rounded"
                      {...field}
                    >
                      <option value="" disabled>Select a group</option>
                      {groupOptions.map(group => (
                        <option key={group.value} value={group.value}>
                          {group.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ticketTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Types</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={ticketTypeOptions}
                      selected={field.value.map(value => {
                        const option = ticketTypeOptions.find(opt => opt.value === value);
                        return { value, label: option?.label || value };
                      })}
                      onChange={options => field.onChange(options.map(opt => opt.value as TicketType))}
                      placeholder="Select ticket types"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Max number of tickets" 
                      {...field}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultAssignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Assignee</FormLabel>
                  <FormControl>
                    <Input placeholder="User ID of default assignee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Default Queue</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Make this the default queue for tickets with no specific routing
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Queue' : 'Create Queue'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QueueDialog;
