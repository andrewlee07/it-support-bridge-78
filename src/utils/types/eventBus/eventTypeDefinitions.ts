
/**
 * Core event type definitions
 */

// String literal types for events
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
