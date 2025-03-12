
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

// Form schema for queue validation
const queueFormSchema = z.object({
  name: z.string().min(2, { message: 'Queue name must be at least 2 characters' }),
  description: z.string().optional(),
  groupId: z.string(),
  ticketTypes: z.array(z.string()).min(1, { message: 'Select at least one ticket type' })
});

type QueueFormValues = z.infer<typeof queueFormSchema>;

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
      ticketTypes: initialData?.filterCriteria.ticketTypes || []
    }
  });

  // Available ticket types for dropdown
  const ticketTypeOptions = [
    { value: 'incident', label: 'Incident' },
    { value: 'service', label: 'Service Request' },
    { value: 'problem', label: 'Problem' },
    { value: 'change', label: 'Change Request' }
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
                      onChange={options => field.onChange(options.map(opt => opt.value))}
                      placeholder="Select ticket types"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Save Changes' : 'Create Queue'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QueueDialog;
