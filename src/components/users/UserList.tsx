
import React from 'react';
import { User } from '@/utils/types/user';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onViewUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onViewUser }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={onViewUser} 
        />
      ))}
    </div>
  );
};

export default UserList;
