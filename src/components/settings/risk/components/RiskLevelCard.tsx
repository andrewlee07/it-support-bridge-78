
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ThresholdsFormValues } from '../hooks/useRiskThresholdsForm';

interface RiskLevelCardProps {
  title: string;
  minField: "lowMin" | "mediumMin" | "highMin";
  maxField: "lowMax" | "mediumMax" | "highMax";
  form: UseFormReturn<ThresholdsFormValues>;
}

const RiskLevelCard: React.FC<RiskLevelCardProps> = ({
  title,
  minField,
  maxField,
  form
}) => {
  return (
    <div className="space-y-4 border p-4 rounded-md">
      <h3 className="font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={minField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Score</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={maxField}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Score</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RiskLevelCard;
