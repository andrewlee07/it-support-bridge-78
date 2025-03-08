
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { 
  StatusMappingConfiguration, 
  defaultStatusMappingConfiguration 
} from '@/utils/statusSynchronization/statusMappings';
import { toast } from 'sonner';
import { getKeys } from './statusConfig/utils';
import StatusMappingTab from './statusConfig/StatusMappingTab';
import BehaviorTab from './statusConfig/BehaviorTab';
import NotificationsTab from './statusConfig/NotificationsTab';

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

  // Get release statuses from the default configuration
  const releaseStatuses = getKeys(defaultStatusMappingConfiguration.releaseToBacklogMapping);

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
          
          <FormProvider {...form}>
            <Form>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="mappings">
                  <StatusMappingTab releaseStatuses={releaseStatuses} />
                </TabsContent>
                
                <TabsContent value="behavior">
                  <BehaviorTab />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <NotificationsTab />
                </TabsContent>
                
                <div className="flex justify-end mt-6">
                  <Button type="submit">Save Configuration</Button>
                </div>
              </form>
            </Form>
          </FormProvider>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatusSynchronizationConfig;
