
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
  | 'task.assigned'
  | 'task.dueDateApproaching'
  | 'task.overdue'
  | 'task.statusChanged'
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
  | 'backlogItem.created'         
  | 'backlogItem.priorityChanged' 
  | 'backlogItem.addedToSprint'   
  | 'backlogItem.removedFromSprint' 
  | 'backlogItem.statusChanged'   
  | 'backlogItem.readyForReview'  
  | 'backlogItem.completed'
  | 'reminder.upcoming'           // When a reminder is approaching its due time
  | 'reminder.due'                // When a reminder is due
  | 'reminder.recurring'          // When a recurring reminder is triggered
  | 'reminder.snoozed'            // When a reminder is snoozed
  | 'reminder.canceled'           // When a reminder is canceled
  | 'testCase.created'            // When a new test case is created
  | 'testCase.updated'            // When a test case is modified
  | 'testExecution.scheduled'     // When test execution is scheduled
  | 'testExecution.started'       // When test execution begins
  | 'testExecution.failed'        // When a test execution fails
  | 'testExecution.completed'     // When test execution is completed
  | 'testExecution.blocked';      // When test execution is blocked

