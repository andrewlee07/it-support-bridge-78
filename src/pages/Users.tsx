
import React from 'react';
import UserManagement from '@/components/users/UserManagement';
import PageTransition from '@/components/shared/PageTransition';

const Users = () => {
  return (
    <PageTransition>
      <UserManagement />
    </PageTransition>
  );
};

export default Users;
