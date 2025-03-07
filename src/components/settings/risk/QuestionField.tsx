
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface QuestionFieldProps {
  form: UseFormReturn<any>;
}

const QuestionField: React.FC<QuestionFieldProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter question text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight (0.1 - 1.0)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                max="1.0"
                {...field}
                onChange={e => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Importance weight of this question (0.1 being least important, 1.0 being most important)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isRequired"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Required Question</FormLabel>
          </FormItem>
        )}
      />
    </>
  );
};

export default QuestionField;
