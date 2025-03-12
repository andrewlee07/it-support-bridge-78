
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, InboxIcon, ArrowLeftRight } from 'lucide-react';
import GroupsManagement from '@/components/admin/groups/GroupsManagement';
import QueuesManagement from '@/components/admin/groups/QueuesManagement';
import GroupRoleManagement from '@/components/admin/groups/GroupRoleManagement';

const GroupsQueueManagement: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Groups & Queues Management</h1>
            <p className="text-muted-foreground">
              Configure groups, associate roles, and manage work queues
            </p>
          </div>
        </div>

        <Tabs defaultValue="groups" className="space-y-4">
          <TabsList>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Groups</span>
            </TabsTrigger>
            <TabsTrigger value="queues" className="flex items-center gap-2">
              <InboxIcon className="h-4 w-4" />
              <span>Queues</span>
            </TabsTrigger>
            <TabsTrigger value="role-assignments" className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Role Assignments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="groups" className="space-y-4">
            <GroupsManagement />
          </TabsContent>
          
          <TabsContent value="queues" className="space-y-4">
            <QueuesManagement />
          </TabsContent>
          
          <TabsContent value="role-assignments" className="space-y-4">
            <GroupRoleManagement />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default GroupsQueueManagement;
