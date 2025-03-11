
/**
 * Types related to webhook functionality in the event bus
 */
import { EventType } from './eventTypes';

/**
 * Webhook configuration for outbound integrations
 */
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  description?: string;
  eventTypes: EventType[];
  authentication: {
    type: 'none' | 'basic' | 'bearer' | 'custom';
    token?: string;
    username?: string;
    password?: string;
    customHeader?: string;
  };
  headers: Record<string, string>;
  enabled: boolean;
  retryConfig: {
    attempts: number;
    backoff: 'linear' | 'exponential';
    initialDelay: number;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Webhook delivery log
 */
export interface WebhookDeliveryLog {
  id: string;
  webhookId: string;
  eventId: string;
  requestTimestamp: string;
  responseTimestamp?: string;
  status: 'success' | 'failed';
  statusCode?: number;
  responseBody?: string;
  error?: string;
  retryCount: number;
}

/**
 * Inbound webhook configuration
 */
export interface InboundWebhookConfig {
  id: string;
  name: string;
  description?: string;
  endpointKey: string;
  sourceSystem: string;
  authentication: {
    type: 'none' | 'apiKey' | 'basic' | 'hmac' | 'jwt';
    secret?: string;
    headerName?: string;
  };
  enabled: boolean;
  payloadMapping: {
    eventTypeField: string;
    mappings: Array<{
      externalEvent: string;
      internalEvent: EventType;
      fieldMappings: Record<string, string>;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * External record mapping
 */
export interface ExternalRecordMapping {
  id: string;
  externalSystem: string;
  externalRecordId: string;
  internalRecordType: string;
  internalRecordId: string;
  lastSynced: string;
  syncHistory: Array<{
    timestamp: string;
    direction: 'inbound' | 'outbound';
    status: 'success' | 'failed';
    details: string;
  }>;
}
