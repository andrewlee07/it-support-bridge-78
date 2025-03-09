
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
    roles: [] as UserRole[],
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
      roles: [newUser.role, ...newUser.roles],
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
      roles: [],
      department: '',
      title: '',
    });
    
    toast({
      title: "User added",
      description: `${userToAdd.name} has been added successfully.`
    });
  };

  const handleRemoveUser = (userId: string) => {
    // In a real app, this would make an API call
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    toast({
      title: "User removed",
      description: "The user has been removed successfully."
    });
  };

  const handleUpdateUser = (userId: string) => {
    // In a real app, this would make an API call or navigate to edit page
    setSelectedUserId(userId);
    console.log(`Editing user: ${userId}`);
    
    toast({
      title: "User edit",
      description: "Edit user details."
    });
  };

  const handleChangeRole = (userId: string) => {
    setSelectedUserId(userId);
    
    // In a real app, this would open a dialog or navigate to edit page
    console.log(`Changing role for user: ${userId}`);
    
    toast({
      title: "Role selection",
      description: "Select a new role for the user."
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

  const handleUserRoleChange = (userId: string, role: UserRole, checked: boolean) => {
    // In a real app, this would make an API call
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        // Initialize roles array if it doesn't exist
        const roles = user.roles || [user.role];
        
        if (checked && !roles.includes(role)) {
          // Add the role
          return { 
            ...user, 
            roles: [...roles, role],
            // Update the primary role if this is the first role or current primary role is being removed
            role: roles.length === 0 ? role : user.role
          };
        } else if (!checked && roles.includes(role)) {
          // Remove the role, but ensure there's at least one role
          const updatedRoles = roles.filter(r => r !== role);
          if (updatedRoles.length === 0) {
            return user; // Don't remove the last role
          }
          
          // If the primary role is being removed, set the first available role as primary
          const newPrimaryRole = user.role === role ? updatedRoles[0] : user.role;
          
          return { 
            ...user, 
            roles: updatedRoles,
            role: newPrimaryRole
          };
        }
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const targetUser = updatedUsers.find(user => user.id === userId);
    
    toast({
      title: "Role updated",
      description: `${targetUser?.name}'s roles have been updated.`
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
    handleToggleUserStatus,
    handleUserRoleChange
  };
};
