
/**
 * Type definitions for notification channel mapping
 */

export interface ChannelMappingType {
  inWindow: string;
  outOfWindow: string;
}

export interface ScheduleRule {
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
}
