
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

  const { searchTerm, handleSearch, filterUsersBySearchTerm } = useUserSearch();
  const { filterUsersByRole } = useUserFilters();
  const { handleImportUsers, handleExportUsers } = useUserImportExport(users, setUsers);

  const filteredUsers = (role?: string): User[] => {
    let filteredByRole = filterUsersByRole(users, role);
    return filterUsersBySearchTerm(filteredByRole);
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
    handleUpdateUser,
    handleChangeRole,
    handleToggleUserStatus,
    handleImportUsers,
    handleExportUsers
  };
};
