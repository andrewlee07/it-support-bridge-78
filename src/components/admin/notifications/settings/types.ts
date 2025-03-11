
export interface NotificationPreferences {
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
    retainNotificationsFor: number;
  };
}
