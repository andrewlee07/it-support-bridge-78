
import React from 'react';
import { PendingSubStatus, TicketType } from '@/utils/types/ticket';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';

interface PendingSubStatusFieldProps {
  form: UseFormReturn<any>;
  ticketType: TicketType;
  disabled?: boolean;
}

const PendingSubStatusField: React.FC<PendingSubStatusFieldProps> = ({ form, ticketType, disabled = false }) => {
  const isIncident = ticketType === 'incident';
  
  return (
    <FormField
      control={form.control}
      name="pendingSubStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pending Sub-Status</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a sub-status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="customer-info">Customer Info</SelectItem>
              {isIncident && (
                <SelectItem value="customer-testing">Customer Testing</SelectItem>
              )}
              <SelectItem value="third-party">Third Party</SelectItem>
              {!isIncident && (
                <>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PendingSubStatusField;
