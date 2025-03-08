
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import SecuritySettings from '@/components/admin/SecuritySettings';
import UserMFASettings from '@/components/admin/UserMFASettings';
import ConfigurationSettings from '@/components/admin/ConfigurationSettings';
import { ConfigurableEntityType } from '@/utils/types';

const AdminSettings = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Admin Settings</h1>
      
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="configurations">Configurations</TabsTrigger>
          <TabsTrigger value="mfa">MFA Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="security" className="mt-0">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="configurations" className="mt-0">
          <ConfigurationSettings />
        </TabsContent>
        
        <TabsContent value="mfa" className="mt-0">
          <UserMFASettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
