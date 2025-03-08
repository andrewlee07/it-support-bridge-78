
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import UserList from '@/components/users/UserList';
import { UserRole } from '@/utils/types/user';
import { useUserManagement } from '@/hooks/useUserManagement';

const Users = () => {
  const { 
    users, 
    handleViewUser, 
    handleRemoveUser,
    handleChangeRole,
    handleToggleUserStatus,
    handleUpdateUser,
    selectedUserId,
    setSelectedUserId,
    selectedRole,
    setSelectedRole
  } = useUserManagement();

  // Add the necessary callback functions
  const onEditUser = (userId: string) => {
    setSelectedUserId(userId);
    // Here you would typically open an edit dialog or navigate to edit page
    console.log(`Editing user: ${userId}`);
  };
  
  const onRemoveUser = (userId: string) => {
    setSelectedUserId(userId);
    // Here you would typically open a confirmation dialog
    console.log(`Removing user: ${userId}`);
  };
  
  const onChangeRole = (userId: string) => {
    setSelectedUserId(userId);
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedRole(user.role);
    }
    // Here you would typically open a role change dialog
    console.log(`Changing role for user: ${userId}`);
  };

  const filterUsersByRole = (role: UserRole | 'all'): Array<any> => {
    if (role === 'all') return users;
    return users.filter(user => user.role === role);
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">All Users</h2>
          <UserList 
            users={users} 
            onViewUser={handleViewUser} 
            onRemoveUser={onRemoveUser}
            onChangeRole={onChangeRole}
            onToggleStatus={handleToggleUserStatus}
            onEditUser={onEditUser}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Administrators</h2>
          <UserList 
            users={filterUsersByRole('admin')} 
            onViewUser={handleViewUser} 
            onRemoveUser={onRemoveUser}
            onChangeRole={onChangeRole}
            onToggleStatus={handleToggleUserStatus}
            onEditUser={onEditUser}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">IT Staff</h2>
          <UserList 
            users={filterUsersByRole('it')} 
            onViewUser={handleViewUser} 
            onRemoveUser={onRemoveUser}
            onChangeRole={onChangeRole}
            onToggleStatus={handleToggleUserStatus}
            onEditUser={onEditUser}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">End Users</h2>
          <UserList 
            users={filterUsersByRole('user')} 
            onViewUser={handleViewUser} 
            onRemoveUser={onRemoveUser}
            onChangeRole={onChangeRole}
            onToggleStatus={handleToggleUserStatus}
            onEditUser={onEditUser}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Users;
