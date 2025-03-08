
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import UserList from '@/components/users/UserList';
import { User } from '@/utils/types/user';

interface UserTabsContentProps {
  users: User[];
  onViewUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
  onChangeRole: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

const UserTabsContent: React.FC<UserTabsContentProps> = ({
  users,
  onViewUser,
  onRemoveUser,
  onChangeRole,
  onToggleStatus,
  onEditUser
}) => {
  // Filter users by their role
  const adminUsers = users.filter(user => user.role === 'admin');
  const itUsers = users.filter(user => user.role === 'it');
  const endUsers = users.filter(user => user.role === 'user');

  return (
    <>
      <TabsContent value="all" className="mt-0">
        <UserList 
          users={users} 
          onViewUser={onViewUser} 
          onRemoveUser={onRemoveUser}
          onChangeRole={onChangeRole}
          onToggleStatus={onToggleStatus}
          onEditUser={onEditUser}
        />
      </TabsContent>
      
      <TabsContent value="admin" className="mt-0">
        <UserList 
          users={adminUsers} 
          onViewUser={onViewUser} 
          onRemoveUser={onRemoveUser}
          onChangeRole={onChangeRole}
          onToggleStatus={onToggleStatus}
          onEditUser={onEditUser}
        />
      </TabsContent>
      
      <TabsContent value="it" className="mt-0">
        <UserList 
          users={itUsers} 
          onViewUser={onViewUser} 
          onRemoveUser={onRemoveUser}
          onChangeRole={onChangeRole}
          onToggleStatus={onToggleStatus}
          onEditUser={onEditUser}
        />
      </TabsContent>
      
      <TabsContent value="user" className="mt-0">
        <UserList 
          users={endUsers} 
          onViewUser={onViewUser} 
          onRemoveUser={onRemoveUser}
          onChangeRole={onChangeRole}
          onToggleStatus={onToggleStatus}
          onEditUser={onEditUser}
        />
      </TabsContent>
    </>
  );
};

export default UserTabsContent;
