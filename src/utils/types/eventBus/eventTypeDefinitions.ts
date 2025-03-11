
/**
 * Core event type definitions
 */

// String literal types for events
export type EventType = 
  // Ticket events
  | 'ticket.created'
  | 'ticket.updated'
  | 'ticket.assigned'
  | 'ticket.resolved'
  | 'ticket.closed'
  | 'ticket.reopened'
  // Incident specific events
  | 'incident.created'
  | 'incident.updated'
  | 'incident.assigned'
  | 'incident.resolved'
  | 'incident.closed'
  | 'incident.reopened'
  | 'incident.created.p1'
  | 'incident.created.p2'
  | 'incident.escalated'
  // Service request specific events
  | 'service.created'
  | 'service.updated'
  | 'service.assigned'
  | 'service.resolved'
  | 'service.closed'
  | 'service.reopened'
  | 'service.approved'
  | 'service.rejected'
  // Change events
  | 'change.created'
  | 'change.updated'
  | 'change.approved'
  | 'change.rejected'
  | 'change.implemented'
  | 'change.rollback'
  | 'change.emergency.created'
  | 'change.emergency.approved'
  // Problem events
  | 'problem.created'
  | 'problem.updated'
  | 'problem.resolved'
  | 'problem.assigned'
  | 'problem.rootCauseIdentified'
  | 'problem.workaroundAvailable'
  | 'problem.closed'
  // SLA events
  | 'sla.warning'
  | 'sla.warning.response'
  | 'sla.warning.resolution'
  | 'sla.breached'
  | 'sla.breached.response'
  | 'sla.breached.resolution'
  // Task events
  | 'task.created'
  | 'task.updated'
  | 'task.assigned'
  | 'task.dueDateApproaching'
  | 'task.overdue'
  | 'task.overdue.critical'
  | 'task.statusChanged'
  | 'task.completed'
  // Release events
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
  // Asset events
  | 'asset.created'
  | 'asset.updated'
  | 'asset.retired'
  | 'asset.expiring'
  | 'asset.maintenance.scheduled'
  // Test events
  | 'test.created'
  | 'test.executed'
  | 'test.passed'
  | 'test.failed'
  // Knowledge events      
  | 'knowledge.created'        
  | 'knowledge.updated'        
  | 'knowledge.published'      
  // Known Error events    
  | 'knownError.created'        
  | 'knownError.updated'        
  | 'knownError.workaroundUpdated' 
  | 'knownError.planToFix'      
  | 'knownError.resolved'       
  // Backlog Item events   
  | 'backlogItem.created'         
  | 'backlogItem.priorityChanged' 
  | 'backlogItem.addedToSprint'   
  | 'backlogItem.removedFromSprint' 
  | 'backlogItem.statusChanged'   
  | 'backlogItem.readyForReview'  
  | 'backlogItem.completed'
  // Reminder events       
  | 'reminder.upcoming'           
  | 'reminder.due'                
  | 'reminder.recurring'          
  | 'reminder.snoozed'            
  | 'reminder.canceled'           
  // Test Case events      
  | 'testCase.created'            
  | 'testCase.updated'            
  // Test Execution events 
  | 'testExecution.scheduled'     
  | 'testExecution.started'       
  | 'testExecution.failed'        
  | 'testExecution.completed'     
  | 'testExecution.blocked';      

