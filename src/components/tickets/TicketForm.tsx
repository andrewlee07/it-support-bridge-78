
import React from 'react';
import { Form } from '@/components/ui/form';
import { Ticket, TicketType } from '@/utils/types';
import { useTicketForm } from './hooks/useTicketForm';
import BasicInfoSection from './form-sections/BasicInfoSection';
import ServiceSelection from './form-sections/ServiceSelection';
import CategoryPrioritySection from './form-sections/CategoryPrioritySection';
import FormActions from './form-sections/FormActions';
import FormHeader from './form-sections/FormHeader';

interface TicketFormProps {
  onSubmit: (data: Partial<Ticket>) => void;
  type: TicketType;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, type }) => {
  const {
    form,
    isSubmitting,
    isLoading,
    mandatoryFields,
    servicesByCategory,
    handleSubmit,
    isFieldRequired
  } = useTicketForm({ onSubmit, type });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <FormHeader 
          isLoading={isLoading} 
          hasMandatoryFields={mandatoryFields.length > 0} 
        />
        
        <BasicInfoSection 
          form={form} 
          isFieldRequired={isFieldRequired} 
          type={type} 
        />
        
        <ServiceSelection 
          form={form} 
          servicesByCategory={servicesByCategory} 
          type={type} 
        />
        
        <CategoryPrioritySection 
          form={form} 
          isFieldRequired={isFieldRequired} 
          type={type} 
        />
        
        <FormActions 
          isSubmitting={isSubmitting} 
          type={type} 
        />
      </form>
    </Form>
  );
};

export default TicketForm;
