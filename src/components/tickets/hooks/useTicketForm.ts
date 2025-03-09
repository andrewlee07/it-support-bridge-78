
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Ticket, TicketPriority, TicketType, TicketCategory } from '@/utils/types';
import { toast } from 'sonner';
import { getMandatoryFieldsConfig } from '@/api/statusSynchronization';
import { getServicesByCategory } from '@/utils/mockData/services';

interface UseTicketFormProps {
  onSubmit: (data: Partial<Ticket>) => void;
  type: TicketType;
}

export const useTicketForm = ({ onSubmit, type }: UseTicketFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mandatoryFields, setMandatoryFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [servicesByCategory, setServicesByCategory] = useState<Record<string, any[]>>({});
  
  const defaultValues = {
    title: '',
    description: '',
    category: '' as TicketCategory,
    priority: 'P3' as TicketPriority, // Default to P3 (medium priority)
    type: type,
    serviceId: '',
  };
  
  const form = useForm({ defaultValues });
  
  // Fetch mandatory fields and services when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Map ticket type to entity type
        const entityType = type === 'incident' ? 'incident' : 'service-request';
        const fields = await getMandatoryFieldsConfig(entityType);
        
        // Extract field names of required fields
        const requiredFields = fields
          .filter(field => field.isRequired)
          .map(field => field.fieldName);
        
        setMandatoryFields(requiredFields);
        
        // Get services organized by category
        setServicesByCategory(getServicesByCategory());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [type]);
  
  const handleSubmit = async (data: Partial<Ticket>) => {
    setIsSubmitting(true);
    try {
      // Check for mandatory fields
      const missingFields = mandatoryFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        // Format field names for display
        const formattedFields = missingFields
          .map(field => field.charAt(0).toUpperCase() + field.slice(1))
          .join(', ');
        
        toast.error(`Please complete all required fields: ${formattedFields}`);
        setIsSubmitting(false);
        return;
      }
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(data);
      form.reset();
      toast.success(`Your ${type} has been submitted successfully`);
    } catch (error) {
      toast.error(`Failed to submit ${type}. Please try again.`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show which fields are mandatory
  const isFieldRequired = (fieldName: string) => mandatoryFields.includes(fieldName);

  return {
    form,
    isSubmitting,
    isLoading,
    mandatoryFields,
    servicesByCategory,
    handleSubmit,
    isFieldRequired
  };
};
