
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TicketTypeSectionProps {
  form: UseFormReturn<any>;
}

const TicketTypeSection: React.FC<TicketTypeSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="text-lg font-medium">Apply To</h3>
      
      <FormField
        control={form.control}
        name="ticketType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Ticket Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="incident" />
                  </FormControl>
                  <FormLabel className="font-normal">Incident</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="service" />
                  </FormControl>
                  <FormLabel className="font-normal">Service Request</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="security-case" />
                  </FormControl>
                  <FormLabel className="font-normal">IT Security Case</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TicketTypeSection;
