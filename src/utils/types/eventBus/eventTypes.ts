
/**
 * Core event types used throughout the event bus system
 */

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
  | 'kedb-service'  // Added for Known Error Database
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
  | 'problem.assigned'
  | 'problem.rootCauseIdentified'
  | 'problem.workaroundAvailable'
  | 'problem.closed'
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
  | 'test.failed'
  | 'knownError.created'        // Added for Known Error Database
  | 'knownError.updated'        // Added for Known Error Database
  | 'knownError.workaroundUpdated' // Added for Known Error Database
  | 'knownError.planToFix'      // Added for Known Error Database
  | 'knownError.resolved';      // Added for Known Error Database

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

// Problem-specific event data
export interface ProblemEventData {
  problemId: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  affectedServices?: string[];
  relatedIncidents?: string[];
  assignee?: string;
  previousAssignee?: string;
  rootCause?: string;
  workaround?: string;
  resolution?: string;
  closureDetails?: string;
  updatedFields?: string[];
}

// Known Error Database event data
export interface KnownErrorEventData {
  knownErrorId: string;
  title: string;
  description?: string;
  status: string;
  affectedServices?: string[];
  workaround?: string;
  previousWorkaround?: string;
  permanentFix?: string;
  scheduledFixDate?: string;
  resolution?: string;
  viewedBy?: string[];
  updatedFields?: string[];
}

// Map of event types to their data structures
export interface EventDataMap {
  'task.created': TaskEventData;
  'task.updated': TaskEventData;
  'task.completed': TaskEventData;
  'problem.created': ProblemEventData;
  'problem.updated': ProblemEventData;
  'problem.assigned': ProblemEventData;
  'problem.rootCauseIdentified': ProblemEventData;
  'problem.workaroundAvailable': ProblemEventData;
  'problem.resolved': ProblemEventData;
  'problem.closed': ProblemEventData;
  'knownError.created': KnownErrorEventData;
  'knownError.updated': KnownErrorEventData;
  'knownError.workaroundUpdated': KnownErrorEventData;
  'knownError.planToFix': KnownErrorEventData;
  'knownError.resolved': KnownErrorEventData;
  // Add more event type to data mappings as needed
}

