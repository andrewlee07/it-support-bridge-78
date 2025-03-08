
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BacklogItemFormValues } from './forms/backlogItemSchema';
import { Release } from '@/utils/api/release/types';
import BasicInfoFields from './form-fields/BasicInfoFields';
import StatusAndPriorityFields from './form-fields/StatusAndPriorityFields';
import TypeAndPointsFields from './form-fields/TypeAndPointsFields';
import AssignmentFields from './form-fields/AssignmentFields';
import DueDateField from './form-fields/DueDateField';
import LabelsField from './form-fields/LabelsField';
import FormActions from './form-fields/FormActions';

interface BacklogItemFormFieldsProps {
  form: UseFormReturn<BacklogItemFormValues>;
  releases: Release[];
  loading: boolean;
  onCancel: () => void;
  submitLabel: string;
}

const BacklogItemFormFields: React.FC<BacklogItemFormFieldsProps> = ({ 
  form, 
  releases, 
  loading,
  onCancel,
  submitLabel 
}) => {
  return (
    <>
      <BasicInfoFields form={form} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatusAndPriorityFields form={form} />
        <TypeAndPointsFields form={form} />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AssignmentFields form={form} releases={releases} />
        <DueDateField form={form} />
      </div>

      <LabelsField form={form} />

      <FormActions 
        loading={loading} 
        onCancel={onCancel} 
        submitLabel={submitLabel} 
      />
    </>
  );
};

export default BacklogItemFormFields;
