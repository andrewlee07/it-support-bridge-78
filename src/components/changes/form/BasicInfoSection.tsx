
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import CustomFormField from './CustomFormField';
import DynamicSelect from '@/components/shared/DynamicSelect';

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormSectionHeader title="Basic Information" />
      
      <CustomFormField
        form={form}
        name="title"
        label="Title"
      >
        <Input placeholder="Enter change request title" />
      </CustomFormField>
      
      <CustomFormField
        form={form}
        name="description"
        label="Description"
      >
        <Textarea 
          placeholder="Describe the change in detail" 
          className="min-h-[100px]"
        />
      </CustomFormField>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomFormField
          form={form}
          name="category"
          label="Category"
        >
          <DynamicSelect
            entityType="incident"
            fieldName="category"
            onValueChange={(value) => form.setValue('category', value)}
            value={form.watch('category')}
            placeholder="Select category"
          />
        </CustomFormField>
        
        <CustomFormField
          form={form}
          name="priority"
          label="Priority"
        >
          <DynamicSelect
            entityType="change"
            fieldName="priority"
            onValueChange={(value) => form.setValue('priority', value)}
            value={form.watch('priority')}
            placeholder="Select priority"
          />
        </CustomFormField>
        
        <CustomFormField
          form={form}
          name="changeCategory"
          label="Change Type"
        >
          <DynamicSelect
            entityType="change"
            fieldName="changeCategory"
            onValueChange={(value) => form.setValue('changeCategory', value)}
            value={form.watch('changeCategory')}
            placeholder="Select change type"
          />
        </CustomFormField>
      </div>
    </div>
  );
};

export default BasicInfoSection;
