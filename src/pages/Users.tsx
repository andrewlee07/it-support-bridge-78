
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import UserManagement from '@/components/users/UserManagement';

const Users = () => {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <UserManagement />
      </div>
    </PageTransition>
  );
};

export default Users;
