
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
import { SLA } from '@/utils/types/sla';

interface TimeSettingsSectionProps {
  form: UseFormReturn<Partial<SLA>>;
}

const TimeSettingsSection: React.FC<TimeSettingsSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="responseTimeHours"
        rules={{ 
          required: 'Response time is required',
          min: { value: 0.1, message: 'Minimum response time is 0.1 hours (6 minutes)' }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Response Time (hours)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0.1"
                step="0.1"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Target time to first response
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="resolutionTimeHours"
        rules={{ 
          required: 'Resolution time is required',
          min: { value: 0.5, message: 'Minimum resolution time is 0.5 hours (30 minutes)' }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resolution Time (hours)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0.5"
                step="0.5"
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Target time to resolution
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TimeSettingsSection;
