
import React, { useState } from 'react';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, UserRole } from '@/utils/types/user';
import { Column, UserTableProps } from './table/types';
import UserTableHeader from './table/UserTableHeader';
import UserTableRow from './table/UserTableRow';
import EmptyState from './table/EmptyState';
import { getRoleDisplayName, hasRole, sortUsers } from './table/userTableUtils';

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

  const sortedUsers = sortUsers(users, sortConfig);

  if (!users.length) {
    return <EmptyState />;
  }

  return (
    <div className="border rounded-md">
      <ScrollArea className="w-full" orientation="horizontal" type="always">
        <div className="min-w-[1000px]">
          <Table>
            <UserTableHeader 
              columns={columns} 
              sortConfig={sortConfig} 
              requestSort={requestSort} 
            />
            <TableBody>
              {sortedUsers.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  availableRoles={availableRoles}
                  onViewUser={onViewUser}
                  onRemoveUser={onRemoveUser}
                  onToggleStatus={onToggleStatus}
                  onEditUser={onEditUser}
                  onRoleChange={onRoleChange}
                  hasRole={hasRole}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserTable;
