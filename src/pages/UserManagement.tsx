
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import UserList from '@/components/users/UserList';
import UserSearchBar from '@/components/users/UserSearchBar';
import { useUserManagement } from '@/hooks/useUserManagement';
import UserManagementHeader from '@/components/users/UserManagementHeader';
import AddUserDialog from '@/components/users/AddUserDialog';
import RemoveUserDialog from '@/components/users/RemoveUserDialog';
import ChangeRoleDialog from '@/components/users/ChangeRoleDialog';
import ImportUsersDialog from '@/components/users/ImportUsersDialog';
import EditUserDialog from '@/components/users/EditUserDialog';
import { useAuth } from '@/contexts/AuthContext';

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
  
  const { user: currentUser } = useAuth();
  
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
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
            <TabsTrigger value="it">IT Staff</TabsTrigger>
            <TabsTrigger value="user">End Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <UserList 
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
          </TabsContent>
          
          <TabsContent value="admin" className="mt-0">
            <UserList 
              users={filteredUsers('admin')} 
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
          </TabsContent>
          
          <TabsContent value="it" className="mt-0">
            <UserList 
              users={filteredUsers('it')} 
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
          </TabsContent>
          
          <TabsContent value="user" className="mt-0">
            <UserList 
              users={filteredUsers('user')} 
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <AddUserDialog 
        open={addUserDialogOpen}
        onOpenChange={setAddUserDialogOpen}
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={() => {
          handleAddUser();
          setAddUserDialogOpen(false);
        }}
      />

      <RemoveUserDialog 
        open={removeUserDialogOpen}
        onOpenChange={setRemoveUserDialogOpen}
        onRemoveUser={() => {
          handleRemoveUser();
          setRemoveUserDialogOpen(false);
        }}
      />

      <ChangeRoleDialog 
        open={changeRoleDialogOpen}
        onOpenChange={setChangeRoleDialogOpen}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        onUpdateRole={() => {
          handleChangeRole();
          setChangeRoleDialogOpen(false);
        }}
      />

      <ImportUsersDialog 
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImportUsers={handleImportUsers}
      />

      <EditUserDialog
        open={editUserDialogOpen}
        onOpenChange={setEditUserDialogOpen}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />
    </PageTransition>
  );
};

export default UserManagement;
