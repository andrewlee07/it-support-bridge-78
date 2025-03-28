
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';
import { StatusMappingTable } from '@/components/admin/status-sync/StatusMappingTable';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { defaultStatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';
import ReleaseGeneralSettings from '@/components/admin/release-configuration/ReleaseGeneralSettings';
import ReleaseApprovalSettings from '@/components/admin/release-configuration/ReleaseApprovalSettings';
import ReleaseTemplatesTab from '@/components/admin/release-configuration/ReleaseTemplatesTab';
import DeploymentSettingsTab from '@/components/admin/release-configuration/DeploymentSettingsTab';
import { Settings, Workflow, GitCompare, CheckCircle, FileText, Upload, Database } from 'lucide-react';

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
            <TabsTrigger value="general" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center">
              <Workflow className="h-4 w-4 mr-2" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="sync" className="flex items-center">
              <GitCompare className="h-4 w-4 mr-2" />
              Status Synchronization
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approval Process
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Release Templates
            </TabsTrigger>
            <TabsTrigger value="deployment" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Deployment Settings
            </TabsTrigger>
            <TabsTrigger value="mandatoryfields" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Mandatory Fields
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <ReleaseGeneralSettings />
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
            <ReleaseApprovalSettings />
          </TabsContent>
          
          <TabsContent value="templates">
            <ReleaseTemplatesTab />
          </TabsContent>
          
          <TabsContent value="deployment">
            <DeploymentSettingsTab />
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
