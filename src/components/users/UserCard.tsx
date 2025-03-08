
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/utils/types/user';
import { Pencil, Trash2, UserCheck, UserX } from 'lucide-react';

interface UserCardProps {
  user: User;
  onClick: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  onChangeRole: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onClick, 
  onRemoveUser, 
  onChangeRole,
  onToggleStatus 
}) => {
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
      case 'manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'it':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300';
      case 'agent':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
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
      case 'manager': return 'Manager';
      case 'agent': return 'Agent';
      default: return 'End User';
    }
  };

  // Prevent bubbling events for action buttons
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
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
        <div className="flex gap-2">
          <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
            {getRoleDisplayName(user.role)}
          </Badge>
          {typeof user.active !== 'undefined' && (
            <Badge variant={user.active ? "default" : "secondary"}>
              {user.active ? "Active" : "Inactive"}
            </Badge>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-medium text-lg">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-sm mt-1">Department: <span className="text-muted-foreground">{user.department}</span></p>
        {user.title && <p className="text-sm">Title: <span className="text-muted-foreground">{user.title}</span></p>}
      </div>
      <div className="flex gap-2 mt-4 pt-3 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => handleActionClick(e, () => onChangeRole(user.id))}
          className="flex-1"
        >
          <Pencil className="h-3.5 w-3.5 mr-1" /> Role
        </Button>
        <Button 
          variant={user.active ? "ghost" : "outline"}
          size="sm" 
          onClick={(e) => handleActionClick(e, () => onToggleStatus(user.id))}
          className="flex-1"
        >
          {user.active ? <UserX className="h-3.5 w-3.5 mr-1" /> : <UserCheck className="h-3.5 w-3.5 mr-1" />}
          {user.active ? 'Disable' : 'Enable'}
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={(e) => handleActionClick(e, () => onRemoveUser(user.id))}
          className="flex-1"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
