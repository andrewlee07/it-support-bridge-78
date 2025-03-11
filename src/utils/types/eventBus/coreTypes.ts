
/**
 * Core event bus types defining the standard event structure and interfaces
 */
import { EventType, EventSource } from './eventTypes';
import { EventOrigin } from './sourceTypes';

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
