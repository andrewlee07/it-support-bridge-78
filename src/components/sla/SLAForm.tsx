
import React from 'react';
import { Form } from '@/components/ui/form';
import { SLA } from '@/utils/types/sla';
import BasicInfoSection from './form/BasicInfoSection';
import TicketTypeSection from './form/TicketTypeSection';
import TimeSettingsSection from './form/TimeSettingsSection';
import FormActions from './form/FormActions';
import { useSLAForm } from './form/useSLAForm';

export interface SLAFormProps {
  defaultValues?: SLA;
  onSubmit: (data: Partial<SLA>) => void;
  onCancel: () => void;
  entityType?: 'incident' | 'service-request';
}

const SLAForm: React.FC<SLAFormProps> = ({ 
  defaultValues, 
  onSubmit, 
  onCancel, 
  entityType 
}) => {
  // Initialize form values based on entityType if provided
  const formDefaultValues = defaultValues ? defaultValues : {
    ...(entityType === 'service-request' ? { ticketType: 'service' } : { ticketType: 'incident' })
  } as Partial<SLA>;

  const { form, isEditing, handleSubmit } = useSLAForm({
    defaultValues: formDefaultValues,
    onSubmit,
    onCancel
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <BasicInfoSection form={form} />
        <TicketTypeSection form={form} />
        <TimeSettingsSection form={form} />
        <FormActions isEditing={isEditing} onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default SLAForm;
