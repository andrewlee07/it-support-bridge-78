
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
  // Add more event type to data mappings as needed
}
