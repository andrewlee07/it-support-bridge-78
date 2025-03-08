
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';

const SecuritySettings: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Security Settings' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure security settings for the IT Support Bridge
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Security</TabsTrigger>
            <TabsTrigger value="mfa">MFA Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Security settings will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mfa" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>User MFA Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>MFA management settings will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default SecuritySettings;
