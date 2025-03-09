
import React from 'react';
import AddUserDialog from '@/components/users/AddUserDialog';
import RemoveUserDialog from '@/components/users/RemoveUserDialog';
import ChangeRoleDialog from '@/components/users/ChangeRoleDialog';
import ImportUsersDialog from '@/components/users/ImportUsersDialog';
import EditUserDialog from '@/components/users/EditUserDialog';
import { User, UserRole } from '@/utils/types/user';

interface UserDialogsProps {
  // Either use these props for the component based approach
  addUserDialogOpen?: boolean;
  setAddUserDialogOpen?: (open: boolean) => void;
  removeUserDialogOpen?: boolean;
  setRemoveUserDialogOpen?: (open: boolean) => void;
  changeRoleDialogOpen?: boolean;
  setChangeRoleDialogOpen?: (open: boolean) => void;
  importDialogOpen?: boolean;
  setImportDialogOpen?: (open: boolean) => void;
  editUserDialogOpen?: boolean;
  setEditUserDialogOpen?: (open: boolean) => void;
  selectedUser?: User | null;
  
  // Or use these for the simplified approach
  selectedUserId?: string | null;
  selectedRole?: UserRole;
  onClose?: () => void;
  onRoleChange?: (role: UserRole) => void;
  
  // Common props
  newUser?: {
    name: string;
    email: string;
    role: UserRole;
    roles?: UserRole[];
    department: string;
    title: string;
  };
  setNewUser?: (user: {
    name: string;
    email: string;
    role: UserRole;
    roles?: UserRole[];
    department: string;
    title: string;
  }) => void;
  handleAddUser?: () => void;
  handleRemoveUser?: () => void;
  handleChangeRole?: () => void;
  handleImportUsers?: (content: string) => boolean;
  handleUpdateUser?: (updatedUser: Partial<User>) => void;
}

const UserDialogs: React.FC<UserDialogsProps> = ({
  // Either component based approach props
  addUserDialogOpen = false,
  setAddUserDialogOpen = () => {},
  removeUserDialogOpen = false,
  setRemoveUserDialogOpen = () => {},
  changeRoleDialogOpen = false,
  setChangeRoleDialogOpen = () => {},
  importDialogOpen = false,
  setImportDialogOpen = () => {},
  editUserDialogOpen = false,
  setEditUserDialogOpen = () => {},
  selectedUser = null,
  
  // Or simplified approach props
  selectedUserId = null,
  selectedRole = 'user',
  onClose = () => {},
  onRoleChange = () => {},
  
  // Common props
  newUser = {
    name: '',
    email: '',
    role: 'user' as UserRole,
    roles: [],
    department: '',
    title: ''
  },
  setNewUser = () => {},
  handleAddUser = () => {},
  handleRemoveUser = () => {},
  handleChangeRole = () => {},
  handleImportUsers = () => false,
  handleUpdateUser = () => {}
}) => {
  // For the simplified approach, we need to handle these dialog states internally
  const [simpleAddUserDialogOpen, setSimpleAddUserDialogOpen] = React.useState(false);
  const [simpleRemoveUserDialogOpen, setSimpleRemoveUserDialogOpen] = React.useState(false);
  const [simpleChangeRoleDialogOpen, setSimpleChangeRoleDialogOpen] = React.useState(false);
  const [simpleImportDialogOpen, setSimpleImportDialogOpen] = React.useState(false);
  const [simpleEditUserDialogOpen, setSimpleEditUserDialogOpen] = React.useState(false);

  // Use either the props directly or the internal state
  const isAddUserDialogOpen = addUserDialogOpen || simpleAddUserDialogOpen;
  const isRemoveUserDialogOpen = removeUserDialogOpen || simpleRemoveUserDialogOpen;
  const isChangeRoleDialogOpen = changeRoleDialogOpen || simpleChangeRoleDialogOpen;
  const isImportDialogOpen = importDialogOpen || simpleImportDialogOpen;
  const isEditUserDialogOpen = editUserDialogOpen || simpleEditUserDialogOpen;

  const handleAddUserDialogChange = (open: boolean) => {
    if (setAddUserDialogOpen) {
      setAddUserDialogOpen(open);
    } else {
      setSimpleAddUserDialogOpen(open);
    }
    if (!open && onClose) onClose();
  };

  const handleRemoveUserDialogChange = (open: boolean) => {
    if (setRemoveUserDialogOpen) {
      setRemoveUserDialogOpen(open);
    } else {
      setSimpleRemoveUserDialogOpen(open);
    }
    if (!open && onClose) onClose();
  };

  const handleChangeRoleDialogChange = (open: boolean) => {
    if (setChangeRoleDialogOpen) {
      setChangeRoleDialogOpen(open);
    } else {
      setSimpleChangeRoleDialogOpen(open);
    }
    if (!open && onClose) onClose();
  };

  const handleImportDialogChange = (open: boolean) => {
    if (setImportDialogOpen) {
      setImportDialogOpen(open);
    } else {
      setSimpleImportDialogOpen(open);
    }
    if (!open && onClose) onClose();
  };

  const handleEditUserDialogChange = (open: boolean) => {
    if (setEditUserDialogOpen) {
      setEditUserDialogOpen(open);
    } else {
      setSimpleEditUserDialogOpen(open);
    }
    if (!open && onClose) onClose();
  };

  const handleRoleChange = (role: UserRole) => {
    if (onRoleChange) {
      onRoleChange(role);
    }
  };

  return (
    <>
      <AddUserDialog 
        open={isAddUserDialogOpen}
        onOpenChange={handleAddUserDialogChange}
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={() => {
          handleAddUser();
          handleAddUserDialogChange(false);
        }}
      />

      <RemoveUserDialog 
        open={isRemoveUserDialogOpen}
        onOpenChange={handleRemoveUserDialogChange}
        onRemoveUser={() => {
          handleRemoveUser();
          handleRemoveUserDialogChange(false);
        }}
      />

      <ChangeRoleDialog 
        open={isChangeRoleDialogOpen}
        onOpenChange={handleChangeRoleDialogChange}
        selectedRole={selectedRole}
        onRoleChange={handleRoleChange}
        onUpdateRole={() => {
          handleChangeRole();
          handleChangeRoleDialogChange(false);
        }}
      />

      <ImportUsersDialog 
        open={isImportDialogOpen}
        onOpenChange={handleImportDialogChange}
        onImportUsers={handleImportUsers}
      />

      <EditUserDialog
        open={isEditUserDialogOpen}
        onOpenChange={handleEditUserDialogChange}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />
    </>
  );
};

export default UserDialogs;
