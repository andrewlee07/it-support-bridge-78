
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  StatusMappingConfiguration, 
  defaultStatusMappingConfiguration 
} from '@/utils/statusSynchronization/statusMappings';
import { ReleaseStatus } from '@/utils/types/release';
import { BacklogItemStatus } from '@/utils/types/backlogTypes';
import { toast } from 'sonner';

const StatusSynchronizationConfig: React.FC = () => {
  const form = useForm<StatusMappingConfiguration>({
    defaultValues: defaultStatusMappingConfiguration
  });

  const onSubmit = (data: StatusMappingConfiguration) => {
    // In a real implementation, this would save to an API
    console.log('Saving status mapping configuration:', data);
    
    // For now we just show a success toast
    toast.success('Status mapping configuration saved successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Synchronization Configuration</CardTitle>
        <CardDescription>
          Configure how status changes should propagate between releases and related items
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mappings">
          <TabsList className="mb-4">
            <TabsTrigger value="mappings">Status Mappings</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="mappings">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Release to Backlog Item Status Mappings</h3>
                    <div className="space-y-4">
                      {Object.entries(defaultStatusMappingConfiguration.releaseToBacklogMapping).map(([releaseStatus, backlogStatus]) => (
                        <FormField
                          key={`backlog-${releaseStatus}`}
                          control={form.control}
                          name={`releaseToBacklogMapping.${releaseStatus}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>When Release Status is <strong>{releaseStatus}</strong></FormLabel>
                                <FormDescription>
                                  Set Backlog Item Status to:
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="ready">Ready</SelectItem>
                                    <SelectItem value="blocked">Blocked</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="deferred">Deferred</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Release to Bug Status Mappings</h3>
                    <div className="space-y-4">
                      {Object.entries(defaultStatusMappingConfiguration.releaseToBugMapping).map(([releaseStatus, bugStatus]) => (
                        <FormField
                          key={`bug-${releaseStatus}`}
                          control={form.control}
                          name={`releaseToBugMapping.${releaseStatus}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>When Release Status is <strong>{releaseStatus}</strong></FormLabel>
                                <FormDescription>
                                  Set Bug Status to:
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                    <SelectItem value="fixed">Fixed</SelectItem>
                                    <SelectItem value="verified">Verified</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="behavior">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
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
              </TabsContent>
              
              <div className="flex justify-end mt-6">
                <Button type="submit">Save Configuration</Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatusSynchronizationConfig;
