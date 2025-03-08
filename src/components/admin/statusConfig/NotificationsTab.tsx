
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

const NotificationsTab: React.FC = () => {
  const { control } = useFormContext<StatusMappingConfiguration>();
  
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="notifyOnStatusChange"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Status Change Notifications</FormLabel>
              <FormDescription>
                Send notifications when item statuses are automatically updated
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

export default NotificationsTab;
