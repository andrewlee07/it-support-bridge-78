
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChangesList } from './ChangesList';

interface ChangeTabsProps {
  userId?: string;
}

const ChangeTabs: React.FC<ChangeTabsProps> = ({ userId }) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Changes</TabsTrigger>
        <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <ChangesList filter="all" userId={userId} />
      </TabsContent>
      
      <TabsContent value="pending">
        <ChangesList filter="pending" userId={userId} />
      </TabsContent>
      
      <TabsContent value="upcoming">
        <ChangesList filter="upcoming" userId={userId} />
      </TabsContent>
      
      <TabsContent value="completed">
        <ChangesList filter="completed" userId={userId} />
      </TabsContent>
    </Tabs>
  );
};

export default ChangeTabs;
