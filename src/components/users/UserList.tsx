
import React from 'react';
import { User } from '@/utils/types/user';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onViewUser: (userId: string) => void;
  onRemoveUser?: (userId: string) => void;
  onChangeRole?: (userId: string) => void;
  onToggleStatus?: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ 
  users, 
  onViewUser,
  onRemoveUser = () => {},
  onChangeRole = () => {},
  onToggleStatus = () => {}
}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.length === 0 && (
        <div className="col-span-full py-10 text-center">
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
      
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={onViewUser}
          onRemoveUser={onRemoveUser}
          onChangeRole={onChangeRole}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default UserList;
