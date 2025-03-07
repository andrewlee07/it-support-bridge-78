
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { BacklogItemFormValues } from '../forms/backlogItemSchema';

interface TypeAndPointsFieldsProps {
  form: UseFormReturn<BacklogItemFormValues>;
}

const TypeAndPointsFields: React.FC<TypeAndPointsFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="enhancement">Enhancement</SelectItem>
                <SelectItem value="technical-debt">Technical Debt</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="storyPoints"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Story Points</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0" 
                placeholder="Estimated effort" 
                {...field}
                onChange={e => field.onChange(e.target.valueAsNumber)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TypeAndPointsFields;
