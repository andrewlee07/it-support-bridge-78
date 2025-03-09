
import React, { useEffect, useState } from 'react';
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
import { TicketType } from '@/utils/types';
import ServiceContextInfo from './ServiceContextInfo';

interface ServiceSelectionProps {
  form: UseFormReturn<any>;
  servicesByCategory: Record<string, any[]>;
  type: TicketType;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  form,
  servicesByCategory,
  type
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Update the selected service when the form value changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.serviceId !== selectedServiceId) {
        setSelectedServiceId(value.serviceId || '');
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, selectedServiceId]);

  return (
    <>
      <FormField
        control={form.control}
        name="serviceId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedServiceId(value);
              }} 
              value={field.value}
            >
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
      
      {/* Show service context information when a service is selected */}
      {selectedServiceId && <ServiceContextInfo serviceId={selectedServiceId} />}
    </>
  );
};

export default ServiceSelection;
