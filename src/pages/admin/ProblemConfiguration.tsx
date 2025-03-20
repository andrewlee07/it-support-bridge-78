
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';

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

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Problem Management Settings</CardTitle>
            <CardDescription>Configure problem management workflow and fields</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="workflow">Workflow</TabsTrigger>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Workflow Settings</CardTitle>
                    <CardDescription>Configure problem workflow settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Workflow settings content */}
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
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default ProblemConfiguration;
