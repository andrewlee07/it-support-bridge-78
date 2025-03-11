
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Layout } from 'lucide-react';
import { TaskFormValues } from '../hooks/useTaskForm';

interface TemplateOptionsSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const TemplateOptionsSection: React.FC<TemplateOptionsSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Layout className="h-5 w-5" />
        Template Options
      </h3>
      
      <FormField
        control={form.control}
        name="isTemplate"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Save as Template</FormLabel>
              <FormDescription>
                Make this task available as a template for future tasks
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default TemplateOptionsSection;
