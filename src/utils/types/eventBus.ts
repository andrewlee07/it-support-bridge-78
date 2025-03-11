
import { Task } from './taskTypes';
import { Notification } from '@/components/shared/notifications/types';

/**
 * Standard event structure for all system events
 */
export interface SystemEvent<T = any> {
  id: string;
  type: EventType;
  source: EventSource;
  timestamp: string;
  data: T;
  metadata: EventMetadata;
}

/**
 * Event metadata for additional context
 */
export interface EventMetadata {
  correlationId?: string;
  origin?: EventOrigin;
  userId?: string;
  [key: string]: any;
}

/**
 * Event subscriber interface
 */
export interface EventSubscriber {
  id: string;
  eventTypes: EventType[];
  callback: (event: SystemEvent) => Promise<void> | void;
  filter?: (event: SystemEvent) => boolean;
}

/**
 * Event processing status
 */
export interface EventProcessingStatus {
  eventId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  timestamp: string;
  error?: string;
  retryCount?: number;
  subscriber?: string;
}

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

/**
 * Maintenance mode configuration
 */
export interface MaintenanceConfig {
  id: string;
  name: string;
  status: 'scheduled' | 'active' | 'completed';
  startTime: string;
  endTime: string;
  suppressionConfig: {
    mode: 'all' | 'selective';
    suppressedTypes?: EventType[];
    suppressedChannels?: ('email' | 'webhook' | 'inApp')[];
    allowInApp: boolean;
  };
  catchupConfig: {
    mode: 'none' | 'all' | 'digest';
    digestGrouping?: 'by-type' | 'by-service' | 'by-priority';
  };
}

/**
 * Template version
 */
export interface TemplateVersion {
  id: string;
  templateId: string;
  versionNumber: number;
  createdBy: string;
  content: {
    subject?: string;
    body: string;
  };
  changes: Array<{
    field: string;
    type: 'add' | 'update' | 'remove';
    description: string;
  }>;
  isActive: boolean;
  createdAt: string;
}

/**
 * Enhanced notification template with versioning and channel variants
 */
export interface EnhancedNotificationTemplate {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  metadata: {
    processType: string;
    audience: string[];
    importance: 'low' | 'medium' | 'high' | 'critical';
  };
  baseTemplate: {
    subject: string;
    body: string;
  };
  channelVariants?: {
    email?: {
      format: 'html' | 'text';
      content: string;
    };
    slack?: {
      format: 'markdown' | 'text';
      content: string;
    };
    inApp?: {
      format: 'text';
      content: string;
    };
  };
  components?: string[]; // References to reusable components
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Statistics about event processing
 */
export interface EventProcessingStats {
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
  averageProcessingTime: number;
  queueDepth: number;
  eventsByType: Record<string, number>;
  eventsBySource: Record<string, number>;
}

// String literal types for events
export type EventSource = 
  | 'incident-service'
  | 'service-request-service'
  | 'change-service'
  | 'problem-service'
  | 'sla-service'
  | 'asset-service'
  | 'knowledge-service'
  | 'release-service'
  | 'test-service'
  | 'task-service'
  | 'user-service'
  | 'external-system';

export type EventOrigin = 
  | 'web-app'
  | 'api'
  | 'background-job'
  | 'external-integration'
  | 'system';

export type EventType = 
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.assigned'
  | 'ticket.resolved'
  | 'ticket.closed'
  | 'ticket.reopened'
  | 'change.created'
  | 'change.updated'
  | 'change.approved'
  | 'change.rejected'
  | 'change.implemented'
  | 'problem.created'
  | 'problem.updated'
  | 'problem.resolved'
  | 'sla.warning'
  | 'sla.breached'
  | 'task.created'
  | 'task.updated'
  | 'task.completed'
  | 'release.created'
  | 'release.updated'
  | 'release.deployed'
  | 'knowledge.created'
  | 'knowledge.updated'
  | 'knowledge.published'
  | 'asset.created'
  | 'asset.updated'
  | 'asset.retired'
  | 'test.created'
  | 'test.executed'
  | 'test.passed'
  | 'test.failed';

// Task-specific event data
export interface TaskEventData {
  taskId: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  assignee?: string;
  dueDate?: string;
  updatedFields?: string[];
}

// Map of event types to their data structures
export interface EventDataMap {
  'task.created': TaskEventData;
  'task.updated': TaskEventData;
  'task.completed': TaskEventData;
  // Add more event type to data mappings as needed
}
