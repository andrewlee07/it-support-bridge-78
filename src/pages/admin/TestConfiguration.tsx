
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TestGeneralSettings from '@/components/admin/test-configuration/TestGeneralSettings';
import TestTemplatesTab from '@/components/admin/test-configuration/TestTemplatesTab';
import TestAutomationTab from '@/components/admin/test-configuration/TestAutomationTab';
import TestCustomFieldsTab from '@/components/admin/test-configuration/TestCustomFieldsTab';
import { Settings, FileText, TestTube, Database } from 'lucide-react';

const TestConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Test Configuration' }
  ];
  
  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('test');

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure test management settings and workflows
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center">
              <TestTube className="h-4 w-4 mr-2" />
              Test Workflow
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Test Templates
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Test Automation
            </TabsTrigger>
            <TabsTrigger value="fields" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Custom Fields
            </TabsTrigger>
            <TabsTrigger value="mandatoryfields" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Mandatory Fields
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <TestGeneralSettings />
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            <WorkflowConfigurationTab entityType="test" />
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <TestTemplatesTab />
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-4">
            <TestAutomationTab />
          </TabsContent>
          
          <TabsContent value="fields" className="space-y-4">
            <TestCustomFieldsTab />
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="test"
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

export default TestConfiguration;
