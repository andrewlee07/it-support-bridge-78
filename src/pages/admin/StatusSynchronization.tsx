
import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { StatusMappingTable } from '@/components/admin/status-sync/StatusMappingTable';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';

const StatusSynchronization = () => {
  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Status Synchronization' }
  ];

  const { 
    settings, 
    updateSettings, 
    isLoading 
  } = useStatusSynchronization();

  const handleToggleSetting = (settingName: string) => {
    if (!settings) return;
    
    const newSettings = {
      ...settings,
      [settingName]: !settings[settingName as keyof typeof settings]
    };
    
    updateSettings(newSettings);
  };

  if (!settings) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <Breadcrumb items={breadcrumbItems} />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Status Synchronization</h1>
            <p className="text-muted-foreground mt-1">Loading settings...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Status Synchronization</h1>
          <p className="text-muted-foreground mt-1">
            Configure how status changes in one module affect related items
          </p>
        </div>
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>About Status Synchronization</AlertTitle>
          <AlertDescription>
            Status synchronization enables automatic updates of related items when the status of a parent item changes.
            For example, when a release is marked as "Deployed", associated backlog items can be automatically marked as "Completed".
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure global status synchronization behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="enableCascadingUpdates" className="flex flex-col space-y-1">
                <span>Enable Cascading Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Automatically update child items when parent status changes
                </span>
              </Label>
              <Switch
                id="enableCascadingUpdates"
                checked={settings.enableCascadingUpdates}
                onCheckedChange={() => handleToggleSetting('enableCascadingUpdates')}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="enableDateSynchronization" className="flex flex-col space-y-1">
                <span>Enable Date Synchronization</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Sync completion dates when statuses are updated
                </span>
              </Label>
              <Switch
                id="enableDateSynchronization"
                checked={settings.enableDateSynchronization}
                onCheckedChange={() => handleToggleSetting('enableDateSynchronization')}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="notifyOnStatusChange" className="flex flex-col space-y-1">
                <span>Notify on Status Change</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Send notifications when statuses are synchronized
                </span>
              </Label>
              <Switch
                id="notifyOnStatusChange"
                checked={settings.notifyOnStatusChange}
                onCheckedChange={() => handleToggleSetting('notifyOnStatusChange')}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="allowOverrides" className="flex flex-col space-y-1">
                <span>Allow Manual Overrides</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Allow users to override synchronized statuses
                </span>
              </Label>
              <Switch
                id="allowOverrides"
                checked={settings.allowOverrides}
                onCheckedChange={() => handleToggleSetting('allowOverrides')}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <StatusMappingTable 
          mappings={settings.releaseToBacklogMapping} 
          bugMappings={settings.releaseToBugMapping}
          onUpdate={() => {}}
          settings={settings}
          updateSettings={updateSettings}
          isLoading={isLoading}
          isDisabled={!settings.enableCascadingUpdates}
        />
      </div>
    </PageTransition>
  );
};

export default StatusSynchronization;
