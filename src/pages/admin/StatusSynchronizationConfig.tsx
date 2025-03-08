
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { StatusMappingTable } from '@/components/admin/status-sync/StatusMappingTable';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';

const formSchema = z.object({
  enableCascadingUpdates: z.boolean(),
  enableDateSynchronization: z.boolean(),
  notifyOnStatusChange: z.boolean(),
  allowOverrides: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const StatusSynchronizationConfig = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Status Synchronization' }
  ];

  const { settings, updateSettings, isLoading } = useStatusSynchronization();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableCascadingUpdates: settings.enableCascadingUpdates,
      enableDateSynchronization: settings.enableDateSynchronization,
      notifyOnStatusChange: settings.notifyOnStatusChange,
      allowOverrides: settings.allowOverrides,
    },
  });

  const onSubmit = (values: FormValues) => {
    updateSettings({
      ...settings,
      ...values,
    });
    toast.success('Status synchronization settings updated');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Status Synchronization</h1>
          <p className="text-muted-foreground mt-1">
            Configure how status changes in releases affect linked items
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="mappings">Status Mappings</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Behavior</CardTitle>
                <CardDescription>
                  Configure how status changes propagate across linked items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="enableCascadingUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Enable Cascading Updates</FormLabel>
                              <FormDescription>
                                When a release status changes, update statuses of all linked items
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
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Synchronize Dates</FormLabel>
                              <FormDescription>
                                Update due dates of linked items when release dates change
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
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Send Notifications</FormLabel>
                              <FormDescription>
                                Notify users when item statuses are automatically updated
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
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Allow Manual Overrides</FormLabel>
                              <FormDescription>
                                Users can override automatic status changes
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

                    <Button type="submit" disabled={isLoading}>
                      Save Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mappings" className="space-y-4">
            <StatusMappingTable 
              mappings={settings.releaseToBacklogMapping} 
              bugMappings={settings.releaseToBugMapping}
              onUpdate={(mappings, bugMappings) => {
                updateSettings({
                  ...settings,
                  releaseToBacklogMapping: mappings,
                  releaseToBugMapping: bugMappings
                });
                toast.success('Status mappings updated');
              }}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default StatusSynchronizationConfig;
