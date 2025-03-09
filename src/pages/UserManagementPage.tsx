
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserList from '@/components/users/UserList';
import UserTable from '@/components/users/UserTable';
import UserViewToggle from '@/components/users/UserViewToggle';
import PageTransition from '@/components/shared/PageTransition';
import { useUserManagement } from '@/hooks/useUserManagement';
import { ViewType } from '@/components/users/UserViewToggle';

const UserManagementPage = () => {
  const {
    users,
    activeFilter,
    setActiveFilter,
    handleViewUser,
    handleRemoveUser,
    handleChangeRole,
    handleToggleStatus,
    handleUpdateUser,
    viewType,
    handleViewChange
  } = useUserManagement();

  const handleTabChange = (value: string) => {
    setActiveFilter(value as 'all' | 'active' | 'inactive');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage system users, roles and permissions
            </p>
          </div>
          <UserViewToggle view={viewType} onChange={handleViewChange} />
        </div>
        
        <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {viewType === 'grid' ? (
              <UserList 
                users={users}
                onViewUser={handleViewUser}
                onRemoveUser={handleRemoveUser}
                onChangeRole={handleChangeRole}
                onToggleStatus={handleToggleStatus}
                onEditUser={handleUpdateUser}
              />
            ) : (
              <UserTable 
                users={users}
                onViewUser={handleViewUser}
                onRemoveUser={handleRemoveUser}
                onToggleStatus={handleToggleStatus}
                onEditUser={handleUpdateUser}
                onRoleChange={handleChangeRole}
              />
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            {viewType === 'grid' ? (
              <UserList 
                users={users}
                onViewUser={handleViewUser}
                onRemoveUser={handleRemoveUser}
                onChangeRole={handleChangeRole}
                onToggleStatus={handleToggleStatus}
                onEditUser={handleUpdateUser}
              />
            ) : (
              <UserTable 
                users={users}
                onViewUser={handleViewUser}
                onRemoveUser={handleRemoveUser}
                onToggleStatus={handleToggleStatus}
                onEditUser={handleUpdateUser}
                onRoleChange={handleChangeRole}
              />
            )}
          </TabsContent>
          
          <TabsContent value="inactive" className="space-y-4">
            {viewType === 'grid' ? (
              <UserList 
                users={users}
                onViewUser={handleViewUser}
                onRemoveUser={handleRemoveUser}
                onChangeRole={handleChangeRole}
                onToggleStatus={handleToggleStatus}
                onEditUser={handleUpdateUser}
              />
            ) : (
              <UserTable 
                users={users}
                onViewUser={handleViewUser}
                onRemoveUser={handleRemoveUser}
                onToggleStatus={handleToggleStatus}
                onEditUser={handleUpdateUser}
                onRoleChange={handleChangeRole}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default UserManagementPage;
