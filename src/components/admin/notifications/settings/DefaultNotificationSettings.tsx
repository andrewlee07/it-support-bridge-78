
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Input,
  Separator,
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/components';
import {
  Bell,
  Clock,
  AlertTriangle,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

// Default notification preferences
interface NotificationPreferences {
  defaultDeliveryChannels: {
    critical: string[];
    high: string[];
    medium: string[];
    low: string[];
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    excludeCritical: boolean;
  };
  rateLimiting: {
    enabled: boolean;
    maxPerHour: number;
    groupSimilar: boolean;
  };
  defaults: {
    showToastNotifications: boolean;
    emailDigestFrequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
    retainNotificationsFor: number; // days
  };
}

const initialPreferences: NotificationPreferences = {
  defaultDeliveryChannels: {
    critical: ['email', 'inApp', 'slack'],
    high: ['email', 'inApp'],
    medium: ['inApp'],
    low: ['inApp']
  },
  quietHours: {
    enabled: true,
    startTime: '22:00',
    endTime: '08:00',
    excludeCritical: true
  },
  rateLimiting: {
    enabled: true,
    maxPerHour: 20,
    groupSimilar: true
  },
  defaults: {
    showToastNotifications: true,
    emailDigestFrequency: 'daily',
    retainNotificationsFor: 30
  }
};

const DefaultNotificationSettings: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>(initialPreferences);
  
  // Handle checkbox change for delivery channels
  const handleChannelToggle = (priority: keyof NotificationPreferences['defaultDeliveryChannels'], channel: string) => {
    setPreferences(prev => {
      const currentChannels = prev.defaultDeliveryChannels[priority];
      const newChannels = currentChannels.includes(channel)
        ? currentChannels.filter(c => c !== channel)
        : [...currentChannels, channel];
        
      return {
        ...prev,
        defaultDeliveryChannels: {
          ...prev.defaultDeliveryChannels,
          [priority]: newChannels
        }
      };
    });
  };
  
  // Handle changes to quiet hours
  const handleQuietHoursChange = (field: keyof NotificationPreferences['quietHours'], value: any) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value
      }
    }));
  };
  
  // Handle changes to rate limiting
  const handleRateLimitingChange = (field: keyof NotificationPreferences['rateLimiting'], value: any) => {
    setPreferences(prev => ({
      ...prev,
      rateLimiting: {
        ...prev.rateLimiting,
        [field]: value
      }
    }));
  };
  
  // Handle changes to defaults
  const handleDefaultsChange = (field: keyof NotificationPreferences['defaults'], value: any) => {
    setPreferences(prev => ({
      ...prev,
      defaults: {
        ...prev.defaults,
        [field]: value
      }
    }));
  };
  
  // Save preferences
  const handleSave = () => {
    // In a real app, this would save to an API
    console.log('Saving preferences:', preferences);
    toast.success('Default notification settings saved');
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="channels">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="channels">
            Default Channels
          </TabsTrigger>
          <TabsTrigger value="timing">
            Quiet Hours & Rate Limiting
          </TabsTrigger>
          <TabsTrigger value="preferences">
            General Preferences
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="channels" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Default Delivery Channels by Priority</CardTitle>
              <CardDescription>
                Configure which notification channels should be used by default for each priority level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(preferences.defaultDeliveryChannels).map(([priority, channels]) => (
                <div key={priority} className="space-y-2">
                  <h3 className="font-medium capitalize flex items-center">
                    <AlertTriangle className={`h-4 w-4 mr-2 ${
                      priority === 'critical' ? 'text-red-500' :
                      priority === 'high' ? 'text-orange-500' :
                      priority === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    {priority} Priority
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`email-${priority}`}
                        checked={channels.includes('email')}
                        onCheckedChange={() => handleChannelToggle(priority as any, 'email')}
                      />
                      <Label htmlFor={`email-${priority}`}>Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`inApp-${priority}`}
                        checked={channels.includes('inApp')}
                        onCheckedChange={() => handleChannelToggle(priority as any, 'inApp')}
                      />
                      <Label htmlFor={`inApp-${priority}`}>In-App</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`slack-${priority}`}
                        checked={channels.includes('slack')}
                        onCheckedChange={() => handleChannelToggle(priority as any, 'slack')}
                      />
                      <Label htmlFor={`slack-${priority}`}>Slack</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id={`sms-${priority}`}
                        checked={channels.includes('sms')}
                        onCheckedChange={() => handleChannelToggle(priority as any, 'sms')}
                      />
                      <Label htmlFor={`sms-${priority}`}>SMS</Label>
                    </div>
                  </div>
                  {priority !== 'low' && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timing" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Quiet Hours
                </CardTitle>
                <CardDescription>
                  Configure time periods when notifications should be suppressed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="quietHours"
                    checked={preferences.quietHours.enabled}
                    onCheckedChange={(checked) => handleQuietHoursChange('enabled', checked)}
                  />
                  <Label htmlFor="quietHours">Enable Quiet Hours</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={preferences.quietHours.startTime}
                      onChange={(e) => handleQuietHoursChange('startTime', e.target.value)}
                      disabled={!preferences.quietHours.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={preferences.quietHours.endTime}
                      onChange={(e) => handleQuietHoursChange('endTime', e.target.value)}
                      disabled={!preferences.quietHours.enabled}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Switch 
                    id="excludeCritical"
                    checked={preferences.quietHours.excludeCritical}
                    onCheckedChange={(checked) => handleQuietHoursChange('excludeCritical', checked)}
                    disabled={!preferences.quietHours.enabled}
                  />
                  <Label htmlFor="excludeCritical">Still deliver critical notifications during quiet hours</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Rate Limiting
                </CardTitle>
                <CardDescription>
                  Prevent notification flooding by limiting frequency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="rateLimiting"
                    checked={preferences.rateLimiting.enabled}
                    onCheckedChange={(checked) => handleRateLimitingChange('enabled', checked)}
                  />
                  <Label htmlFor="rateLimiting">Enable Rate Limiting</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxPerHour">Maximum Notifications Per Hour</Label>
                  <Input
                    id="maxPerHour"
                    type="number"
                    min="1"
                    max="100"
                    value={preferences.rateLimiting.maxPerHour}
                    onChange={(e) => handleRateLimitingChange('maxPerHour', parseInt(e.target.value))}
                    disabled={!preferences.rateLimiting.enabled}
                  />
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Switch 
                    id="groupSimilar"
                    checked={preferences.rateLimiting.groupSimilar}
                    onCheckedChange={(checked) => handleRateLimitingChange('groupSimilar', checked)}
                    disabled={!preferences.rateLimiting.enabled}
                  />
                  <Label htmlFor="groupSimilar">Group similar notifications</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                General Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure system-wide notification behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="toastNotifications"
                    checked={preferences.defaults.showToastNotifications}
                    onCheckedChange={(checked) => handleDefaultsChange('showToastNotifications', checked)}
                  />
                  <Label htmlFor="toastNotifications">Show toast notifications in UI</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailDigest">Email Digest Frequency</Label>
                <Select 
                  value={preferences.defaults.emailDigestFrequency}
                  onValueChange={(value) => handleDefaultsChange('emailDigestFrequency', value)}
                >
                  <SelectTrigger id="emailDigest">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (per notification)</SelectItem>
                    <SelectItem value="hourly">Hourly digest</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">Notification Retention Period</Label>
                <RadioGroup 
                  value={preferences.defaults.retainNotificationsFor.toString()}
                  onValueChange={(value) => handleDefaultsChange('retainNotificationsFor', parseInt(value))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7" id="r7" />
                    <Label htmlFor="r7">7 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30" id="r30" />
                    <Label htmlFor="r30">30 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="90" id="r90" />
                    <Label htmlFor="r90">90 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="365" id="r365" />
                    <Label htmlFor="r365">1 year</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default DefaultNotificationSettings;
