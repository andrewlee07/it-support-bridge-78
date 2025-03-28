
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { StatusMappingTable } from '@/components/admin/status-sync/StatusMappingTable';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { defaultStatusSynchronizationSettings } from '@/utils/types/StatusSynchronizationSettings';

const ProcessConfiguration = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Process Configuration' }
  ];

  const { settings, updateSettings, isLoading } = useStatusSynchronization();

  // Use default mappings if settings are undefined
  const mappings = settings?.releaseToBacklogMapping || defaultStatusSynchronizationSettings.releaseToBacklogMapping;
  const bugMappings = settings?.releaseToBugMapping || defaultStatusSynchronizationSettings.releaseToBugMapping;

  const moduleLinks = [
    { name: 'Incident Configuration', path: '/admin/incident-configuration' },
    { name: 'Service Request Configuration', path: '/admin/service-request-configuration' },
    { name: 'Change Configuration', path: '/admin/change-configuration' },
    { name: 'Problem Configuration', path: '/admin/problem-configuration' },
    { name: 'Asset Configuration', path: '/admin/asset-configuration' },
    { name: 'Bug Configuration', path: '/admin/bug-configuration' },
    { name: 'Release Configuration', path: '/admin/release-configuration' },
    { name: 'Test Configuration', path: '/admin/test-configuration' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Process Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure cross-module workflows and global processes
          </p>
        </div>
        
        <Alert className="bg-amber-50 border-amber-200">
          <Info className="h-4 w-4" />
          <AlertTitle>Module-Specific Settings</AlertTitle>
          <AlertDescription className="pt-2">
            <p className="mb-2">For module-specific process configurations, please use the dedicated configuration pages:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {moduleLinks.map((link, index) => (
                <Button key={index} variant="outline" size="sm" asChild className="justify-start">
                  <Link to={link.path}>
                    <ArrowRightCircle className="mr-2 h-4 w-4" />
                    {link.name}
                  </Link>
                </Button>
              ))}
            </div>
          </AlertDescription>
        </Alert>
          
        <Tabs defaultValue="integration">
          <TabsList className="mb-4">
            <TabsTrigger value="integration">Process Integration</TabsTrigger>
            <TabsTrigger value="automation">Global Automation</TabsTrigger>
            <TabsTrigger value="synchronization">Status Synchronization</TabsTrigger>
          </TabsList>
            
          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle>Cross-Module Process Integration</CardTitle>
                <CardDescription>
                  Configure how processes integrate and interact across different modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Global process integration configuration will appear here.</p>
                <div className="mt-4 p-4 border rounded-lg bg-muted/20">
                  <h3 className="font-medium mb-2">Available Integrations</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Incident to Problem workflow</li>
                    <li>Change to Release association</li>
                    <li>Bug to Incident conversion</li>
                    <li>Asset to Change request integration</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
            
          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle>Global Automation Settings</CardTitle>
                <CardDescription>
                  Configure system-wide automation rules and triggers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Global automation configuration options will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
            
          <TabsContent value="synchronization">
            <Card>
              <CardHeader>
                <CardTitle>Status Synchronization</CardTitle>
                <CardDescription>
                  Configure how status changes in one module affect related items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StatusMappingTable 
                  mappings={mappings} 
                  bugMappings={bugMappings}
                  onUpdate={() => {}}
                  settings={settings || defaultStatusSynchronizationSettings}
                  updateSettings={updateSettings}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ProcessConfiguration;
