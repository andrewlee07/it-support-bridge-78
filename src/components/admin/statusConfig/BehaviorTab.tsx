
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
} from '@/components/ui/form';
import { StatusMappingConfiguration } from '@/utils/statusSynchronization/statusMappings';

const BehaviorTab: React.FC = () => {
  const { control } = useFormContext<StatusMappingConfiguration>();
  
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="enableCascadingUpdates"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Enable Cascading Updates</FormLabel>
              <FormDescription>
                Automatically update linked items when a release status changes
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="enableDateSynchronization"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Enable Date Synchronization</FormLabel>
              <FormDescription>
                Propagate release dates to linked item due dates
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="allowOverrides"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Allow Status Overrides</FormLabel>
              <FormDescription>
                Update statuses even if they're in a completed or fixed state
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BehaviorTab;
