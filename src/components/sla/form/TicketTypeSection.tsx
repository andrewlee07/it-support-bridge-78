
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { SLA } from '@/utils/types/sla';

interface TicketTypeSectionProps {
  form: UseFormReturn<Partial<SLA>>;
}

const TicketTypeSection: React.FC<TicketTypeSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="ticketType"
        rules={{ required: 'Ticket type is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ticket Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a ticket type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="service">Service Request</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              The type of ticket this SLA applies to
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="priorityLevel"
        rules={{ required: 'Priority is required' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Priority Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="P1">P1 - Critical</SelectItem>
                <SelectItem value="P2">P2 - High</SelectItem>
                <SelectItem value="P3">P3 - Medium</SelectItem>
                <SelectItem value="P4">P4 - Low</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              The priority level this SLA applies to
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TicketTypeSection;
