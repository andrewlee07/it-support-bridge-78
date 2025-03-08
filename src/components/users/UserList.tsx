
import React from 'react';
import UserCard from './UserCard';
import { User } from '@/utils/types/user';

interface UserListProps {
  users: User[];
  onViewUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  onChangeRole: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ 
  users, 
  onViewUser, 
  onRemoveUser, 
  onChangeRole, 
  onToggleStatus,
  onEditUser
}) => {
  if (users.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md bg-muted/10">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={onViewUser}
          onRemoveUser={onRemoveUser}
          onChangeRole={onChangeRole}
          onToggleStatus={onToggleStatus}
          onEditUser={onEditUser}
        />
      ))}
    </div>
  );
};

export default UserList;
