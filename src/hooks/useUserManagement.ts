
import { useState } from 'react';
import { User } from '@/utils/types/user';
import { mockUsers } from '@/utils/mockData/users';
import { useUserSearch } from './userManagement/useUserSearch';
import { useUserFilters } from './userManagement/useUserFilters';
import { useUserCrud } from './userManagement/useUserCrud';
import { useUserImportExport } from './userManagement/useUserImportExport';

export const useUserManagement = () => {
  const { 
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
  } = useUserCrud(mockUsers);

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const { searchTerm, handleSearch, filterUsersBySearchTerm } = useUserSearch();
  const { filterUsersByRole } = useUserFilters();
  const { handleImportUsers, handleExportUsers } = useUserImportExport(users, setUsers);

  // Get filtered users based on activeFilter
  const filteredUsers = (): User[] => {
    let filtered = users;
    
    if (activeFilter !== 'all') {
      filtered = users.filter(user => user.active === (activeFilter === 'active'));
    }
    
    return filterUsersBySearchTerm(filtered);
  };

  return {
    users: filteredUsers(),
    activeFilter,
    setActiveFilter,
    searchTerm,
    selectedUserId,
    setSelectedUserId,
    selectedRole,
    setSelectedRole,
    newUser,
    setNewUser,
    handleSearch,
    handleViewUser,
    handleAddUser,
    handleRemoveUser,
    handleUpdateUser,
    handleChangeRole,
    handleToggleStatus: handleToggleUserStatus,
    handleEditUser: handleUpdateUser,
    handleImportUsers,
    handleExportUsers,
    // Add these for backward compatibility with UserManagement.tsx and Users.tsx
    handleToggleUserStatus,
    filteredUsers: () => filteredUsers()
  };
};
