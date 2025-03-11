
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
  | 'release.planApproved'     // New: When a release plan is approved
  | 'release.readyForTest'     // New: When a release is ready for testing
  | 'release.testCompleted'    // New: When testing is completed for a release
  | 'release.scheduledDeployment' // New: When deployment is scheduled
  | 'release.deploymentStarted'   // New: When deployment begins
  | 'release.deploymentCompleted' // New: When deployment is finished 
  | 'release.rollback'         // New: When a release must be rolled back
  | 'asset.created'
  | 'asset.updated'
  | 'asset.retired'
  | 'test.created'
  | 'test.executed'
  | 'test.passed'
  | 'test.failed'
  | 'knowledge.created'        // Added for Knowledge Articles
  | 'knowledge.updated'        // Added for Knowledge Articles
  | 'knowledge.published'      // Added for Knowledge Articles
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

// Knowledge Article event data
export interface KnowledgeArticleEventData {
  articleId: string;
  title: string;
  content?: string;
  status: string;
  category?: string;
  tags?: string[];
  author?: string;
  updatedFields?: string[];
  publishedBy?: string;
  publishDate?: string;
  version?: string;
}

// Release-specific event data
export interface ReleaseEventData {
  releaseId: string;
  title: string;
  version: string;
  description?: string;
  status: string;
  type?: string;
  plannedDate?: string;
  deploymentDate?: string;
  owner?: string;
  affectedServices?: string[];
  testResults?: {
    passRate?: number;
    totalTests?: number;
    failedTests?: number;
    criticalIssues?: number;
  };
  deploymentDetails?: {
    expectedDowntime?: string;
    startTime?: string;
    endTime?: string;
    environment?: string;
    rollbackPlan?: string;
  };
  rollbackReason?: string;
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
  'knowledge.created': KnowledgeArticleEventData;
  'knowledge.updated': KnowledgeArticleEventData;
  'knowledge.published': KnowledgeArticleEventData;
  'knownError.created': KnownErrorEventData;
  'knownError.updated': KnownErrorEventData;
  'knownError.workaroundUpdated': KnownErrorEventData;
  'knownError.planToFix': KnownErrorEventData;
  'knownError.resolved': KnownErrorEventData;
  'release.created': ReleaseEventData;
  'release.updated': ReleaseEventData;
  'release.planApproved': ReleaseEventData;
  'release.readyForTest': ReleaseEventData;
  'release.testCompleted': ReleaseEventData;
  'release.scheduledDeployment': ReleaseEventData;
  'release.deploymentStarted': ReleaseEventData;
  'release.deploymentCompleted': ReleaseEventData;
  'release.deployed': ReleaseEventData;
  'release.rollback': ReleaseEventData;
  // Add more event type to data mappings as needed
}
