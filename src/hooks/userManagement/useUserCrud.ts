
import { useState } from 'react';
import { User, UserRole } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';

export const useUserCrud = (initialUsers: User[]) => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const { toast } = useToast();
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as UserRole,
    department: '',
    title: '',
  });

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    // In a real app, this would navigate to the user profile page
    console.log(`Viewing user profile: ${userId}`);
  };

  const handleAddUser = () => {
    // In a real app, this would make an API call
    const newUserId = `user-${users.length + 1}`;
    const userToAdd: User = {
      id: newUserId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      title: newUser.title,
      active: true,
      createdAt: new Date(),
      lastActive: new Date(),
      mfaEnabled: false,
      securityQuestions: [],
      loginAttempts: 0,
      passwordLastChanged: new Date(),
      sessionTimeout: 30
    };
    
    setUsers([...users, userToAdd]);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      department: '',
      title: '',
    });
    
    toast({
      title: "User added",
      description: `${userToAdd.name} has been added successfully.`
    });
  };

  const handleRemoveUser = () => {
    if (!selectedUserId) return;
    
    // In a real app, this would make an API call
    const updatedUsers = users.filter(user => user.id !== selectedUserId);
    setUsers(updatedUsers);
    
    toast({
      title: "User removed",
      description: "The user has been removed successfully."
    });
  };

  const handleUpdateUser = (updatedUserData: Partial<User>) => {
    if (!selectedUserId) return;
    
    // In a real app, this would make an API call
    const updatedUsers = users.map(user => {
      if (user.id === selectedUserId) {
        return { ...user, ...updatedUserData };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: "User updated",
      description: "User details have been updated successfully."
    });
  };

  const handleChangeRole = () => {
    if (!selectedUserId) return;
    
    // In a real app, this would make an API call
    const updatedUsers = users.map(user => {
      if (user.id === selectedUserId) {
        return { ...user, role: selectedRole };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: "Role updated",
      description: `User role has been updated to ${selectedRole}.`
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    // In a real app, this would make an API call
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, active: !user.active };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const targetUser = updatedUsers.find(user => user.id === userId);
    
    toast({
      title: targetUser?.active ? "User activated" : "User deactivated",
      description: `${targetUser?.name} has been ${targetUser?.active ? 'activated' : 'deactivated'}.`
    });
  };

  return {
    users,
    setUsers,
    selectedUserId,
    setSelectedUserId,
    selectedRole,
    setSelectedRole,
    newUser,
    setNewUser,
    handleViewUser,
    handleAddUser,
    handleRemoveUser,
    handleUpdateUser,
    handleChangeRole,
    handleToggleUserStatus
  };
};
