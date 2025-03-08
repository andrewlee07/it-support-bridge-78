
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserTabsNavigation: React.FC = () => {
  return (
    <TabsList className="mb-4">
      <TabsTrigger value="all">All Users</TabsTrigger>
      <TabsTrigger value="admin">Admins</TabsTrigger>
      <TabsTrigger value="it">IT Staff</TabsTrigger>
      <TabsTrigger value="user">End Users</TabsTrigger>
    </TabsList>
  );
};

export default UserTabsNavigation;
