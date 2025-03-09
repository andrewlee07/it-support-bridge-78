
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserTabsNavigationProps {
  onTabChange: (value: string) => void;
}

const UserTabsNavigation: React.FC<UserTabsNavigationProps> = ({
  onTabChange,
}) => {
  return (
    <TabsList>
      <TabsTrigger value="all">All Users</TabsTrigger>
      <TabsTrigger value="active">Active</TabsTrigger>
      <TabsTrigger value="inactive">Inactive</TabsTrigger>
    </TabsList>
  );
};

export default UserTabsNavigation;
