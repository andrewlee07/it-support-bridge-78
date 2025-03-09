
import { useState, useCallback } from 'react';
import { User } from '@/utils/types/user';
import { getAllUsers, updateUser } from '@/utils/mockData/users';
import { useToast } from '@/hooks/use-toast';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>(getAllUsers());
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const { toast } = useToast();

  // Filter users based on active status
  const filteredUsers = useCallback(() => {
    if (activeFilter === 'all') return users;
    return users.filter(user => user.active === (activeFilter === 'active'));
  }, [users, activeFilter]);

  // Handle viewing a user
  const handleViewUser = useCallback((userId: string) => {
    console.log('Viewing user details:', userId);
    // Implementation for viewing user details
  }, []);

  // Handle removing a user
  const handleRemoveUser = useCallback((userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    toast({
      title: "User removed",
      description: "User has been successfully removed from the system."
    });
  }, [toast]);

  // Handle changing a user's role
  const handleChangeRole = useCallback((userId: string) => {
    console.log('Changing role for user:', userId);
    // Implementation for changing user role
  }, []);

  // Handle toggling user status (active/inactive)
  const handleToggleStatus = useCallback((userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedUser = { ...user, active: !user.active };
          updateUser(updatedUser);
          return updatedUser;
        }
        return user;
      })
    );
    
    toast({
      title: "User status updated",
      description: "User status has been successfully updated."
    });
  }, [toast]);

  // Handle editing a user
  const handleEditUser = useCallback((userId: string) => {
    console.log('Editing user:', userId);
    // Implementation for editing user
  }, []);

  return {
    users: filteredUsers(),
    activeFilter,
    setActiveFilter,
    handleViewUser,
    handleRemoveUser,
    handleChangeRole,
    handleToggleStatus,
    handleEditUser
  };
};
