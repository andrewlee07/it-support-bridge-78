
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import AutoCloseConfigurationTab from '@/components/admin/AutoCloseConfigurationTab';
import SLAConfigurationTab from '@/components/admin/SLAConfigurationTab';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { useMandatoryFields } from '@/hooks/useMandatoryFields';
import BusinessHoursConfigurationTab from '@/components/admin/BusinessHoursConfigurationTab';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import SecurityCaseDropdownFieldsTab from '@/components/admin/security-configuration/SecurityCaseDropdownFieldsTab';

const SecurityCaseConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'IT Security Configuration' }
  ];

  const { mandatoryFields, updateMandatoryFields, isLoading } = useMandatoryFields('security-case');
  
  // Add a form context for components that might need it
  const form = useForm();

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IT Security Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure settings for IT security case management
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
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
                <CardDescription>Configure general IT security case management settings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* General settings content */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sla">
            <Form {...form}>
              <SLAConfigurationTab ticketType="security-case" />
            </Form>
          </TabsContent>
          
          <TabsContent value="business-hours">
            <Form {...form}>
              <BusinessHoursConfigurationTab moduleType="security-case" />
            </Form>
          </TabsContent>
          
          <TabsContent value="autoclose">
            <Form {...form}>
              <AutoCloseConfigurationTab moduleType="security-case" />
            </Form>
          </TabsContent>
          
          <TabsContent value="dropdowns">
            <Card>
              <CardHeader>
                <CardTitle>IT Security Dropdown Fields</CardTitle>
                <CardDescription>Configure dropdown fields for IT security case management</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <SecurityCaseDropdownFieldsTab />
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mandatoryfields">
            <MandatoryFieldsConfig
              entityType="security-case"
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

export default SecurityCaseConfiguration;
