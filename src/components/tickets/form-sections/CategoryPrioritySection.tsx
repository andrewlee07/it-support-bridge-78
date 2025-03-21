
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { TicketType } from '@/utils/types/ticket';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface CategoryPrioritySectionProps {
  form: any;
  isFieldRequired: (fieldName: string) => boolean;
  type: TicketType;
}

const CategoryPrioritySection: React.FC<CategoryPrioritySectionProps> = ({
  form,
  isFieldRequired,
  type
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={isFieldRequired('category') ? 'font-medium' : ''}>
              Category {isFieldRequired('category') && <span className="text-destructive">*</span>}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {type === 'security' ? (
                  // Security-specific categories
                  <>
                    <SelectItem value="security">General Security</SelectItem>
                    <SelectItem value="data-breach">Data Breach</SelectItem>
                    <SelectItem value="sar">Subject Access Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </>
                ) : (
                  // Standard categories for other ticket types
                  <>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={isFieldRequired('priority') ? 'font-medium' : ''}>
              Priority {isFieldRequired('priority') && <span className="text-destructive">*</span>}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="P1">P1 - Critical</SelectItem>
                <SelectItem value="P2">P2 - High</SelectItem>
                <SelectItem value="P3">P3 - Medium</SelectItem>
                <SelectItem value="P4">P4 - Low</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoryPrioritySection;
