
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import UserSearchBar from '@/components/users/UserSearchBar';
import { useUserManagement } from '@/hooks/useUserManagement';
import UserManagementHeader from '@/components/users/UserManagementHeader';
import UserTabsNavigation from '@/components/users/UserTabsNavigation';
import UserTabsContent from '@/components/users/UserTabsContent';
import UserDialogs from '@/components/users/UserDialogs';

const UserManagement = () => {
  const {
    users,
    selectedUserId,
    setSelectedUserId,
    selectedRole,
    setSelectedRole,
    newUser,
    setNewUser,
    handleSearch,
    filteredUsers,
    handleViewUser,
    handleAddUser,
    handleRemoveUser,
    handleUpdateUser,
    handleChangeRole,
    handleToggleUserStatus,
    handleImportUsers,
    handleExportUsers
  } = useUserManagement();
  
  // Dialog states
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [removeUserDialogOpen, setRemoveUserDialogOpen] = useState(false);
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);

  // Get selected user for editing
  const selectedUser = selectedUserId ? users.find(u => u.id === selectedUserId) || null : null;

  return (
    <PageTransition>
      <div className="space-y-6">
        <UserManagementHeader 
          onAddUser={() => setAddUserDialogOpen(true)}
          onImportUsers={() => setImportDialogOpen(true)}
          onExportUsers={handleExportUsers}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UserSearchBar onChange={handleSearch} />
        </div>

        <Tabs defaultValue="all" className="animate-fade-in">
          <UserTabsNavigation />
          
          <UserTabsContent 
            users={filteredUsers()} 
            onViewUser={handleViewUser}
            onRemoveUser={(id) => {
              setSelectedUserId(id);
              setRemoveUserDialogOpen(true);
            }}
            onChangeRole={(id) => {
              setSelectedUserId(id);
              const user = users.find(u => u.id === id);
              if (user) {
                setSelectedRole(user.role);
              }
              setChangeRoleDialogOpen(true);
            }}
            onToggleStatus={handleToggleUserStatus}
            onEditUser={(id) => {
              setSelectedUserId(id);
              setEditUserDialogOpen(true);
            }}
          />
        </Tabs>
      </div>

      <UserDialogs 
        addUserDialogOpen={addUserDialogOpen}
        setAddUserDialogOpen={setAddUserDialogOpen}
        removeUserDialogOpen={removeUserDialogOpen}
        setRemoveUserDialogOpen={setRemoveUserDialogOpen}
        changeRoleDialogOpen={changeRoleDialogOpen}
        setChangeRoleDialogOpen={setChangeRoleDialogOpen}
        importDialogOpen={importDialogOpen}
        setImportDialogOpen={setImportDialogOpen}
        editUserDialogOpen={editUserDialogOpen}
        setEditUserDialogOpen={setEditUserDialogOpen}
        selectedUser={selectedUser}
        newUser={newUser}
        setNewUser={setNewUser}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        handleAddUser={handleAddUser}
        handleRemoveUser={handleRemoveUser}
        handleChangeRole={handleChangeRole}
        handleImportUsers={handleImportUsers}
        handleUpdateUser={handleUpdateUser}
      />
    </PageTransition>
  );
};

export default UserManagement;
