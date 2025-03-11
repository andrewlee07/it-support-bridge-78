
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NotificationPreferences } from '../types';

interface DeliveryChannelsSectionProps {
  preferences: NotificationPreferences;
  handleChannelToggle: (priority: keyof NotificationPreferences['defaultDeliveryChannels'], channel: string) => void;
}

const DeliveryChannelsSection: React.FC<DeliveryChannelsSectionProps> = ({
  preferences,
  handleChannelToggle
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Default Delivery Channels by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(preferences.defaultDeliveryChannels).map(([priority, channels]) => (
          <div key={priority} className="space-y-4 mb-6 last:mb-0">
            <h3 className="text-sm font-medium capitalize">{priority} Priority</h3>
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        ))}
      </CardContent>
    </>
  );
};

export default DeliveryChannelsSection;
