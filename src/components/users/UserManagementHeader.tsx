
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download } from 'lucide-react';

interface UserManagementHeaderProps {
  onAddUser: () => void;
  onImportUsers: () => void;
  onExportUsers: () => void;
}

const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  onAddUser,
  onImportUsers,
  onExportUsers
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage users, roles, and access levels
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={onExportUsers}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" onClick={onImportUsers}>
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button onClick={onAddUser}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UserManagementHeader;
