
import { useState, useEffect } from 'react';
import { User, UserRole } from '@/utils/types/user';
import { mockUsers } from '@/utils/mockData/users';
import { useUserSearch } from './userManagement/useUserSearch';
import { useUserFilters } from './userManagement/useUserFilters';
import { useUserCrud } from './userManagement/useUserCrud';
import { useUserImportExport } from './userManagement/useUserImportExport';
import { ViewType } from '@/components/users/UserViewToggle';

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
    handleToggleUserStatus,
    handleUserRoleChange
  } = useUserCrud(mockUsers);

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const { searchTerm, handleSearch, filterUsersBySearchTerm } = useUserSearch();
  const { filterUsersByRole } = useUserFilters();
  const { handleImportUsers, handleExportUsers } = useUserImportExport(users, setUsers);
  
  // Add view type state
  const [viewType, setViewType] = useState<ViewType>(() => {
    // Get from localStorage or default to grid
    const savedView = localStorage.getItem('user-management-view');
    return (savedView as ViewType) || 'grid';
  });

  // Save view preference
  const handleViewChange = (view: ViewType) => {
    setViewType(view);
    localStorage.setItem('user-management-view', view);
  };

  // Effect to sync with localStorage if it changes elsewhere
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user-management-view' && e.newValue) {
        setViewType(e.newValue as ViewType);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
    viewType,
    handleViewChange,
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
    handleUserRoleChange,
    // Add these for backward compatibility with UserManagement.tsx and Users.tsx
    handleToggleUserStatus,
    filteredUsers: () => filteredUsers()
  };
};
