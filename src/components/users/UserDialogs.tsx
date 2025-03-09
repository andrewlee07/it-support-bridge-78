
import React from 'react';
import { UserRole } from '@/utils/types/user';
import AddUserDialog from './AddUserDialog';
import RemoveUserDialog from './RemoveUserDialog';
import ChangeRoleDialog from './ChangeRoleDialog';
import EditUserDialog from './EditUserDialog';

interface UserDialogsProps {
  selectedUserId: string | null;
  selectedRole: UserRole;
  onClose: () => void;
  onRoleChange: (role: UserRole) => void;
  newUser: {
    name: string;
    email: string;
    role: UserRole;
    roles: UserRole[];
    department: string;
    title: string;
  };
  setNewUser: (user: {
    name: string;
    email: string;
    role: UserRole;
    roles?: UserRole[];
    department: string;
    title: string;
  }) => void;
  handleAddUser: () => void;
  handleRemoveUser: () => void;
  handleChangeRole: () => void;
  handleUpdateUser: (updatedUser: any) => void;
}

const UserDialogs: React.FC<UserDialogsProps> = ({
  selectedUserId,
  selectedRole,
  onClose,
  onRoleChange,
  newUser,
  setNewUser,
  handleAddUser,
  handleRemoveUser,
  handleChangeRole,
  handleUpdateUser,
}) => {
  // For simplicity, we're using open state based on selectedUserId
  // In a real app, you'd have individual open states
  
  return (
    <>
      <AddUserDialog 
        open={false} 
        onOpenChange={() => {}} 
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={handleAddUser}
      />
      
      <RemoveUserDialog 
        open={false} 
        onOpenChange={onClose}
        onRemoveUser={handleRemoveUser}
      />
      
      <ChangeRoleDialog 
        open={false} 
        onOpenChange={onClose}
        selectedRole={selectedRole}
        onRoleChange={onRoleChange}
        onUpdateRole={handleChangeRole}
      />
      
      <EditUserDialog 
        open={false} 
        onOpenChange={onClose}
        user={null}
        onUpdateUser={handleUpdateUser}
      />
    </>
  );
};

export default UserDialogs;
