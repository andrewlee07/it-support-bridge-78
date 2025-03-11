
/**
 * Event source and origin type definitions
 */

// String literal types for event sources
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
  | 'kedb-service'  // Added for Known Error Database
  | 'external-system';

// String literal types for event origins
export type EventOrigin = 
  | 'web-app'
  | 'api'
  | 'background-job'
  | 'external-integration'
  | 'system';
