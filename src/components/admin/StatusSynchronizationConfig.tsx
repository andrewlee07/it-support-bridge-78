
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  ReleaseStatus,
  BacklogItemStatus,
  BugStatus,
  StatusSynchronizationSettings
} from '@/utils/types';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';

type SynchronizationConfigProps = {
  settings: StatusSynchronizationSettings;
  onSave: (settings: StatusSynchronizationSettings) => void;
};

const StatusSynchronizationConfig: React.FC<SynchronizationConfigProps> = ({ settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState<StatusSynchronizationSettings>(settings);
  const { validateConfiguration } = useStatusSynchronization();
  const [activeTab, setActiveTab] = useState('general');

  const handleToggle = (key: keyof StatusSynchronizationSettings) => {
    if (typeof localSettings[key] === 'boolean') {
      setLocalSettings({
        ...localSettings,
        [key]: !localSettings[key]
      });
    }
  };

  const handleReleaseToBacklogStatusChange = (releaseStatus: ReleaseStatus, backlogStatus: BacklogItemStatus) => {
    setLocalSettings({
      ...localSettings,
      releaseToBacklogMapping: {
        ...localSettings.releaseToBacklogMapping,
        [releaseStatus]: backlogStatus
      }
    });
  };

  const handleReleaseToBugStatusChange = (releaseStatus: ReleaseStatus, bugStatus: BugStatus) => {
    setLocalSettings({
      ...localSettings,
      releaseToBugMapping: {
        ...localSettings.releaseToBugMapping,
        [releaseStatus]: bugStatus
      }
    });
  };

  const handleSave = () => {
    const isValid = validateConfiguration(localSettings);
    if (isValid) {
      onSave(localSettings);
      toast.success("Status synchronization settings saved successfully.");
    } else {
      toast.error("Invalid configuration. Please check your settings.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Status Synchronization Configuration</CardTitle>
        <CardDescription>Configure how statuses are synchronized across different modules</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="release-backlog">Release to Backlog</TabsTrigger>
            <TabsTrigger value="release-bug">Release to Bug</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableCascadingUpdates">Enable Cascading Updates</Label>
                <p className="text-sm text-muted-foreground">When a release status changes, update related items automatically</p>
              </div>
              <Switch 
                id="enableCascadingUpdates"
                checked={!!localSettings.enableCascadingUpdates}
                onCheckedChange={() => handleToggle('enableCascadingUpdates')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifyOnStatusChange">Notify on Status Change</Label>
                <p className="text-sm text-muted-foreground">Send notifications when statuses are synchronized</p>
              </div>
              <Switch 
                id="notifyOnStatusChange"
                checked={!!localSettings.notifyOnStatusChange}
                onCheckedChange={() => handleToggle('notifyOnStatusChange')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowOverrides">Allow Manual Overrides</Label>
                <p className="text-sm text-muted-foreground">Allow users to manually override synchronized statuses</p>
              </div>
              <Switch 
                id="allowOverrides"
                checked={!!localSettings.allowOverrides}
                onCheckedChange={() => handleToggle('allowOverrides')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableDateSynchronization">Enable Date Synchronization</Label>
                <p className="text-sm text-muted-foreground">Automatically update dates when statuses change</p>
              </div>
              <Switch 
                id="enableDateSynchronization"
                checked={!!localSettings.enableDateSynchronization}
                onCheckedChange={() => handleToggle('enableDateSynchronization')}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="release-backlog" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(localSettings.releaseToBacklogMapping) as ReleaseStatus[]).map((releaseStatus) => (
                <div key={releaseStatus} className="flex flex-col space-y-2">
                  <Label>{releaseStatus} Release maps to:</Label>
                  <Select 
                    value={localSettings.releaseToBacklogMapping[releaseStatus] as string}
                    onValueChange={(value) => handleReleaseToBacklogStatusChange(releaseStatus, value as BacklogItemStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="deferred">Deferred</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="release-bug" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(localSettings.releaseToBugMapping) as ReleaseStatus[]).map((releaseStatus) => (
                <div key={releaseStatus} className="flex flex-col space-y-2">
                  <Label>{releaseStatus} Release maps to:</Label>
                  <Select 
                    value={localSettings.releaseToBugMapping[releaseStatus] as string}
                    onValueChange={(value) => handleReleaseToBugStatusChange(releaseStatus, value as BugStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusSynchronizationConfig;
