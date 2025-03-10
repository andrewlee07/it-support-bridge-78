
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import FormSectionHeader from './FormSectionHeader';
import CustomFormField from './CustomFormField';

interface ClosureSectionProps {
  form: UseFormReturn<any>;
  isClosing?: boolean;
}

const ClosureSection: React.FC<ClosureSectionProps> = ({ form, isClosing = false }) => {
  if (!isClosing) return null;

  return (
    <div className="space-y-4">
      <FormSectionHeader title="Change Closure" />
      
      <CustomFormField
        form={form}
        name="closureReason"
        label="Closure Reason"
      >
        <Select onValueChange={field => form.setValue('closureReason', field)}>
          <SelectTrigger>
            <SelectValue placeholder="Select closure reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="successful">Successful</SelectItem>
            <SelectItem value="successful-with-issues">Successful with Issues</SelectItem>
            <SelectItem value="rolled-back">Rolled Back</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </CustomFormField>
      
      <CustomFormField
        form={form}
        name="closureNotes"
        label="Closure Notes"
      >
        <Textarea 
          placeholder="Enter notes about the change closure" 
          className="min-h-[100px]"
        />
      </CustomFormField>
    </div>
  );
};

export default ClosureSection;
