
import React from 'react';
import AddUserDialog from '@/components/users/AddUserDialog';
import RemoveUserDialog from '@/components/users/RemoveUserDialog';
import ChangeRoleDialog from '@/components/users/ChangeRoleDialog';
import ImportUsersDialog from '@/components/users/ImportUsersDialog';
import EditUserDialog from '@/components/users/EditUserDialog';
import { User, UserRole } from '@/utils/types/user';

interface UserDialogsProps {
  addUserDialogOpen: boolean;
  setAddUserDialogOpen: (open: boolean) => void;
  removeUserDialogOpen: boolean;
  setRemoveUserDialogOpen: (open: boolean) => void;
  changeRoleDialogOpen: boolean;
  setChangeRoleDialogOpen: (open: boolean) => void;
  importDialogOpen: boolean;
  setImportDialogOpen: (open: boolean) => void;
  editUserDialogOpen: boolean;
  setEditUserDialogOpen: (open: boolean) => void;
  selectedUser: User | null;
  newUser: {
    name: string;
    email: string;
    role: UserRole;
    department: string;
    title: string;
  };
  setNewUser: (user: {
    name: string;
    email: string;
    role: UserRole;
    department: string;
    title: string;
  }) => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  handleAddUser: () => void;
  handleRemoveUser: () => void;
  handleChangeRole: () => void;
  handleImportUsers: (content: string) => boolean;
  handleUpdateUser: (updatedUser: Partial<User>) => void;
}

const UserDialogs: React.FC<UserDialogsProps> = ({
  addUserDialogOpen,
  setAddUserDialogOpen,
  removeUserDialogOpen,
  setRemoveUserDialogOpen,
  changeRoleDialogOpen,
  setChangeRoleDialogOpen,
  importDialogOpen,
  setImportDialogOpen,
  editUserDialogOpen,
  setEditUserDialogOpen,
  selectedUser,
  newUser,
  setNewUser,
  selectedRole,
  setSelectedRole,
  handleAddUser,
  handleRemoveUser,
  handleChangeRole,
  handleImportUsers,
  handleUpdateUser
}) => {
  return (
    <>
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
    </>
  );
};

export default UserDialogs;
