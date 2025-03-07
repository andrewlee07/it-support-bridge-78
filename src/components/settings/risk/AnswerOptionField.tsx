
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface AnswerOptionFieldProps {
  index: number;
  form: UseFormReturn<any>;
  onRemove: () => void;
  isRemoveDisabled: boolean;
}

const AnswerOptionField: React.FC<AnswerOptionFieldProps> = ({
  index,
  form,
  onRemove,
  isRemoveDisabled,
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-1 space-y-2">
        <FormField
          control={form.control}
          name={`answers.${index}.text`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Answer Text</FormLabel>
              <FormControl>
                <Input placeholder="Answer text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`answers.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Value (1-5)"
                  min={1}
                  max={5}
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={isRemoveDisabled}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AnswerOptionField;
