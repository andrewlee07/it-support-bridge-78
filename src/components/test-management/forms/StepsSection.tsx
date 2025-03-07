
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { TestCaseFormValues } from './testCaseSchema';

interface StepsSectionProps {
  steps: string[];
}

const StepsSection: React.FC<StepsSectionProps> = ({ steps }) => {
  const form = useFormContext<TestCaseFormValues>();

  // Add a new step
  const addStep = () => {
    const currentSteps = form.getValues('stepsToReproduce');
    form.setValue('stepsToReproduce', [...currentSteps, '']);
  };

  // Remove a step
  const removeStep = (index: number) => {
    const currentSteps = form.getValues('stepsToReproduce');
    if (currentSteps.length <= 1) return;
    
    const newSteps = currentSteps.filter((_, i) => i !== index);
    form.setValue('stepsToReproduce', newSteps);
  };

  return (
    <div className="space-y-4">
      <FormLabel>Steps to Reproduce</FormLabel>
      {steps.map((_, index) => (
        <FormField
          key={index}
          control={form.control}
          name={`stepsToReproduce.${index}`}
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder={`Step ${index + 1}`}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeStep(index)}
                  disabled={steps.length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addStep}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Add Step
      </Button>
      {/* Show form error for steps if any */}
      {form.formState.errors.stepsToReproduce && (
        <p className="text-sm font-medium text-destructive">
          {form.formState.errors.stepsToReproduce.message}
        </p>
      )}
    </div>
  );
};

export default StepsSection;
