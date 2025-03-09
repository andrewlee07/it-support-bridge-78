
import React from 'react';
import { useUserManagement } from '@/hooks/useUserManagement';
import UserSearchBar from './UserSearchBar';
import UserList from './UserList';
import UserTable from './UserTable';
import UserViewToggle from './UserViewToggle';
import UserDialogs from './UserDialogs';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const UserManagement: React.FC = () => {
  const {
    users,
    activeFilter,
    searchTerm,
    selectedUserId,
    selectedRole,
    viewType,
    handleViewChange,
    handleSearch,
    handleViewUser,
    handleAddUser,
    handleRemoveUser,
    handleUpdateUser,
    handleToggleStatus,
    handleChangeRole,
    handleUserRoleChange,
    setActiveFilter,
    setSelectedUserId,
    setSelectedRole,
    newUser,
    setNewUser
  } = useUserManagement();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-2">
          <UserViewToggle view={viewType} onChange={handleViewChange} />
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <UserSearchBar 
        searchTerm={searchTerm} 
        onSearchChange={handleSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {viewType === 'grid' ? (
        <UserList 
          users={users} 
          onViewUser={handleViewUser} 
          onRemoveUser={handleRemoveUser}
          onChangeRole={handleChangeRole}
          onToggleStatus={handleToggleStatus}
          onEditUser={handleUpdateUser}
        />
      ) : (
        <UserTable 
          users={users} 
          onViewUser={handleViewUser} 
          onRemoveUser={handleRemoveUser}
          onToggleStatus={handleToggleStatus}
          onEditUser={handleUpdateUser}
          onRoleChange={handleUserRoleChange}
        />
      )}
      
      <UserDialogs
        selectedUserId={selectedUserId}
        selectedRole={selectedRole}
        onClose={() => setSelectedUserId(null)}
        onRoleChange={setSelectedRole}
        newUser={newUser}
        setNewUser={setNewUser}
        handleAddUser={handleAddUser}
        handleRemoveUser={() => {
          if (selectedUserId) handleRemoveUser(selectedUserId);
        }}
        handleChangeRole={() => {
          if (selectedUserId) handleChangeRole(selectedUserId);
        }}
        handleUpdateUser={(updatedUser) => {
          if (selectedUserId) handleUpdateUser(selectedUserId);
        }}
      />
    </div>
  );
};

export default UserManagement;
