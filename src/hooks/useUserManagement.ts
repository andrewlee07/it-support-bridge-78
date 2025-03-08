
import { useState } from 'react';
import { mockUsers } from '@/utils/mockData/users';
import { User, UserRole } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';

export const useUserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredUsers = (role?: string): User[] => {
    let filtered = users;
    
    if (role && role !== 'all') {
      filtered = filtered.filter(user => user.role === role);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

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

  const handleImportUsers = (content: string) => {
    try {
      const importedUsers = JSON.parse(content);
      
      // Basic validation
      if (Array.isArray(importedUsers) && importedUsers.length > 0) {
        // Map imported data to our User type
        const validUsers = importedUsers.filter(u => u.name && u.email).map((u, index) => ({
          id: `imported-${Date.now()}-${index}`,
          name: u.name,
          email: u.email.toLowerCase(),
          role: (u.role as UserRole) || 'user',
          department: u.department || 'General',
          title: u.title || '',
          active: u.active !== false,
          createdAt: new Date(),
          lastActive: new Date(),
          mfaEnabled: false,
          securityQuestions: [],
          loginAttempts: 0,
          passwordLastChanged: new Date(),
          sessionTimeout: 30
        }));
        
        if (validUsers.length > 0) {
          setUsers([...users, ...validUsers]);
          toast({
            title: "Users imported",
            description: `Successfully imported ${validUsers.length} users.`
          });
          return true;
        } else {
          toast({
            title: "Import failed",
            description: "No valid users found in the import file.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Import failed",
          description: "Invalid format. Please upload a valid JSON file.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: "Could not parse the file. Please ensure it's valid JSON.",
        variant: "destructive"
      });
    }
    return false;
  };

  const handleExportUsers = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'users-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Users exported",
      description: "User data has been exported successfully."
    });
  };

  return {
    users,
    searchTerm,
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
    handleChangeRole,
    handleToggleUserStatus,
    handleImportUsers,
    handleExportUsers
  };
};
