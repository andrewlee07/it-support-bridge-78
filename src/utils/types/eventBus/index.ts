
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

// Add these types to the main export if they don't already exist in the files above
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  secret?: string;
  headers?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookDeliveryLog {
  id: string;
  webhookId: string;
  eventId: string;
  timestamp: string;
  requestBody: string;
  responseStatus: number;
  responseBody?: string;
  success: boolean;
  error?: string;
  retries: number;
}
