
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Bell, Zap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const CustomKnownErrorSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Configuration state
  const [config, setConfig] = useState({
    general: {
      autoCreateFromProblems: true,
      requireWorkaround: true,
      enableVersioning: true,
      requireApproval: false,
      allowExternalSubmissions: false
    },
    notification: {
      notifyOnCreate: true,
      notifyOnUpdate: true,
      notifyOnWorkaroundUpdate: true,
      notifyOnResolution: true,
      notifyAffectedUsers: true,
      slackIntegration: false,
      teamsIntegration: false,
      emailNotifications: true,
      smsNotifications: false
    },
    fallbacks: {
      enableFallbacks: true,
      primaryChannel: "email",
      fallbackChannels: ["inApp"]
    }
  });

  const handleGeneralChange = (key: string, value: boolean) => {
    setConfig({
      ...config,
      general: {
        ...config.general,
        [key]: value
      }
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setConfig({
      ...config,
      notification: {
        ...config.notification,
        [key]: value
      }
    });
  };

  const handleFallbackChannelSelection = (channelId: string) => {
    const currentFallbacks = [...config.fallbacks.fallbackChannels];
    const channelIndex = currentFallbacks.indexOf(channelId);
    
    if (channelIndex > -1) {
      currentFallbacks.splice(channelIndex, 1);
    } else {
      currentFallbacks.push(channelId);
    }
    
    setConfig({
      ...config,
      fallbacks: {
        ...config.fallbacks,
        fallbackChannels: currentFallbacks
      }
    });
  };

  const handlePrimaryChannelChange = (value: string) => {
    setConfig({
      ...config,
      fallbacks: {
        ...config.fallbacks,
        primaryChannel: value
      }
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Known Error settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved known error settings:", config);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">
            <AlertTriangle className="h-4 w-4 mr-2" />
            General Settings
          </TabsTrigger>
          <TabsTrigger value="notification">
            <Bell className="h-4 w-4 mr-2" />
            Notification Settings
          </TabsTrigger>
          <TabsTrigger value="channels">
            <Zap className="h-4 w-4 mr-2" />
            Channel Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Known Error Database Settings</CardTitle>
              <CardDescription>
                Configure how known errors are created and managed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-create" className="flex flex-col space-y-1">
                  <span>Auto-create from Problems</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically create known errors when problems are identified
                  </span>
                </Label>
                <Switch 
                  id="auto-create" 
                  checked={config.general.autoCreateFromProblems}
                  onCheckedChange={(checked) => handleGeneralChange('autoCreateFromProblems', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="require-workaround" className="flex flex-col space-y-1">
                  <span>Require workaround</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    A workaround must be provided for all known errors
                  </span>
                </Label>
                <Switch 
                  id="require-workaround" 
                  checked={config.general.requireWorkaround}
                  onCheckedChange={(checked) => handleGeneralChange('requireWorkaround', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-versioning" className="flex flex-col space-y-1">
                  <span>Enable versioning</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Track changes made to known errors over time
                  </span>
                </Label>
                <Switch 
                  id="enable-versioning" 
                  checked={config.general.enableVersioning}
                  onCheckedChange={(checked) => handleGeneralChange('enableVersioning', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="require-approval" className="flex flex-col space-y-1">
                  <span>Require approval</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    New known errors require approval before publication
                  </span>
                </Label>
                <Switch 
                  id="require-approval" 
                  checked={config.general.requireApproval}
                  onCheckedChange={(checked) => handleGeneralChange('requireApproval', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="allow-external" className="flex flex-col space-y-1">
                  <span>Allow external submissions</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow external partners to submit known errors
                  </span>
                </Label>
                <Switch 
                  id="allow-external" 
                  checked={config.general.allowExternalSubmissions}
                  onCheckedChange={(checked) => handleGeneralChange('allowExternalSubmissions', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure notifications for known error events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-create" className="flex flex-col space-y-1">
                  <span>New Known Error</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Send notifications when a new known error is created
                  </span>
                </Label>
                <Switch 
                  id="notify-create" 
                  checked={config.notification.notifyOnCreate}
                  onCheckedChange={(checked) => handleNotificationChange('notifyOnCreate', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-update" className="flex flex-col space-y-1">
                  <span>Known Error Updates</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Send notifications when known errors are updated
                  </span>
                </Label>
                <Switch 
                  id="notify-update" 
                  checked={config.notification.notifyOnUpdate}
                  onCheckedChange={(checked) => handleNotificationChange('notifyOnUpdate', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-workaround" className="flex flex-col space-y-1">
                  <span>Workaround Updates</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Send notifications when workarounds are added or updated
                  </span>
                </Label>
                <Switch 
                  id="notify-workaround" 
                  checked={config.notification.notifyOnWorkaroundUpdate}
                  onCheckedChange={(checked) => handleNotificationChange('notifyOnWorkaroundUpdate', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-resolution" className="flex flex-col space-y-1">
                  <span>Resolution Notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Send notifications when known errors are resolved
                  </span>
                </Label>
                <Switch 
                  id="notify-resolution" 
                  checked={config.notification.notifyOnResolution}
                  onCheckedChange={(checked) => handleNotificationChange('notifyOnResolution', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-affected" className="flex flex-col space-y-1">
                  <span>Notify Affected Users</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Automatically notify users of affected services
                  </span>
                </Label>
                <Switch 
                  id="notify-affected" 
                  checked={config.notification.notifyAffectedUsers}
                  onCheckedChange={(checked) => handleNotificationChange('notifyAffectedUsers', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Configuration</CardTitle>
              <CardDescription>
                Configure notification channels for known errors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Active Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="email-notifications" 
                      checked={config.notification.emailNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('emailNotifications', checked as boolean)
                      }
                    />
                    <label
                      htmlFor="email-notifications"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email Notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sms-notifications" 
                      checked={config.notification.smsNotifications}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('smsNotifications', checked as boolean)
                      }
                    />
                    <label
                      htmlFor="sms-notifications"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      SMS Notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="slack-integration" 
                      checked={config.notification.slackIntegration}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('slackIntegration', checked as boolean)
                      }
                    />
                    <label
                      htmlFor="slack-integration"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Slack Integration
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="teams-integration" 
                      checked={config.notification.teamsIntegration}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('teamsIntegration', checked as boolean)
                      }
                    />
                    <label
                      htmlFor="teams-integration"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Microsoft Teams Integration
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Fallback Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="enable-fallbacks">Enable Fallback Channels</Label>
                    <Switch 
                      id="enable-fallbacks" 
                      checked={config.fallbacks.enableFallbacks}
                      onCheckedChange={(checked) => {
                        setConfig({
                          ...config,
                          fallbacks: {
                            ...config.fallbacks,
                            enableFallbacks: checked
                          }
                        });
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-channel">Primary Notification Channel</Label>
                    <Select 
                      value={config.fallbacks.primaryChannel} 
                      onValueChange={handlePrimaryChannelChange}
                      disabled={!config.fallbacks.enableFallbacks}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select primary channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="inApp">In-App</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Fallback Channels</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fallback-email" 
                          checked={config.fallbacks.fallbackChannels.includes('email')}
                          onCheckedChange={() => handleFallbackChannelSelection('email')}
                          disabled={!config.fallbacks.enableFallbacks || config.fallbacks.primaryChannel === 'email'}
                        />
                        <label
                          htmlFor="fallback-email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fallback-inapp" 
                          checked={config.fallbacks.fallbackChannels.includes('inApp')}
                          onCheckedChange={() => handleFallbackChannelSelection('inApp')}
                          disabled={!config.fallbacks.enableFallbacks || config.fallbacks.primaryChannel === 'inApp'}
                        />
                        <label
                          htmlFor="fallback-inapp"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          In-App
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fallback-slack" 
                          checked={config.fallbacks.fallbackChannels.includes('slack')}
                          onCheckedChange={() => handleFallbackChannelSelection('slack')}
                          disabled={!config.fallbacks.enableFallbacks || config.fallbacks.primaryChannel === 'slack'}
                        />
                        <label
                          htmlFor="fallback-slack"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Slack
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fallback-teams" 
                          checked={config.fallbacks.fallbackChannels.includes('teams')}
                          onCheckedChange={() => handleFallbackChannelSelection('teams')}
                          disabled={!config.fallbacks.enableFallbacks || config.fallbacks.primaryChannel === 'teams'}
                        />
                        <label
                          htmlFor="fallback-teams"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Microsoft Teams
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fallback-sms" 
                          checked={config.fallbacks.fallbackChannels.includes('sms')}
                          onCheckedChange={() => handleFallbackChannelSelection('sms')}
                          disabled={!config.fallbacks.enableFallbacks || config.fallbacks.primaryChannel === 'sms'}
                        />
                        <label
                          htmlFor="fallback-sms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          SMS
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default CustomKnownErrorSettings;
