
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import AutoCloseConfigurationTab from '@/components/admin/AutoCloseConfigurationTab';
import SLAConfigurationTab from '@/components/admin/SLAConfigurationTab';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import DropdownFieldsTab from '@/components/admin/change-configuration/DropdownFieldsTab';
import BusinessHoursConfigurationTab from '@/components/admin/BusinessHoursConfigurationTab';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import WorkflowConfigurationTab from '@/components/admin/configuration/WorkflowConfigurationTab';

const IncidentConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Incident Configuration' }
  ];

  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('incident');
  
  // Add a form context for components that might need it
  const form = useForm();

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure settings for incident management
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="sla">SLA Settings</TabsTrigger>
            <TabsTrigger value="business-hours">Business Hours</TabsTrigger>
            <TabsTrigger value="autoclose">Auto-Close</TabsTrigger>
            <TabsTrigger value="dropdowns">Dropdown Fields</TabsTrigger>
            <TabsTrigger value="mandatoryfields">Mandatory Fields</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general incident management settings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* General settings content */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="workflow">
            <WorkflowConfigurationTab entityType="incident" />
          </TabsContent>
          
          <TabsContent value="sla">
            <Form {...form}>
              <SLAConfigurationTab ticketType="incident" />
            </Form>
          </TabsContent>
          
          <TabsContent value="business-hours">
            <Form {...form}>
              <BusinessHoursConfigurationTab moduleType="incident" />
            </Form>
          </TabsContent>
          
          <TabsContent value="autoclose">
            <Form {...form}>
              <AutoCloseConfigurationTab moduleType="incident" />
            </Form>
          </TabsContent>
          
          <TabsContent value="dropdowns">
            <Card>
              <CardHeader>
                <CardTitle>Incident Dropdown Fields</CardTitle>
                <CardDescription>Configure dropdown fields for incident management</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <DropdownFieldsTab />
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="incident"
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

export default IncidentConfiguration;
