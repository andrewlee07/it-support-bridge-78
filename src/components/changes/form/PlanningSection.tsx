
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import CustomFormField from './CustomFormField';
import PlanTemplates from './PlanTemplates';

interface PlanningSectionProps {
  form: UseFormReturn<any>;
}

const PlanningSection: React.FC<PlanningSectionProps> = ({ form }) => {
  const handleApplyImplementationTemplate = (content: string) => {
    form.setValue('implementationPlan', content, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const handleApplyRollbackTemplate = (content: string) => {
    form.setValue('rollbackPlan', content, { 
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  return (
    <div className="space-y-4">
      <FormSectionHeader 
        title="Implementation Planning" 
        description="Describe your implementation and rollback plans" 
      />
      
      <div className="space-y-1">
        <PlanTemplates 
          type="implementation" 
          onSelectTemplate={handleApplyImplementationTemplate} 
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
      </div>
      
      <div className="space-y-1">
        <PlanTemplates 
          type="rollback" 
          onSelectTemplate={handleApplyRollbackTemplate} 
        />
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
    </div>
  );
};

export default PlanningSection;
