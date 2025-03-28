
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

        <Tabs defaultValue="workflow">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="workflow">Test Workflow</TabsTrigger>
            <TabsTrigger value="templates">Test Templates</TabsTrigger>
            <TabsTrigger value="automation">Test Automation</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general test management settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Test General Settings</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure global settings for test management
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="workflow" className="space-y-4">
            <WorkflowConfigurationTab entityType="test" />
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Case Templates</CardTitle>
                <CardDescription>
                  Configure test case templates and standardized formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Test Template Management</h3>
                    <p className="text-muted-foreground mt-1">
                      Create and manage templates for test cases, test plans, and test cycles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Automation Settings</CardTitle>
                <CardDescription>
                  Configure integration with test automation tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Test Automation Integration</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure connections to test automation frameworks and CI/CD pipelines
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fields" className="space-y-4">
            <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
              <div className="text-center">
                <h3 className="text-lg font-medium">Test Custom Fields</h3>
                <p className="text-muted-foreground mt-1">
                  Configure custom fields for test cases and test execution
                </p>
              </div>
            </div>
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
