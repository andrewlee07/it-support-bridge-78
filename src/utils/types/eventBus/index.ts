
// Re-export all event types for easier imports
export * from './eventTypeDefinitions';
export * from './coreTypes';
export * from './sourceTypes';
export * from './problemEventTypes';
export * from './reminderEventTypes';
export * from './taskEventTypes';
export * from './knowledgeEventTypes';
export * from './knownErrorEventTypes';
export * from './releaseEventTypes';
export * from './backlogItemEventTypes';
export * from './testEventTypes';
export * from './eventDataMap';
export * from './notificationTypes';
export * from './channelMappingTypes';

// Add these types to the main export if they don't already exist in the files above
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events?: string[];
  eventTypes?: string[];
  enabled?: boolean;
  active?: boolean;
  secret?: string;
  headers?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  authentication?: {
    type: 'none' | 'basic' | 'bearer' | 'custom';
    token?: string;
    username?: string;
    password?: string;
    customHeader?: string;
  };
}

export interface WebhookDeliveryLog {
  id: string;
  webhookId: string;
  eventId: string;
  timestamp?: string;
  requestTimestamp?: string;
  responseTimestamp?: string;
  requestBody?: string;
  responseStatus?: number;
  statusCode?: number;
  responseBody?: string;
  status?: 'success' | 'failed';
  success?: boolean;
  error?: string;
  retries?: number;
  retryCount?: number;
}
