
import { useState, useEffect } from 'react';
import { User, MFAMethod } from '@/utils/types/user';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers, updateUser } from '@/utils/mockData/users';
import { logSecurityEvent } from '@/utils/securityUtils';
import { getClientIPAddress } from '@/utils/mfaUtils';

export const useUserMFAManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setIsLoading(true);
    
    try {
      const allUsers = getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMFA = async (user: User) => {
    try {
      const updatedUser = {
        ...user,
        mfaEnabled: !user.mfaEnabled,
        // If enabling MFA, set default method
        ...(user.mfaEnabled ? {} : { mfaMethod: 'email' as MFAMethod })
      };
      
      // Update user in the mock database
      updateUser(updatedUser);
      
      // Log security event
      logSecurityEvent({
        userId: user.id,
        eventType: 'permission_change',
        ipAddress: getClientIPAddress(),
        userAgent: navigator.userAgent,
        details: `Admin ${updatedUser.mfaEnabled ? 'enabled' : 'disabled'} MFA for user ${user.email}`,
        severity: 'warning'
      });
      
      // Update local state
      setUsers(prev => 
        prev.map(u => u.id === user.id ? updatedUser : u)
      );
      
      toast({
        title: "MFA status updated",
        description: `MFA has been ${updatedUser.mfaEnabled ? 'enabled' : 'disabled'} for ${user.name}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update MFA status.",
        variant: "destructive",
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    users: filteredUsers,
    isLoading,
    searchQuery,
    handleSearchChange,
    handleToggleMFA,
    loadUsers
  };
};
