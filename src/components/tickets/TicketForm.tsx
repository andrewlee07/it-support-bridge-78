
import React from 'react';
import { Form } from '@/components/ui/form';
import { Ticket, TicketType } from '@/utils/types';
import { useTicketForm } from './hooks/useTicketForm';
import BasicInfoSection from './form-sections/BasicInfoSection';
import ServiceSelection from './form-sections/ServiceSelection';
import CategoryPrioritySection from './form-sections/CategoryPrioritySection';
import AssetServiceSection from './form-sections/AssetServiceSection';
import FormActions from './form-sections/FormActions';
import FormHeader from './form-sections/FormHeader';
import SecurityDetailsSection from './form-sections/SecurityDetailsSection';

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
        
        {/* Add the Security Details section for security cases */}
        {type === 'security' && (
          <SecurityDetailsSection form={form} />
        )}
        
        {/* Add the Asset and Service section */}
        {(type === 'incident' || type === 'security') && (
          <AssetServiceSection
            form={form}
            type={type}
          />
        )}
        
        <FormActions 
          isSubmitting={isSubmitting} 
          type={type} 
        />
      </form>
    </Form>
  );
};

export default TicketForm;
