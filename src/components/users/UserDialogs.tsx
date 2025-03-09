
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
        isOpen={false} 
        onClose={() => {}} 
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={handleAddUser}
      />
      
      <RemoveUserDialog 
        isOpen={false} 
        onClose={onClose}
        onConfirm={handleRemoveUser}
      />
      
      <ChangeRoleDialog 
        isOpen={false} 
        onClose={onClose}
        selectedRole={selectedRole}
        onRoleChange={onRoleChange}
        onConfirm={handleChangeRole}
      />
      
      <EditUserDialog 
        isOpen={false} 
        onClose={onClose}
        user={null}
        onUpdate={handleUpdateUser}
      />
    </>
  );
};

export default UserDialogs;
