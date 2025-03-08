import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TicketStatus, RelatedItem } from '@/utils/types/ticket';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const closeSchema = z.object({
  status: z.enum(['resolved', 'closed', 'fulfilled'] as const),
  notes: z.string().min(1, "Notes are required"),
  rootCause: z.string().min(1, "Root cause is required"),
  closureReason: z.string().min(1, "Closure reason is required"),
  resolution: z.string().min(1, "Resolution details are required"),
});

export interface CloseTicketValues {
  status: TicketStatus;
  notes: string;
  rootCause: string;
  closureReason: string;
  resolution: string;
}

interface TicketCloseFormProps {
  defaultValues: CloseTicketValues;
  onSubmit: (data: CloseTicketValues) => void;
  onCancel: () => void;
  type: 'incident' | 'service';
  relatedItems?: RelatedItem[];
}

const TicketCloseForm: React.FC<TicketCloseFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  type,
  relatedItems = []
}) => {
  const isServiceRequest = type === 'service';
  
  const form = useForm<CloseTicketValues>({
    resolver: zodResolver(closeSchema),
    defaultValues
  });

  // Filter unresolved related items
  const unresolvedItems = relatedItems.filter(item => {
    if (item.type === 'bug') {
      return !['closed', 'resolved', 'fixed'].includes(item.status.toLowerCase());
    }
    if (item.type === 'backlogItem') {
      return !['completed', 'closed', 'done'].includes(item.status.toLowerCase());
    }
    return false;
  });

  const hasUnresolvedItems = unresolvedItems.length > 0;

  return (
    <div className="border p-4 rounded-md bg-muted/30">
      <h3 className="text-md font-medium mb-3">
        {isServiceRequest ? 'Fulfill Request' : 'Resolve Incident'}
      </h3>
      
      {hasUnresolvedItems && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Cannot close {isServiceRequest ? 'service request' : 'incident'}</AlertTitle>
          <AlertDescription>
            {isServiceRequest ? 
              'This service request has related backlog items that are not yet completed.' :
              'This incident has related bugs that are not yet resolved.'
            }
            <ul className="mt-2 list-disc pl-5">
              {unresolvedItems.map(item => (
                <li key={item.id}>
                  {item.title} - Status: {item.status}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isServiceRequest ? 'Request Status' : 'Resolution Status'}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={hasUnresolvedItems}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isServiceRequest ? (
                      <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    ) : (
                      <>
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
          
          <FormField
            control={form.control}
            name="rootCause"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isServiceRequest ? 'Fulfillment Details' : 'Root Cause'}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={isServiceRequest 
                      ? "Describe how the request was fulfilled" 
                      : "What was the root cause of this incident?"}
                    className="min-h-[80px]"
                    {...field}
                    disabled={hasUnresolvedItems}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="resolution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isServiceRequest ? 'Resolution Details' : 'Resolution Details'}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide detailed information about the resolution"
                    className="min-h-[80px]"
                    {...field}
                    disabled={hasUnresolvedItems}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {!isServiceRequest && (
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
                      disabled={hasUnresolvedItems}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isServiceRequest ? 'Additional Fulfillment Notes' : 'Additional Notes'}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information"
                    className="min-h-[80px]"
                    {...field}
                    disabled={hasUnresolvedItems}
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
            <Button 
              type="submit" 
              variant="destructive"
              disabled={hasUnresolvedItems}
            >
              {isServiceRequest ? 'Fulfill Request' : 'Resolve Incident'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketCloseForm;
