
import { EventType } from '@/utils/types/eventBus';

/**
 * Maps event types to user-friendly notification titles
 */
export const EVENT_TITLE_MAP: Record<EventType, string> = {
  // Original ticket events
  'ticket.created': 'New ticket created',
  'ticket.updated': 'Ticket updated',
  'ticket.assigned': 'Ticket assigned',
  'ticket.resolved': 'Ticket resolved',
  'ticket.closed': 'Ticket closed',
  'ticket.reopened': 'Ticket reopened',
  
  // Incident specific events
  'incident.created': 'New incident created',
  'incident.updated': 'Incident updated',
  'incident.assigned': 'Incident assigned',
  'incident.resolved': 'Incident resolved',
  'incident.closed': 'Incident closed',
  'incident.reopened': 'Incident reopened',
  'incident.created.p1': 'Critical P1 incident created',
  'incident.created.p2': 'High priority P2 incident created',
  'incident.escalated': 'Incident escalated',
  
  // Service request specific events
  'service.created': 'New service request created',
  'service.updated': 'Service request updated',
  'service.assigned': 'Service request assigned',
  'service.resolved': 'Service request resolved',
  'service.closed': 'Service request closed',
  'service.reopened': 'Service request reopened',
  'service.approved': 'Service request approved',
  'service.rejected': 'Service request rejected',
  
  // Change events
  'change.created': 'New change request',
  'change.updated': 'Change request updated',
  'change.approved': 'Change request approved',
  'change.rejected': 'Change request rejected',
  'change.implemented': 'Change implemented',
  'change.rollback': 'Change rollback initiated',
  'change.emergency.created': 'Emergency change request created',
  'change.emergency.approved': 'Emergency change request approved',
  
  // Problem events
  'problem.created': 'New problem record',
  'problem.updated': 'Problem record updated',
  'problem.resolved': 'Problem resolved',
  'problem.assigned': 'Problem assigned',
  'problem.rootCauseIdentified': 'Root cause identified',
  'problem.workaroundAvailable': 'Workaround available',
  'problem.closed': 'Problem closed',
  
  // SLA events
  'sla.warning': 'SLA Warning',
  'sla.warning.response': 'Response SLA Warning',
  'sla.warning.resolution': 'Resolution SLA Warning',
  'sla.breached': 'SLA Breached',
  'sla.breached.response': 'Response SLA Breached',
  'sla.breached.resolution': 'Resolution SLA Breached',
  
  // Task events
  'task.created': 'New task created',
  'task.updated': 'Task updated',
  'task.assigned': 'Task assigned',
  'task.dueDateApproaching': 'Task due date approaching',
  'task.overdue': 'Task overdue',
  'task.overdue.critical': 'Critical task overdue',
  'task.statusChanged': 'Task status changed',
  'task.completed': 'Task completed',
  
  // Release events
  'release.created': 'New release created',
  'release.updated': 'Release updated',
  'release.deployed': 'Release deployed',
  'release.planApproved': 'Release plan approved',
  'release.readyForTest': 'Release ready for testing',
  'release.testCompleted': 'Release testing completed',
  'release.scheduledDeployment': 'Release deployment scheduled',
  'release.deploymentStarted': 'Release deployment started',
  'release.deploymentCompleted': 'Release deployment completed',
  'release.rollback': 'Release rollback initiated',
  
  // Asset events
  'asset.created': 'New asset added',
  'asset.updated': 'Asset updated',
  'asset.retired': 'Asset retired',
  'asset.expiring': 'Asset warranty/license expiring',
  'asset.maintenance.scheduled': 'Asset maintenance scheduled',
  
  // Test events
  'test.created': 'New test case created',
  'test.executed': 'Test executed',
  'test.passed': 'Test passed',
  'test.failed': 'Test failed',
  
  // Knowledge events
  'knowledge.created': 'New article created',
  'knowledge.updated': 'Article updated',
  'knowledge.published': 'Article published',
  
  // Known Error events
  'knownError.created': 'New known error added',
  'knownError.updated': 'Known error updated',
  'knownError.workaroundUpdated': 'Workaround updated',
  'knownError.planToFix': 'Fix scheduled',
  'knownError.resolved': 'Known error resolved',
  
  // Backlog item events
  'backlogItem.created': 'New backlog item created',
  'backlogItem.priorityChanged': 'Backlog item priority changed',
  'backlogItem.addedToSprint': 'Backlog item added to sprint',
  'backlogItem.removedFromSprint': 'Backlog item removed from sprint',
  'backlogItem.statusChanged': 'Backlog item status changed',
  'backlogItem.readyForReview': 'Backlog item ready for review',
  'backlogItem.completed': 'Backlog item completed',
  
  // Reminder events
  'reminder.upcoming': 'Reminder coming up',
  'reminder.due': 'Reminder now due',
  'reminder.recurring': 'Recurring reminder',
  'reminder.snoozed': 'Reminder snoozed',
  'reminder.canceled': 'Reminder canceled',
  
  // Test case events
  'testCase.created': 'New test case created',
  'testCase.updated': 'Test case updated',
  
  // Test execution events
  'testExecution.scheduled': 'Test execution scheduled',
  'testExecution.started': 'Test execution started',
  'testExecution.failed': 'Test execution failed',
  'testExecution.completed': 'Test execution completed',
  'testExecution.blocked': 'Test execution blocked'
};
