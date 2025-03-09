
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, UserRole } from '@/utils/types/user';
import { Column } from './types';
import { getRoleDisplayName } from './userTableUtils';

interface UserTableHeaderProps {
  columns: Column[];
  sortConfig: {
    key: keyof User;
    direction: 'ascending' | 'descending';
  } | null;
  requestSort: (key: keyof User) => void;
}

const UserTableHeader: React.FC<UserTableHeaderProps> = ({ 
  columns, 
  sortConfig, 
  requestSort 
}) => {
  return (
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
  );
};

export default UserTableHeader;
