
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';

const ProblemConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Problem Configuration' }
  ];

  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('problem');

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Management Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure settings for problem management
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="rootcause">Root Cause Analysis</TabsTrigger>
            <TabsTrigger value="knownerrors">Known Errors</TabsTrigger>
            <TabsTrigger value="escalation">Escalation Rules</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general problem management settings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* General settings content */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="workflow">
            <WorkflowConfigurationTab entityType="problem" />
          </TabsContent>
          
          <TabsContent value="rootcause">
            <Card>
              <CardHeader>
                <CardTitle>Root Cause Analysis Settings</CardTitle>
                <CardDescription>Configure root cause analysis methodology and templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Root Cause Analysis Configuration</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure RCA templates, required fields, and analysis methodology
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="knownerrors">
            <Card>
              <CardHeader>
                <CardTitle>Known Error Database Settings</CardTitle>
                <CardDescription>Configure how known errors are documented and managed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Known Error Management</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure known error documentation standards and workflows
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="escalation">
            <Card>
              <CardHeader>
                <CardTitle>Escalation Rules</CardTitle>
                <CardDescription>Configure problem escalation pathways and triggers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center border rounded-lg p-8 bg-muted/30">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Problem Escalation Configuration</h3>
                    <p className="text-muted-foreground mt-1">
                      Configure when and how problems are escalated based on impact and urgency
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="problem"
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

export default ProblemConfiguration;
