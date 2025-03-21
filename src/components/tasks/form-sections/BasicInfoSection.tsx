
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../hooks/useTaskForm';

interface BasicInfoSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h3 className="text-lg font-medium">Basic Information</h3>
        <p className="text-sm text-muted-foreground">Provide the core details about this task</p>
      </div>
      
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter task title" 
                {...field} 
                className="h-10"
              />
            </FormControl>
            <FormDescription>
              Enter a concise, descriptive title for the task
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Provide detailed description of the task" 
                className="resize-y min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Include all relevant information about what needs to be done
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoSection;
