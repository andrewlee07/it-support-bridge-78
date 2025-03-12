
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InboxIcon, ListFilter, Settings } from 'lucide-react';
import QueueManagement from '@/components/admin/queues/QueueManagement';
import QueueRoutingRules from '@/components/admin/queues/QueueRoutingRules';
import QueueAssignments from '@/components/admin/queues/QueueAssignments';

const QueueConfiguration: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Queue Configuration</h1>
            <p className="text-muted-foreground">
              Configure queues, routing rules, and assignments
            </p>
          </div>
        </div>

        <Tabs defaultValue="queues" className="space-y-4">
          <TabsList>
            <TabsTrigger value="queues" className="flex items-center gap-2">
              <InboxIcon className="h-4 w-4" />
              <span>Queues</span>
            </TabsTrigger>
            <TabsTrigger value="routing" className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              <span>Routing Rules</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Assignments</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="queues" className="space-y-4">
            <QueueManagement />
          </TabsContent>
          
          <TabsContent value="routing" className="space-y-4">
            <QueueRoutingRules />
          </TabsContent>
          
          <TabsContent value="assignments" className="space-y-4">
            <QueueAssignments />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default QueueConfiguration;
