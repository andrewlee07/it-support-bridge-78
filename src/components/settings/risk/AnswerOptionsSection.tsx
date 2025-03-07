
import React from 'react';
import { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AnswerOptionField from './AnswerOptionField';

interface AnswerOptionsSectionProps {
  form: UseFormReturn<any>;
  fieldArray: UseFieldArrayReturn<any, "answers", "id">;
}

const AnswerOptionsSection: React.FC<AnswerOptionsSectionProps> = ({
  form,
  fieldArray,
}) => {
  const { fields, append, remove } = fieldArray;

  return (
    <div>
      <h3 className="font-medium mb-2">Answer Options</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Each answer must have a value between 1-5 (1 being lowest risk, 5 being highest risk)
      </p>
      
      <div className="space-y-4">
        {fields.map((field, index) => (
          <AnswerOptionField
            key={field.id}
            index={index}
            form={form}
            onRemove={() => remove(index)}
            isRemoveDisabled={fields.length <= 1}
          />
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ text: '', value: 1 })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Answer Option
        </Button>
      </div>
    </div>
  );
};

export default AnswerOptionsSection;
