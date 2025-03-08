
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TicketStatus } from '@/utils/types/ticket';

const closeSchema = z.object({
  status: z.enum(['resolved', 'closed', 'fulfilled'] as const),
  notes: z.string().min(1, "Notes are required"),
  rootCause: z.string().min(1, "Root cause is required"),
  closureReason: z.string().min(1, "Closure reason is required"),
});

export interface CloseTicketValues {
  status: TicketStatus;
  notes: string;
  rootCause: string;
  closureReason: string;
}

interface TicketCloseFormProps {
  defaultValues: CloseTicketValues;
  onSubmit: (data: CloseTicketValues) => void;
  onCancel: () => void;
  type: 'incident' | 'service';
}

const TicketCloseForm: React.FC<TicketCloseFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  type
}) => {
  const form = useForm<CloseTicketValues>({
    resolver: zodResolver(closeSchema),
    defaultValues
  });

  return (
    <div className="border p-4 rounded-md bg-muted/30">
      <h3 className="text-md font-medium mb-3">
        {type === 'incident' ? 'Resolve Incident' : 'Fulfill Request'}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resolution Status</FormLabel>
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
                    {type === 'incident' ? (
                      <>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="fulfilled">Fulfilled</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rootCause"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Root Cause</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={type === 'incident' 
                      ? "What was the root cause of this incident?" 
                      : "What was the underlying reason for this request?"}
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="closureReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Closure Reason</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain how this was resolved"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information"
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
            <Button type="submit" variant="destructive">
              {type === 'incident' ? 'Resolve Incident' : 'Complete Request'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketCloseForm;
