
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';
import { StatusMappingTable } from '@/components/admin/status-sync/StatusMappingTable';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { defaultStatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';

const ReleaseConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Release Configuration' }
  ];

  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('release');
  const { settings, updateSettings, isLoading: isSyncLoading } = useStatusSynchronization();

  // Use default mappings if settings are undefined
  const mappings = settings?.releaseToBacklogMapping || defaultStatusSynchronizationSettings.releaseToBacklogMapping;
  const bugMappings = settings?.releaseToBugMapping || defaultStatusSynchronizationSettings.releaseToBugMapping;

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Release Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure settings for release management
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="sync">Status Synchronization</TabsTrigger>
            <TabsTrigger value="approvals">Approval Process</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general release management settings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* General settings content */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="workflow">
            <WorkflowConfigurationTab entityType="release" />
          </TabsContent>
          
          <TabsContent value="sync">
            <StatusMappingTable 
              mappings={mappings}
              bugMappings={bugMappings}
              onUpdate={() => {}}
              settings={settings || defaultStatusSynchronizationSettings}
              updateSettings={updateSettings}
              isLoading={isSyncLoading}
            />
          </TabsContent>
          
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Approval Process</CardTitle>
                <CardDescription>Configure release approval process settings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Approval process settings content */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="release"
              fields={mandatoryFields}
              onSave={updateMandatoryFields}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ReleaseConfiguration;
