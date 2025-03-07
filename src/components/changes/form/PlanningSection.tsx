
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import CustomFormField from './CustomFormField';

interface PlanningSectionProps {
  form: UseFormReturn<any>;
}

const PlanningSection: React.FC<PlanningSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormSectionHeader 
        title="Implementation Planning" 
        description="Describe your implementation and rollback plans" 
      />
      
      <CustomFormField
        form={form}
        name="implementationPlan"
        label="Implementation Plan"
      >
        <Textarea 
          placeholder="Describe how the change will be implemented" 
          className="min-h-[100px]"
        />
      </CustomFormField>
      
      <CustomFormField
        form={form}
        name="rollbackPlan"
        label="Rollback Plan"
      >
        <Textarea 
          placeholder="Describe how to rollback if issues arise" 
          className="min-h-[100px]"
        />
      </CustomFormField>
    </div>
  );
};

export default PlanningSection;
