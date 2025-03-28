
import { ChannelMappingType } from './channelMappingTypes';

// NotificationChannel type definition
export interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'slack' | 'teams' | 'inApp' | 'sms' | 'webhook' | string;
  enabled: boolean;
  priority: number;
  capabilities: {
    supportsFormatting: boolean;
    supportsAttachments: boolean;
    supportsThreading: boolean;
    supportsAcknowledgement?: boolean;
    supportsReply?: boolean;
    maxMessageSize?: number;
  };
  deliverySettings: {
    retryCount: number;
    retryInterval: number;
    expiresAfter?: number;
  };
  description: string;
  createdAt: string;
  updatedAt: string;
}

// ChannelRoutingRule type definition
export interface ChannelRoutingRule {
  id: string;
  name: string;
  description?: string;
  conditions: Array<{
    field: 'audience' | 'importance' | 'category' | 'tags' | 'time' | 'userPreference' | string;
    operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'in' | 'notIn' | string;
    value: any;
  }>;
  channelId: string;
  fallbackChannelId?: string;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

// ChannelTestResult type definition
export interface ChannelTestResult {
  channelId: string;
  channelName: string;
  success: boolean;
  error?: string;
  deliveryTime?: number;
  messagePreview?: string;
  timestamp: string;
}

// MultiChannelConfig type definition
export interface MultiChannelConfig {
  id: string;
  name: string;
  description?: string;
  channels: NotificationChannel[];
  routingRules: ChannelRoutingRule[];
  defaultChannelId: string;
  createdAt: string;
  updatedAt: string;
}

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
