
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { Database, Users, Calendar, GitBranch } from 'lucide-react';
import RoutingRulesManager from '@/components/notifications/routing/RoutingRulesManager';
import ScheduleBasedRules from '@/components/notifications/routing/ScheduleBasedRules';
import CustomRecipientMappingConfig from '@/components/notifications/routing/CustomRecipientMappingConfig';
import RuleConditionBuilder from '@/components/notifications/routing/RuleConditionBuilder';

const NotificationRoutingRules = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Notification Routing Rules' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notification Routing Rules</h1>
            <p className="text-muted-foreground mt-1">
              Configure how notifications are routed to different channels and recipients
            </p>
          </div>
        </div>

        <Tabs defaultValue="rules">
          <TabsList className="mb-4">
            <TabsTrigger value="rules" className="flex items-center">
              <GitBranch className="h-4 w-4 mr-2" />
              Routing Rules
            </TabsTrigger>
            <TabsTrigger value="conditions" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Condition Builder
            </TabsTrigger>
            <TabsTrigger value="recipients" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Recipient Mapping
            </TabsTrigger>
            <TabsTrigger value="schedules" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Rules
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules">
            <RoutingRulesManager />
          </TabsContent>
          
          <TabsContent value="conditions">
            <RuleConditionBuilder />
          </TabsContent>
          
          <TabsContent value="recipients">
            <CustomRecipientMappingConfig />
          </TabsContent>
          
          <TabsContent value="schedules">
            <ScheduleBasedRules />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default NotificationRoutingRules;
