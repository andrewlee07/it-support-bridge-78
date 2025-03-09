
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TicketType } from '@/utils/types';

interface CategoryPrioritySectionProps {
  form: UseFormReturn<any>;
  isFieldRequired: (fieldName: string) => boolean;
  type: TicketType;
}

const CategoryPrioritySection: React.FC<CategoryPrioritySectionProps> = ({
  form,
  isFieldRequired,
  type
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="category"
        rules={{ required: isFieldRequired('category') ? 'Category is required' : false }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{isFieldRequired('category') && <span className="text-red-500 mr-1">*</span>}Category</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || "hardware"}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Select the category that best fits your {type}.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="priority"
        rules={{ required: isFieldRequired('priority') ? 'Priority is required' : false }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{isFieldRequired('priority') && <span className="text-red-500 mr-1">*</span>}Priority</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || "P3"}>
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
            <FormDescription>
              Select the priority level of your {type}.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoryPrioritySection;
