
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Admin: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure system settings and manage administrative tasks
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="queues">Queues</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="glass-panel p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              <p>General admin settings will be implemented here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <div className="glass-panel p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p>User management will be implemented here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="queues" className="space-y-4">
            <div className="glass-panel p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Queue Management</h2>
              <p>Queue management will be implemented here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="glass-panel p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <p>Security settings will be implemented here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Admin;
