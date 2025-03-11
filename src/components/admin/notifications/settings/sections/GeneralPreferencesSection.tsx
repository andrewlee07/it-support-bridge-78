
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NotificationPreferences } from '../types';
import { Bell } from 'lucide-react';

interface GeneralPreferencesSectionProps {
  preferences: NotificationPreferences;
  handleDefaultsChange: (field: keyof NotificationPreferences['defaults'], value: any) => void;
}

const GeneralPreferencesSection: React.FC<GeneralPreferencesSectionProps> = ({
  preferences,
  handleDefaultsChange
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          General Notification Preferences
        </CardTitle>
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
    </>
  );
};

export default GeneralPreferencesSection;
