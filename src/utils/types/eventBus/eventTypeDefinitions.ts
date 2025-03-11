
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
  | 'release.planApproved'     
  | 'release.readyForTest'     
  | 'release.testCompleted'    
  | 'release.scheduledDeployment' 
  | 'release.deploymentStarted'   
  | 'release.deploymentCompleted' 
  | 'release.rollback'         
  | 'asset.created'
  | 'asset.updated'
  | 'asset.retired'
  | 'test.created'
  | 'test.executed'
  | 'test.passed'
  | 'test.failed'
  | 'knowledge.created'        
  | 'knowledge.updated'        
  | 'knowledge.published'      
  | 'knownError.created'        
  | 'knownError.updated'        
  | 'knownError.workaroundUpdated' 
  | 'knownError.planToFix'      
  | 'knownError.resolved'       
  | 'backlogItem.created'         // New: When a backlog item is created
  | 'backlogItem.priorityChanged' // New: When a backlog item's priority changes
  | 'backlogItem.addedToSprint'   // New: When a backlog item is added to a sprint
  | 'backlogItem.removedFromSprint' // New: When a backlog item is removed from a sprint
  | 'backlogItem.statusChanged'   // New: When a backlog item's status changes
  | 'backlogItem.readyForReview'  // New: When a backlog item is ready for review
  | 'backlogItem.completed';      // New: When a backlog item is completed
