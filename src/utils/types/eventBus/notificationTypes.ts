
import { ChannelMappingType } from './channelMappingTypes';

export interface NotificationSubscriptionPreferences {
  eventTypes: string[];
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    slack: boolean;
    teams: boolean;
  };
  scheduleRules?: Array<{
    id: string;
    name: string;
    active: boolean;
    schedule: {
      days: string[];
      timeRanges: Array<{
        start: string;
        end: string;
      }>;
    };
    channelMappings: {
      email: ChannelMappingType;
      sms: ChannelMappingType;
      slack: ChannelMappingType;
      teams: ChannelMappingType;
    };
  }>;
}

export interface UserNotificationSettings {
  userId: string;
  preferences: NotificationSubscriptionPreferences;
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
    days: string[];
    allowUrgent: boolean;
  };
  lastUpdated: string;
}
