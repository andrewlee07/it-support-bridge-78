
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/users/UserManagement';
import PageTransition from '@/components/shared/PageTransition';
import { Shield, Users, ShieldCheck } from 'lucide-react';
import RoleManagement from '@/components/users/RoleManagement';
import PermissionManagement from '@/components/users/PermissionManagement';

const UserManagementPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage users, roles and permissions
            </p>
          </div>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Roles</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Permissions</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="roles" className="space-y-4">
            <RoleManagement />
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-4">
            <PermissionManagement />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default UserManagementPage;
