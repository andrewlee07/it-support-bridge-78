
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from '../hooks/useTaskForm';

interface RelatedItemSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const RelatedItemSection: React.FC<RelatedItemSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField
        control={form.control}
        name="relatedItemType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Related Item Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select related item type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="service-request">Service Request</SelectItem>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Select what type of item this task relates to
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="relatedItemId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Related Item ID</FormLabel>
            <FormControl>
              <Input placeholder="ID of the related item" {...field} />
            </FormControl>
            <FormDescription>
              Enter the ID of the related item
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RelatedItemSection;
