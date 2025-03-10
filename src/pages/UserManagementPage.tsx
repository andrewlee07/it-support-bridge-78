
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/users/UserManagement';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, ShieldCheck } from 'lucide-react';

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
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RolesTable />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Permissions Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PermissionsTable />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

const RolesTable: React.FC = () => {
  const roles = [
    { id: 'admin', name: 'Administrator', description: 'Full system access' },
    { id: 'manager', name: 'Manager', description: 'Manage teams and approve changes' },
    { id: 'agent', name: 'Support Agent', description: 'Handle tickets and support requests' },
    { id: 'developer', name: 'Developer', description: 'Implement changes and fixes' },
    { id: 'it', name: 'IT Staff', description: 'Manage IT resources and assets' },
    { id: 'user', name: 'Regular User', description: 'Submit tickets and service requests' },
    { id: 'problem-manager', name: 'Problem Manager', description: 'Manage problem tickets' },
    { id: 'change-manager', name: 'Change Manager', description: 'Oversee change management process' },
    { id: 'release-manager', name: 'Release Manager', description: 'Manage software releases' },
    { id: 'service-catalog-manager', name: 'Service Catalog Manager', description: 'Manage service catalog' },
  ];
  
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Role Name</th>
            <th className="py-3 px-4 text-left font-medium">Description</th>
            <th className="py-3 px-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b">
              <td className="py-3 px-4 font-medium">{role.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{role.description}</td>
              <td className="py-3 px-4 text-right">
                <button className="text-primary hover:underline text-sm">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PermissionsTable: React.FC = () => {
  const permissions = [
    { id: 'create-ticket', name: 'Create Ticket', resource: 'tickets', action: 'create' },
    { id: 'view-tickets', name: 'View Tickets', resource: 'tickets', action: 'read' },
    { id: 'update-tickets', name: 'Update Tickets', resource: 'tickets', action: 'update' },
    { id: 'delete-tickets', name: 'Delete Tickets', resource: 'tickets', action: 'delete' },
    { id: 'approve-changes', name: 'Approve Changes', resource: 'changes', action: 'approve' },
    { id: 'reject-changes', name: 'Reject Changes', resource: 'changes', action: 'reject' },
    { id: 'manage-users', name: 'Manage Users', resource: 'users', action: 'manage' },
    { id: 'view-reports', name: 'View Reports', resource: 'reports', action: 'read' },
    { id: 'configure-system', name: 'Configure System', resource: 'system', action: 'configure' },
    { id: 'manage-assets', name: 'Manage Assets', resource: 'assets', action: 'manage' },
  ];
  
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Permission Name</th>
            <th className="py-3 px-4 text-left font-medium">Resource</th>
            <th className="py-3 px-4 text-left font-medium">Action</th>
            <th className="py-3 px-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="border-b">
              <td className="py-3 px-4 font-medium">{permission.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{permission.resource}</td>
              <td className="py-3 px-4 text-muted-foreground">{permission.action}</td>
              <td className="py-3 px-4 text-right">
                <button className="text-primary hover:underline text-sm">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
