
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { User } from '@/utils/types/user';

interface UserCardProps {
  user: User;
  onClick: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  // Get the first letter of each name part
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Role colors
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'it':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'user':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch(role) {
      case 'it': return 'IT Staff';
      case 'admin': return 'Admin';
      default: return 'End User';
    }
  };

  return (
    <Card 
      key={user.id} 
      className="p-5 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(user.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
          {getRoleDisplayName(user.role)}
        </Badge>
      </div>
      <div>
        <h3 className="font-medium text-lg">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-sm mt-1">Department: <span className="text-muted-foreground">{user.department}</span></p>
      </div>
    </Card>
  );
};

export default UserCard;
