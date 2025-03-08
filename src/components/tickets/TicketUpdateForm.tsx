
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RelatedItem, TicketStatus } from '@/utils/types/ticket';
import PendingSubStatusField from './PendingSubStatusField';

const updateSchema = z.object({
  status: z.string(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
  pendingSubStatus: z.string().optional(),
  _relatedItems: z.array(z.any()).optional(),
});

export interface UpdateTicketValues {
  status: TicketStatus;
  assignedTo: string;
  notes: string;
  pendingSubStatus?: string;
  _relatedItems?: RelatedItem[];
}

interface TicketUpdateFormProps {
  defaultValues: UpdateTicketValues;
  onSubmit: (data: UpdateTicketValues) => void;
  onCancel: () => void;
  type: 'incident' | 'service';
}

const TicketUpdateForm: React.FC<TicketUpdateFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  type
}) => {
  const isServiceRequest = type === 'service';
  const form = useForm<UpdateTicketValues>({
    resolver: zodResolver(updateSchema),
    defaultValues
  });

  const watchStatus = form.watch('status');
  const isPendingStatus = watchStatus === 'pending';

  // Set up validation for pendingSubStatus when status is 'pending'
  useEffect(() => {
    if (isPendingStatus) {
      form.register('pendingSubStatus', { required: 'Sub-status is required when status is Pending' });
    }
  }, [isPendingStatus, form]);

  return (
    <div>
      <h3 className="text-md font-medium mb-3">Update {isServiceRequest ? 'Request' : 'Incident'}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isServiceRequest ? (
                      <>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="fulfilled">Fulfilled</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {isPendingStatus && (
            <PendingSubStatusField form={form} ticketType={type} />
          )}
          
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign To</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value || "unassigned"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="user-1">John Smith</SelectItem>
                    <SelectItem value="user-2">Alice Johnson</SelectItem>
                    <SelectItem value="user-3">Robert Chen</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add notes about this update"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit">
              Update {isServiceRequest ? 'Request' : 'Incident'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketUpdateForm;
