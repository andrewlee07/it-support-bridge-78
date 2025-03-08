
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BugSeverityConfiguration from '@/components/admin/BugSeverityConfiguration';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';

const BugConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Bug Configuration' }
  ];

  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('ticket');

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bug Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure settings for bug tracking and management
          </p>
        </div>

        <Tabs defaultValue="severity">
          <TabsList className="mb-4">
            <TabsTrigger value="severity">Severity Levels</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>
          
          <TabsContent value="severity">
            <BugSeverityConfiguration />
          </TabsContent>
          
          <TabsContent value="workflow">
            <Card>
              <CardHeader>
                <CardTitle>Bug Workflow</CardTitle>
                <CardDescription>Configure bug workflow and status transitions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Workflow settings content */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="ticket"
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

export default BugConfiguration;
