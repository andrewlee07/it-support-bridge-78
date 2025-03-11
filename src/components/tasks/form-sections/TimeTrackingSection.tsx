
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';
import { TaskFormValues } from '../hooks/useTaskForm';

interface TimeTrackingSectionProps {
  form: UseFormReturn<TaskFormValues>;
}

const TimeTrackingSection: React.FC<TimeTrackingSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Time Tracking
      </h3>
      
      <FormField
        control={form.control}
        name="estimatedHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estimated Hours</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.5"
                placeholder="Enter estimated hours"
                {...field}
                onChange={(e) => {
                  const value = e.target.value !== '' ? parseFloat(e.target.value) : undefined;
                  field.onChange(value);
                }}
                value={field.value === undefined ? '' : field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TimeTrackingSection;
