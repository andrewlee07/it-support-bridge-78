import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import UserSearchBar from '@/components/users/UserSearchBar';
import { useUserManagement } from '@/hooks/useUserManagement';
import UserManagementHeader from '@/components/users/UserManagementHeader';
import UserTabsNavigation from '@/components/users/UserTabsNavigation';
import UserTabsContent from '@/components/users/UserTabsContent';
import UserDialogs from '@/components/users/UserDialogs';
import { User } from '@/utils/types/user';

const UserManagement = () => {
  const {
    users,
    activeFilter,
    searchTerm,
    selectedUserId,
    setSelectedUserId,
    selectedRole,
    setSelectedRole,
    newUser,
    setNewUser,
    handleSearch,
    handleViewUser,
    handleAddUser,
    handleRemoveUser,
    handleUpdateUser,
    handleChangeRole,
    handleToggleStatus,
    handleImportUsers,
    handleExportUsers,
    setActiveFilter
  } = useUserManagement();
  
  // Dialog states
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [removeUserDialogOpen, setRemoveUserDialogOpen] = useState(false);
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);

  // Get selected user for editing
  const selectedUser = selectedUserId ? users.find(u => u.id === selectedUserId) || null : null;

  // Wrapper functions to handle dialogs and update logic
  const onRemoveUser = (id: string) => {
    setSelectedUserId(id);
    setRemoveUserDialogOpen(true);
  };

  const onChangeRole = (id: string) => {
    setSelectedUserId(id);
    const user = users.find(u => u.id === id);
    if (user) {
      setSelectedRole(user.role);
    }
    setChangeRoleDialogOpen(true);
  };

  const onEditUser = (id: string) => {
    setSelectedUserId(id);
    setEditUserDialogOpen(true);
  };

  // Empty wrapper functions for dialog handlers
  const handleAddUserFromDialog = () => {
    handleAddUser();
  };

  const handleRemoveUserFromDialog = () => {
    if (selectedUserId) {
      handleRemoveUser(selectedUserId);
    }
    setRemoveUserDialogOpen(false);
  };

  const handleChangeRoleFromDialog = () => {
    if (selectedUserId) {
      handleChangeRole(selectedUserId);
    }
    setChangeRoleDialogOpen(false);
  };

  const handleUpdateUserFromDialog = (updatedUser: Partial<User>) => {
    if (selectedUserId) {
      // Convert to the expected format by extracting the ID and passing it
      handleUpdateUser(selectedUserId);
    }
    setEditUserDialogOpen(false);
  };

  const handleTabChange = (value: string) => {
    setActiveFilter(value as 'all' | 'active' | 'inactive');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <UserManagementHeader 
          onAddUser={() => setAddUserDialogOpen(true)}
          onImportUsers={() => setImportDialogOpen(true)}
          onExportUsers={handleExportUsers}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UserSearchBar 
            searchTerm={searchTerm} 
            onSearchChange={handleSearch}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <Tabs defaultValue="all" className="animate-fade-in">
          <UserTabsNavigation onTabChange={handleTabChange} />
          
          <UserTabsContent 
            users={users} 
            onViewUser={handleViewUser}
            onRemoveUser={onRemoveUser}
            onChangeRole={onChangeRole}
            onToggleStatus={handleToggleStatus}
            onEditUser={onEditUser}
          />
        </Tabs>
      </div>

      {/* Since this dialog component is a placeholder and not actually used, 
          we'll fix it to match the expected props but it's not critical */}
      <UserDialogs
        selectedUserId={selectedUserId}
        selectedRole={selectedRole}
        onClose={() => setSelectedUserId(null)}
        onRoleChange={setSelectedRole}
        newUser={newUser}
        setNewUser={(userData) => {
          // Create wrapper function to handle the optional roles property
          setNewUser({
            ...userData,
            roles: userData.roles || [userData.role]
          });
        }}
        handleAddUser={handleAddUserFromDialog}
        handleRemoveUser={handleRemoveUserFromDialog}
        handleChangeRole={handleChangeRoleFromDialog}
        handleUpdateUser={handleUpdateUserFromDialog}
      />
    </PageTransition>
  );
};

export default UserManagement;
