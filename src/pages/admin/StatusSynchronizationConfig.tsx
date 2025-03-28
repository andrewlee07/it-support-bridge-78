
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { StatusMappingTable } from '@/components/admin/status-sync/StatusMappingTable';
import PageTransition from '@/components/shared/PageTransition';
import Breadcrumb from '@/components/shared/Breadcrumb';
import MandatoryFieldsConfig from '@/components/admin/configuration/MandatoryFieldsConfig';
import { MandatoryFieldConfig } from '@/utils/types/configuration';
import { v4 as uuidv4 } from 'uuid';

const StatusSynchronizationConfig = () => {
  const { toast } = useToast();
  const { 
    settings, 
    updateSettings, 
    isLoading,
    validateConfiguration,
    refresh,
    mandatoryFields,
    updateMandatoryFields
  } = useStatusSynchronization();

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    updateSettings(newSettings);
    toast({
      title: "Settings updated",
      description: `${key} is now ${!settings[key] ? 'enabled' : 'disabled'}.`
    });
  };

  const handleUpdateMappings = (releaseToBacklogMapping, releaseToBugMapping) => {
    updateSettings({
      ...settings,
      releaseToBacklogMapping,
      releaseToBugMapping
    });
  };

  const handleSaveMandatoryFields = (fields: MandatoryFieldConfig[]) => {
    // Ensure all fields have an ID before saving
    const fieldsWithIds = fields.map(field => 
      field.id ? field : { ...field, id: uuidv4() }
    );
    updateMandatoryFields(fieldsWithIds);
  };

  const breadcrumbItems = [
    { label: 'Admin Settings', path: '/admin-settings' },
    { label: 'Status Synchronization' }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Status Synchronization</h1>
          <p className="text-muted-foreground mt-1">
            Configure how status changes propagate between releases, backlog items, and bugs
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Status Synchronization Settings</CardTitle>
            <CardDescription>
              Control how status changes in releases affect linked items
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="cascading-updates" className="flex flex-col space-y-1">
                <span>Enable Cascading Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  When a release status changes, automatically update linked backlog items and bugs
                </span>
              </Label>
              <Switch
                id="cascading-updates"
                checked={settings.enableCascadingUpdates}
                onCheckedChange={() => handleToggle('enableCascadingUpdates')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="date-sync" className="flex flex-col space-y-1">
                <span>Enable Date Synchronization</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Synchronize dates between releases and backlog items
                </span>
              </Label>
              <Switch
                id="date-sync"
                checked={settings.enableDateSynchronization}
                onCheckedChange={() => handleToggle('enableDateSynchronization')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="notify-changes" className="flex flex-col space-y-1">
                <span>Notify on Status Change</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Show notifications when items are automatically updated
                </span>
              </Label>
              <Switch
                id="notify-changes"
                checked={settings.notifyOnStatusChange}
                onCheckedChange={() => handleToggle('notifyOnStatusChange')}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="allow-overrides" className="flex flex-col space-y-1">
                <span>Allow Manual Overrides</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Allow users to manually override automatic status changes
                </span>
              </Label>
              <Switch
                id="allow-overrides"
                checked={settings.allowOverrides}
                onCheckedChange={() => handleToggle('allowOverrides')}
              />
            </div>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">Status Mappings</h3>
              <StatusMappingTable 
                mappings={settings.releaseToBacklogMapping}
                bugMappings={settings.releaseToBugMapping}
                onUpdate={handleUpdateMappings}
                isLoading={isLoading}
                isDisabled={!settings.enableCascadingUpdates}
              />
            </div>
            
            <div className="pt-6">
              <h3 className="text-lg font-medium mb-4">Mandatory Fields</h3>
              <MandatoryFieldsConfig
                entityType="release"
                fields={mandatoryFields || [
                  { id: uuidv4(), fieldName: 'title', displayName: 'Title', isRequired: true, entityType: 'release', description: 'The name of the release' },
                  { id: uuidv4(), fieldName: 'version', displayName: 'Version', isRequired: false, entityType: 'release', description: 'The version number of the release' },
                  { id: uuidv4(), fieldName: 'description', displayName: 'Description', isRequired: false, entityType: 'release', description: 'A detailed description of the release' },
                  { id: uuidv4(), fieldName: 'plannedDate', displayName: 'Planned Date', isRequired: false, entityType: 'release', description: 'The planned release date' },
                  { id: uuidv4(), fieldName: 'status', displayName: 'Status', isRequired: true, entityType: 'release', description: 'The current status of the release' }
                ]}
                onSave={handleSaveMandatoryFields}
                isLoading={isLoading}
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={refresh}
                disabled={isLoading}
              >
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default StatusSynchronizationConfig;
