
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BugDropdownFieldsTab from '@/components/admin/bug-configuration/BugDropdownFieldsTab';
import BugSeverityConfiguration from '@/components/admin/BugSeverityConfiguration';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';

const BugConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Bug Configuration' }
  ];
  
  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('backlog');

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bug Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure settings for bug management
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="severity">Severity Settings</TabsTrigger>
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general bug management settings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* General settings content */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="severity">
            <BugSeverityConfiguration />
          </TabsContent>
          
          <TabsContent value="dropdowns">
            <Card>
              <CardHeader>
                <CardTitle>Bug Dropdown Fields</CardTitle>
                <CardDescription>Configure dropdown fields for bug management</CardDescription>
              </CardHeader>
              <CardContent>
                <BugDropdownFieldsTab />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="backlog"
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
