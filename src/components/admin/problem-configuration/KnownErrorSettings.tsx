
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSectionHeader from '@/components/changes/form/FormSectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Bell, BookOpen, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const KnownErrorSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    idPrefix: "KE-",
    autoCreateFromProblem: true,
    requireWorkaround: true,
    requireSymptoms: true,
    reviewFrequency: "quarterly",
    enableVersioning: true,
    defaultTemplate: "",
    notifications: {
      onCreated: true,
      onUpdated: true,
      onWorkaroundUpdated: true,
      onPlanToFix: true,
      onResolved: true
    },
    notifyGroups: {
      serviceOwners: true,
      problemManagers: true,
      supportTeam: true,
      allUsers: false
    }
  });
  
  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationToggle = (eventType: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [eventType]: !prev.notifications[eventType as keyof typeof prev.notifications]
      }
    }));
  };

  const handleNotifyGroupToggle = (group: string) => {
    setSettings(prev => ({
      ...prev,
      notifyGroups: {
        ...prev.notifyGroups,
        [group]: !prev.notifyGroups[group as keyof typeof prev.notifyGroups]
      }
    }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Known error database settings have been updated successfully."
      });
      setIsSaving(false);
    }, 800);
    
    console.log("Saved known error settings:", settings);
  };
  
  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-6">
        <TabsTrigger value="general" className="flex items-center">
          <Info className="h-4 w-4 mr-2" />
          General Settings
        </TabsTrigger>
        <TabsTrigger value="documentation" className="flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          Documentation
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="warnings" className="flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Warnings & Alerts
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Known Error Database Settings</CardTitle>
            <CardDescription>Configure how known errors are documented and managed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <FormSectionHeader 
                title="Identification & Creation" 
                description="Configure how known errors are identified and created" 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="space-y-2">
                  <Label htmlFor="idPrefix">Known Error ID Prefix</Label>
                  <Input 
                    id="idPrefix" 
                    value={settings.idPrefix}
                    onChange={(e) => handleChange("idPrefix", e.target.value)}
                    placeholder="KE-"
                  />
                  <p className="text-sm text-muted-foreground">
                    Prefix used for known error reference IDs
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reviewFrequency">Review Frequency</Label>
                  <Select 
                    value={settings.reviewFrequency} 
                    onValueChange={(value) => handleChange("reviewFrequency", value)}
                  >
                    <SelectTrigger id="reviewFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="biannually">Biannually</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    How often known errors should be reviewed
                  </p>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="autoCreateFromProblem" 
                    checked={settings.autoCreateFromProblem}
                    onCheckedChange={(checked) => handleChange("autoCreateFromProblem", checked)}
                  />
                  <div>
                    <Label htmlFor="autoCreateFromProblem">Auto-create from Problem</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create a known error entry when a problem is marked as 'Known Error'
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enableVersioning" 
                    checked={settings.enableVersioning}
                    onCheckedChange={(checked) => handleChange("enableVersioning", checked)}
                  />
                  <div>
                    <Label htmlFor="enableVersioning">Enable Versioning</Label>
                    <p className="text-sm text-muted-foreground">
                      Track versions of known error documentation when updated
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button">
                Reset
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documentation">
        <Card>
          <CardHeader>
            <CardTitle>Documentation Requirements</CardTitle>
            <CardDescription>Configure what information is required for known errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="requireWorkaround" 
                  checked={settings.requireWorkaround}
                  onCheckedChange={(checked) => handleChange("requireWorkaround", checked)}
                />
                <div>
                  <Label htmlFor="requireWorkaround">Require Workaround</Label>
                  <p className="text-sm text-muted-foreground">
                    Known errors must include workaround documentation
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="requireSymptoms" 
                  checked={settings.requireSymptoms}
                  onCheckedChange={(checked) => handleChange("requireSymptoms", checked)}
                />
                <div>
                  <Label htmlFor="requireSymptoms">Require Symptoms Description</Label>
                  <p className="text-sm text-muted-foreground">
                    Known errors must include symptoms documentation
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="defaultTemplate">Default Documentation Template</Label>
              <Textarea 
                id="defaultTemplate" 
                value={settings.defaultTemplate}
                onChange={(e) => handleChange("defaultTemplate", e.target.value)}
                placeholder="## Description
[Describe the known error]

## Symptoms
[List the symptoms]

## Workaround
[Describe the workaround]

## Affected Services
[List affected services]

## Resolution Plan
[Describe the plan for permanent resolution]"
                className="h-32 mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Default template for new known error documentation
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button">
                Reset
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure when and how notifications are sent for known errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <FormSectionHeader 
                title="Event Notifications" 
                description="Select which events trigger notifications" 
              />
              
              <div className="space-y-4 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyOnCreated" 
                        checked={settings.notifications.onCreated}
                        onCheckedChange={() => handleNotificationToggle("onCreated")}
                      />
                      <Label htmlFor="notifyOnCreated">Known Error Created</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      When a new known error is documented
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyOnUpdated" 
                        checked={settings.notifications.onUpdated}
                        onCheckedChange={() => handleNotificationToggle("onUpdated")}
                      />
                      <Label htmlFor="notifyOnUpdated">Known Error Updated</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      When a known error document is modified
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyOnWorkaroundUpdated" 
                        checked={settings.notifications.onWorkaroundUpdated}
                        onCheckedChange={() => handleNotificationToggle("onWorkaroundUpdated")}
                      />
                      <Label htmlFor="notifyOnWorkaroundUpdated">Workaround Updated</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      When a workaround solution is added or changed
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyOnPlanToFix" 
                        checked={settings.notifications.onPlanToFix}
                        onCheckedChange={() => handleNotificationToggle("onPlanToFix")}
                      />
                      <Label htmlFor="notifyOnPlanToFix">Plan to Fix Updated</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      When a permanent fix plan is documented
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyOnResolved" 
                        checked={settings.notifications.onResolved}
                        onCheckedChange={() => handleNotificationToggle("onResolved")}
                      />
                      <Label htmlFor="notifyOnResolved">Known Error Resolved</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      When a known error is marked as resolved
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <FormSectionHeader 
                title="Recipients" 
                description="Configure who receives known error notifications" 
              />
              
              <div className="space-y-4 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyServiceOwners" 
                        checked={settings.notifyGroups.serviceOwners}
                        onCheckedChange={() => handleNotifyGroupToggle("serviceOwners")}
                      />
                      <Label htmlFor="notifyServiceOwners">Service Owners</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Owners of services affected by the known error
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyProblemManagers" 
                        checked={settings.notifyGroups.problemManagers}
                        onCheckedChange={() => handleNotifyGroupToggle("problemManagers")}
                      />
                      <Label htmlFor="notifyProblemManagers">Problem Managers</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Users with problem management responsibilities
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifySupportTeam" 
                        checked={settings.notifyGroups.supportTeam}
                        onCheckedChange={() => handleNotifyGroupToggle("supportTeam")}
                      />
                      <Label htmlFor="notifySupportTeam">Support Team</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Front-line support agents who need to know workarounds
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="notifyAllUsers" 
                        checked={settings.notifyGroups.allUsers}
                        onCheckedChange={() => handleNotifyGroupToggle("allUsers")}
                      />
                      <Label htmlFor="notifyAllUsers">All Users</Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      All system users (use with caution)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button">
                Reset
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="warnings">
        <Card>
          <CardHeader>
            <CardTitle>Warnings & Alerts</CardTitle>
            <CardDescription>Configure warning thresholds and automatic alerts for known errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warnOnDuplicates">Duplicate Detection</Label>
                  <Select 
                    defaultValue="warn"
                  >
                    <SelectTrigger id="warnOnDuplicates">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Don't check</SelectItem>
                      <SelectItem value="warn">Warn only</SelectItem>
                      <SelectItem value="block">Block creation</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Action to take when a potential duplicate is detected
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="oldKnownErrorThreshold">Old Known Error Threshold</Label>
                  <Select 
                    defaultValue="90"
                  >
                    <SelectTrigger id="oldKnownErrorThreshold">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Age threshold for known errors without resolution plans
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="alertOnOldKnownErrors" 
                    defaultChecked={true}
                  />
                  <div>
                    <Label htmlFor="alertOnOldKnownErrors">Alert on Old Known Errors</Label>
                    <p className="text-sm text-muted-foreground">
                      Send alerts when known errors exceed the age threshold without resolution
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="alertOnHighImpact" 
                    defaultChecked={true}
                  />
                  <div>
                    <Label htmlFor="alertOnHighImpact">High Impact Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Send special alerts for known errors affecting multiple services or with high severity
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button">
                Reset
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default KnownErrorSettings;
