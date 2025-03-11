
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EventDocumentationTable from '@/components/admin/notifications/EventDocumentationTable';

const NotificationConfiguration = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Settings
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notification Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Configure system-wide notification settings and manage event notifications
            </p>
          </div>

          <Tabs defaultValue="events" className="space-y-4">
            <TabsList>
              <TabsTrigger value="events">Event Documentation</TabsTrigger>
              <TabsTrigger value="templates">Notification Templates</TabsTrigger>
              <TabsTrigger value="channels">Notification Channels</TabsTrigger>
              <TabsTrigger value="settings">Default Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <EventDocumentationTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Configure notification templates for different event types.</p>
                  {/* Template management UI would go here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="channels" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Configure notification delivery channels (email, in-app, etc.)</p>
                  {/* Channel configuration UI would go here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Default Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Configure system-wide default notification preferences</p>
                  {/* Default settings configuration UI would go here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotificationConfiguration;
