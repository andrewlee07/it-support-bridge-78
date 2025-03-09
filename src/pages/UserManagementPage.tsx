
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import UserViewToggle from '@/components/users/UserViewToggle';
import PageTransition from '@/components/shared/PageTransition';
import { useUserManagement } from '@/hooks/useUserManagement';
import UserTabsNavigation from '@/components/users/UserTabsNavigation';
import UserTabContent from '@/components/users/UserTabContent';

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
    handleViewChange,
    handleUserRoleChange
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
          <UserTabsNavigation onTabChange={handleTabChange} />
          
          <UserTabContent 
            value="all" 
            users={users}
            viewType={viewType}
            onViewUser={handleViewUser}
            onRemoveUser={handleRemoveUser}
            onChangeRole={handleChangeRole}
            onToggleStatus={handleToggleStatus}
            onEditUser={handleUpdateUser}
            onRoleChange={handleUserRoleChange}
          />
          
          <UserTabContent 
            value="active" 
            users={users}
            viewType={viewType}
            onViewUser={handleViewUser}
            onRemoveUser={handleRemoveUser}
            onChangeRole={handleChangeRole}
            onToggleStatus={handleToggleStatus}
            onEditUser={handleUpdateUser}
            onRoleChange={handleUserRoleChange}
          />
          
          <UserTabContent 
            value="inactive" 
            users={users}
            viewType={viewType}
            onViewUser={handleViewUser}
            onRemoveUser={handleRemoveUser}
            onChangeRole={handleChangeRole}
            onToggleStatus={handleToggleStatus}
            onEditUser={handleUpdateUser}
            onRoleChange={handleUserRoleChange}
          />
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default UserManagementPage;
