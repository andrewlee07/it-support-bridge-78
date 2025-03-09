import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, UserRole } from '@/utils/types/user';
import { Edit2, UserCheck, UserX, Trash2 } from 'lucide-react';

interface Column {
  key: keyof User | 'actions' | string;
  label: string;
  sortable?: boolean;
}

interface UserTableProps {
  users: User[];
  onViewUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
  onRoleChange: (userId: string, role: UserRole, checked: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onViewUser,
  onRemoveUser,
  onToggleStatus,
  onEditUser,
  onRoleChange,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const availableRoles: UserRole[] = [
    'admin',
    'manager',
    'agent',
    'developer',
    'it',
    'user',
    'problem-manager',
    'change-manager',
    'release-manager',
  ];

  // Generate columns dynamically - base columns plus one column per role
  const baseColumns: Column[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'active', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions' },
  ];
  
  // Add role columns
  const roleColumns: Column[] = availableRoles.map(role => ({
    key: `role-${role}`,
    label: getRoleDisplayName(role),
  }));
  
  const columns = [...baseColumns, ...roleColumns];

  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] === undefined) return 1;
        if (b[sortConfig.key] === undefined) return -1;
        
        // Convert values to string for comparison
        const aValue = String(a[sortConfig.key]);
        const bValue = String(b[sortConfig.key]);
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const getRoleDisplayName = (role: UserRole) => {
    switch(role) {
      case 'it': return 'IT Staff';
      case 'admin': return 'Admin';
      case 'manager': return 'Manager';
      case 'agent': return 'Agent';
      case 'developer': return 'Developer';
      case 'problem-manager': return 'Problem Manager';
      case 'change-manager': return 'Change Manager';
      case 'release-manager': return 'Release Manager';
      default: return 'End User';
    }
  };

  const hasRole = (user: User, role: UserRole): boolean => {
    return user.role === role || (user.roles && user.roles.includes(role));
  };

  const handleRoleChange = (user: User, role: UserRole, checked: boolean) => {
    onRoleChange(user.id, role, checked);
  };

  if (!users.length) {
    return (
      <div className="text-center p-8 border rounded-md bg-muted/10">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <ScrollArea className="w-full" orientation="horizontal" type="always">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead 
                    key={String(column.key)}
                    className={column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={column.sortable ? () => requestSort(column.key as keyof User) : undefined}
                  >
                    {column.label}
                    {sortConfig?.key === column.key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
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
                          handleRoleChange(user, role, checked as boolean)
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserTable;
