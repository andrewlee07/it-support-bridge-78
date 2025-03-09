
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Ticket } from '@/utils/types';

interface ServiceSelectionProps {
  form: UseFormReturn<any>;
  servicesByCategory: Record<string, any[]>;
  type: 'incident' | 'service';
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  form,
  servicesByCategory,
  type
}) => {
  return (
    <FormField
      control={form.control}
      name="serviceId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Service</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a service (optional)" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">-- No service selected --</SelectItem>
              
              {Object.entries(servicesByCategory).map(([category, services]) => (
                <SelectGroup key={category}>
                  <SelectLabel>{category}</SelectLabel>
                  {services.map(service => (
                    <SelectItem 
                      key={service.id} 
                      value={service.id}
                      disabled={service.status === 'inactive'}
                    >
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Select the IT service related to this {type}.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ServiceSelection;
