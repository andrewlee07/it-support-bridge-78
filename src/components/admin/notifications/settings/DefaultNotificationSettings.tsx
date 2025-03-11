
import React, { useState } from 'react';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { NotificationPreferences } from './types';
import DeliveryChannelsSection from './sections/DeliveryChannelsSection';
import QuietHoursSection from './sections/QuietHoursSection';
import RateLimitingSection from './sections/RateLimitingSection';
import GeneralPreferencesSection from './sections/GeneralPreferencesSection';

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
  
  const handleQuietHoursChange = (field: keyof NotificationPreferences['quietHours'], value: any) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value
      }
    }));
  };
  
  const handleRateLimitingChange = (field: keyof NotificationPreferences['rateLimiting'], value: any) => {
    setPreferences(prev => ({
      ...prev,
      rateLimiting: {
        ...prev.rateLimiting,
        [field]: value
      }
    }));
  };
  
  const handleDefaultsChange = (field: keyof NotificationPreferences['defaults'], value: any) => {
    setPreferences(prev => ({
      ...prev,
      defaults: {
        ...prev.defaults,
        [field]: value
      }
    }));
  };
  
  const handleSave = () => {
    console.log('Saving preferences:', preferences);
    toast.success('Default notification settings saved');
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="channels">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="channels">Delivery Channels</TabsTrigger>
          <TabsTrigger value="timing">Quiet Hours</TabsTrigger>
          <TabsTrigger value="rate-limiting">Rate Limiting</TabsTrigger>
          <TabsTrigger value="preferences">General Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="channels" className="space-y-4 pt-4">
          <Card>
            <DeliveryChannelsSection
              preferences={preferences}
              handleChannelToggle={handleChannelToggle}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="timing" className="space-y-4 pt-4">
          <Card>
            <QuietHoursSection
              preferences={preferences}
              handleQuietHoursChange={handleQuietHoursChange}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="rate-limiting" className="space-y-4 pt-4">
          <Card>
            <RateLimitingSection
              preferences={preferences}
              handleRateLimitingChange={handleRateLimitingChange}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 pt-4">
          <Card>
            <GeneralPreferencesSection
              preferences={preferences}
              handleDefaultsChange={handleDefaultsChange}
            />
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
