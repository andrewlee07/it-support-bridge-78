
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../hooks/useTaskForm';

interface AssignmentSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const AssignmentSection: React.FC<AssignmentSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="assignee"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Assignee</FormLabel>
          <FormControl>
            <Input placeholder="User ID of assignee" {...field} />
          </FormControl>
          <FormDescription>
            Enter the user ID of the person to assign this task to
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AssignmentSection;
