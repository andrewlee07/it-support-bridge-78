
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SLA } from '@/utils/types/sla';
import { toast } from 'sonner';

interface UseSLAFormProps {
  defaultValues?: Partial<SLA>;
  onSubmit: (data: Partial<SLA>) => void;
  onCancel: () => void;
}

export const useSLAForm = ({ defaultValues, onSubmit, onCancel }: UseSLAFormProps) => {
  const isEditing = !!defaultValues?.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formValues: Partial<SLA> = {
    name: defaultValues?.name || '',
    description: defaultValues?.description || '',
    ticketType: defaultValues?.ticketType || 'incident',
    priorityLevel: defaultValues?.priorityLevel || 'P3',
    responseTimeHours: defaultValues?.responseTimeHours || 4,
    resolutionTimeHours: defaultValues?.resolutionTimeHours || 8,
    isActive: defaultValues?.isActive !== undefined ? defaultValues.isActive : true,
  };

  const form = useForm<Partial<SLA>>({ defaultValues: formValues });
  
  const handleSubmit = async (data: Partial<SLA>) => {
    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      onSubmit(data);
      toast.success(isEditing ? "SLA updated successfully" : "SLA created successfully");
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} SLA. Please try again.`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    form,
    isEditing,
    isSubmitting,
    handleSubmit,
    onCancel
  };
};
