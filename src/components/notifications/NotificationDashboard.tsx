
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationSystemHealth from './NotificationSystemHealth';
import EmailTemplateList from './EmailTemplateList';
import WebhookConfigList from './WebhookConfigList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, Webhook, BarChart3, Settings } from 'lucide-react';

const NotificationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto py-6 space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Center</h1>
          <p className="text-muted-foreground mt-1">
            Manage all notification settings and monitor system health
          </p>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="flex items-center justify-start sm:justify-center py-2">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="email-templates" className="flex items-center justify-start sm:justify-center py-2">
            <Mail className="mr-2 h-4 w-4" />
            <span>Email Templates</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center justify-start sm:justify-center py-2">
            <Webhook className="mr-2 h-4 w-4" />
            <span>Webhooks</span>
          </TabsTrigger>
          <TabsTrigger value="notification-logs" className="flex items-center justify-start sm:justify-center py-2">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notification Logs</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center justify-start sm:justify-center py-2">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Email Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <div className="text-xs text-muted-foreground mt-1">Active email notification templates</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Webhooks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <div className="text-xs text-muted-foreground mt-1">Active webhook integrations</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,458</div>
                <div className="text-xs text-muted-foreground mt-1">Notifications sent in last 24 hours</div>
              </CardContent>
            </Card>
          </div>

          <NotificationSystemHealth />

          <Card>
            <CardHeader>
              <CardTitle>Recently Added Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: 'Release Scheduled',
                    type: 'Email Template',
                    status: 'Active',
                    created: 'Today, 10:23 AM',
                  },
                  {
                    name: 'Teams Channel Integration',
                    type: 'Webhook',
                    status: 'Testing',
                    created: 'Yesterday, 4:30 PM',
                  },
                  {
                    name: 'Service Outage Alert',
                    type: 'Email Template',
                    status: 'Active',
                    created: '3 days ago',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.created}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge
                        variant={
                          item.status === 'Active'
                            ? 'success'
                            : item.status === 'Testing'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email-templates">
          <EmailTemplateList />
        </TabsContent>

        <TabsContent value="webhooks">
          <WebhookConfigList />
        </TabsContent>

        <TabsContent value="notification-logs">
          <Card>
            <CardHeader>
              <CardTitle>Notification Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">Notification logs will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">Notification system settings will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationDashboard;
