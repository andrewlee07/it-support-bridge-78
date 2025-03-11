
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NotificationPreferences } from '../types';
import { Clock } from 'lucide-react';

interface QuietHoursSectionProps {
  preferences: NotificationPreferences;
  handleQuietHoursChange: (field: keyof NotificationPreferences['quietHours'], value: any) => void;
}

const QuietHoursSection: React.FC<QuietHoursSectionProps> = ({
  preferences,
  handleQuietHoursChange
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Quiet Hours
        </CardTitle>
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

        <div className="flex items-center space-x-2">
          <Switch
            id="excludeCritical"
            checked={preferences.quietHours.excludeCritical}
            onCheckedChange={(checked) => handleQuietHoursChange('excludeCritical', checked)}
            disabled={!preferences.quietHours.enabled}
          />
          <Label htmlFor="excludeCritical">Still deliver critical notifications during quiet hours</Label>
        </div>
      </CardContent>
    </>
  );
};

export default QuietHoursSection;
