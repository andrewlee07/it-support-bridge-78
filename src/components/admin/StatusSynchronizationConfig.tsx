
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { StatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import { BacklogItemStatus } from '@/utils/types/backlogTypes';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { toast } from 'sonner';

// Create a schema for form validation
const formSchema = z.object({
  enableCascadingUpdates: z.boolean(),
  enableDateSynchronization: z.boolean(),
  notifyOnStatusChange: z.boolean(),
  allowOverrides: z.boolean(),
  releaseToBacklogMapping: z.record(z.string(), z.string()),
  releaseToBugMapping: z.record(z.string(), z.string())
});

const StatusSynchronizationConfig: React.FC = () => {
  const { settings, isLoading, updateSettings, validateConfiguration } = useStatusSynchronization();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with current settings
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: settings
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Validate the configuration
    if (validateConfiguration()) { // Fix: Remove the argument here
      updateSettings(data as StatusSynchronizationSettings);
      toast.success('Status synchronization settings saved successfully');
    } else {
      toast.error('Invalid configuration. Please check your settings.');
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Synchronization</CardTitle>
        <CardDescription>
          Configure how statuses are synchronized between releases, backlog items, and bugs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="enableCascadingUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div>
                      <FormLabel>Enable Cascading Updates</FormLabel>
                      <FormDescription>
                        When a release status changes, update related backlog items and bugs
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
                control={form.control}
                name="enableDateSynchronization"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div>
                      <FormLabel>Enable Date Synchronization</FormLabel>
                      <FormDescription>
                        Automatically update due dates based on release dates
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
                control={form.control}
                name="notifyOnStatusChange"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div>
                      <FormLabel>Notify on Status Change</FormLabel>
                      <FormDescription>
                        Send notifications when item statuses change
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
                control={form.control}
                name="allowOverrides"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div>
                      <FormLabel>Allow Manual Overrides</FormLabel>
                      <FormDescription>
                        Allow users to override automatic status updates
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
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Status Mapping Configuration</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Configure how release statuses map to backlog item and bug statuses
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 font-medium text-sm text-muted-foreground">
                  <div>Release Status</div>
                  <div>Backlog Item Status</div>
                  <div>Bug Status</div>
                </div>
                
                {Object.keys(settings.releaseToBacklogMapping).map((releaseStatus) => (
                  <div key={releaseStatus} className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <span className="font-medium">{releaseStatus}</span>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`releaseToBacklogMapping.${releaseStatus}`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="ready">Ready</SelectItem>
                              <SelectItem value="blocked">Blocked</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="deferred">Deferred</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`releaseToBugMapping.${releaseStatus}`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="fixed">Fixed</SelectItem>
                              <SelectItem value="verified">Verified</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StatusSynchronizationConfig;
