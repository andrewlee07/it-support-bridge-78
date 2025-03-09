
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserList from '@/components/users/UserList';
import PageTransition from '@/components/shared/PageTransition';

const UserManagementPage = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage system users, roles and permissions
          </p>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <UserList />
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            <UserList />
          </TabsContent>
          
          <TabsContent value="inactive" className="space-y-4">
            <UserList />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default UserManagementPage;
