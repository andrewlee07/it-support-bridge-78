
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import CustomFormField from './CustomFormField';

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
          <Select onValueChange={field => form.setValue('category', field)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="access">Access</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </CustomFormField>
        
        <CustomFormField
          form={form}
          name="priority"
          label="Priority"
        >
          <Select onValueChange={field => form.setValue('priority', field)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </CustomFormField>
        
        <CustomFormField
          form={form}
          name="changeCategory"
          label="Change Type"
        >
          <Select onValueChange={field => form.setValue('changeCategory', field)}>
            <SelectTrigger>
              <SelectValue placeholder="Select change type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </CustomFormField>
      </div>
    </div>
  );
};

export default BasicInfoSection;
