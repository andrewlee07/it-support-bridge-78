
/**
 * Core event bus types defining the standard event structure and interfaces
 */
import { EventType } from './eventTypes';
import { EventSource } from './sourceTypes';

/**
 * Standardized event data structure for all system events
 */
export interface SystemEvent<T = any> {
  id: string;
  type: EventType;
  source: EventSource;
  timestamp: string;
  data: T;
  metadata: EventMetadata;
  actor?: EventActor;
  entity?: EventEntity;
  changes?: EventChanges;
}

/**
 * Event actor information
 */
export interface EventActor {
  id: string;
  name?: string;
  type: 'user' | 'system' | 'integration';
  email?: string;
}

/**
 * Primary entity associated with the event
 */
export interface EventEntity {
  id: string;
  type: string;
  name?: string;
  url?: string;
}

/**
 * Changes made in update events
 */
export interface EventChanges {
  fields: string[];
  before?: Record<string, any>;
  after?: Record<string, any>;
}

/**
 * Event metadata for additional context
 */
export interface EventMetadata {
  correlationId?: string;
  origin?: string;
  userId?: string;
  tenantId?: string;
  requestId?: string;
  severity?: string;
  priority?: string;
  tags?: string[];
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
