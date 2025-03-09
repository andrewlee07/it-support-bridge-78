
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import UserList from '@/components/users/UserList';
import UserTable from '@/components/users/UserTable';
import { User, UserRole } from '@/utils/types/user';
import { ViewType } from './UserViewToggle';

interface UserTabContentProps {
  value: string;
  users: User[];
  viewType: ViewType;
  onViewUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  onChangeRole: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
  onRoleChange: (userId: string, role: UserRole, checked: boolean) => void;
}

const UserTabContent: React.FC<UserTabContentProps> = ({
  value,
  users,
  viewType,
  onViewUser,
  onRemoveUser,
  onChangeRole,
  onToggleStatus,
  onEditUser,
  onRoleChange,
}) => {
  return (
    <TabsContent value={value} className="space-y-4">
      {viewType === 'grid' ? (
        <UserList 
          users={users}
          onViewUser={onViewUser}
          onRemoveUser={onRemoveUser}
          onChangeRole={onChangeRole}
          onToggleStatus={onToggleStatus}
          onEditUser={onEditUser}
        />
      ) : (
        <UserTable 
          users={users}
          onViewUser={onViewUser}
          onRemoveUser={onRemoveUser}
          onToggleStatus={onToggleStatus}
          onEditUser={onEditUser}
          onRoleChange={onRoleChange}
        />
      )}
    </TabsContent>
  );
};

export default UserTabContent;
