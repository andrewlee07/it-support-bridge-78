
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';

interface PlanningSectionProps {
  form: UseFormReturn<any>;
}

const PlanningSection: React.FC<PlanningSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormSectionHeader title="Implementation Planning" description="Describe your implementation and rollback plans" />
      
      <FormField
        control={form.control}
        name="implementationPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Implementation Plan</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe how the change will be implemented" 
                {...field} 
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="rollbackPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rollback Plan</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe how to rollback if issues arise" 
                {...field} 
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PlanningSection;
