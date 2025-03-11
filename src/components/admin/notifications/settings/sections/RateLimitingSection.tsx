
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NotificationPreferences } from '../types';
import { AlertTriangle } from 'lucide-react';

interface RateLimitingSectionProps {
  preferences: NotificationPreferences;
  handleRateLimitingChange: (field: keyof NotificationPreferences['rateLimiting'], value: any) => void;
}

const RateLimitingSection: React.FC<RateLimitingSectionProps> = ({
  preferences,
  handleRateLimitingChange
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Rate Limiting
        </CardTitle>
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

        <div className="flex items-center space-x-2">
          <Switch
            id="groupSimilar"
            checked={preferences.rateLimiting.groupSimilar}
            onCheckedChange={(checked) => handleRateLimitingChange('groupSimilar', checked)}
            disabled={!preferences.rateLimiting.enabled}
          />
          <Label htmlFor="groupSimilar">Group similar notifications</Label>
        </div>
      </CardContent>
    </>
  );
};

export default RateLimitingSection;
