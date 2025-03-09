
import React from 'react';
import {
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { User, UserRole } from '@/utils/types/user';
import { Edit2, UserCheck, UserX, Trash2 } from 'lucide-react';

interface UserTableRowProps {
  user: User;
  availableRoles: UserRole[];
  onViewUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
  onRoleChange: (userId: string, role: UserRole, checked: boolean) => void;
  hasRole: (user: User, role: UserRole) => boolean;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  availableRoles,
  onViewUser,
  onRemoveUser,
  onToggleStatus,
  onEditUser,
  onRoleChange,
  hasRole,
}) => {
  const handleRoleChange = (role: UserRole, checked: boolean) => {
    onRoleChange(user.id, role, checked);
  };

  return (
    <TableRow 
      key={user.id}
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onViewUser(user.id)}
    >
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.department}</TableCell>
      <TableCell>
        <Badge 
          variant={user.active ? "default" : "secondary"}
          className={user.active 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
            : "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300"
          }
        >
          {user.active ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEditUser(user.id)}
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant={user.active ? "ghost" : "outline"}
            size="sm" 
            onClick={() => onToggleStatus(user.id)}
          >
            {user.active ? <UserX className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onRemoveUser(user.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
      
      {/* Role columns - one checkbox per column */}
      {availableRoles.map(role => (
        <TableCell 
          key={`${user.id}-${role}`} 
          onClick={(e) => e.stopPropagation()}
          className="text-center"
        >
          <Checkbox 
            id={`${user.id}-${role}`}
            checked={hasRole(user, role)}
            onCheckedChange={(checked) => 
              handleRoleChange(role, checked as boolean)
            }
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default UserTableRow;
