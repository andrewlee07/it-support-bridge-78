
import { EventType } from '@/utils/types/eventBus';

/**
 * Maps event types to user-friendly notification titles
 */
export const EVENT_TITLE_MAP: Partial<Record<EventType, string>> = {
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
  'incident.created.p3': 'Medium priority P3 incident created',
  'incident.created.p4': 'Low priority P4 incident created',
  'incident.escalated': 'Incident escalated',
  'incident.escalated.critical': 'Incident escalated to critical',
  'incident.escalated.high': 'Incident escalated to high priority',
  'incident.updated.critical': 'Critical incident updated',
  'incident.resolved.success': 'Incident successfully resolved',
  'incident.resolved.partial': 'Incident partially resolved',
  
  // Service request specific events
  'service.created': 'New service request created',
  'service.updated': 'Service request updated',
  'service.assigned': 'Service request assigned',
  'service.resolved': 'Service request resolved',
  'service.closed': 'Service request closed',
  'service.reopened': 'Service request reopened',
  'service.approved': 'Service request approved',
  'service.rejected': 'Service request rejected',
  'service.created.high': 'High priority service request created',
  'service.created.medium': 'Medium priority service request created',
  'service.created.low': 'Low priority service request created',
  
  // Change events
  'change.created': 'New change request',
  'change.updated': 'Change request updated',
  'change.approved': 'Change request approved',
  'change.rejected': 'Change request rejected',
  'change.implemented': 'Change implemented',
  'change.rollback': 'Change rollback initiated',
  'change.emergency.created': 'Emergency change request created',
  'change.emergency.approved': 'Emergency change request approved',
  'change.implemented.success': 'Change implemented successfully',
  'change.implemented.failure': 'Change implementation failed',
  'change.implemented.partial': 'Change partially implemented',
  'change.submitted': 'Change request submitted for approval',
  'change.reviewed': 'Change request reviewed',
  'change.tested': 'Change request testing completed',
  'change.canceled': 'Change request canceled',
  
  // Problem events
  'problem.created': 'New problem record',
  'problem.updated': 'Problem record updated',
  'problem.resolved': 'Problem resolved',
  'problem.assigned': 'Problem assigned',
  'problem.rootCauseIdentified': 'Root cause identified',
  'problem.workaroundAvailable': 'Workaround available',
  'problem.closed': 'Problem closed',
  'problem.created.critical': 'Critical problem created',
  'problem.created.high': 'High priority problem created',
  'problem.resolved.success': 'Problem successfully resolved',
  'problem.resolved.partial': 'Problem partially resolved',
  
  // SLA events
  'sla.warning': 'SLA Warning',
  'sla.warning.response': 'Response SLA Warning',
  'sla.warning.resolution': 'Resolution SLA Warning',
  'sla.warning.update': 'Update SLA Warning',
  'sla.warning.approaching': 'SLA Warning - Approaching breach',
  'sla.warning.imminent': 'SLA Warning - Imminent breach',
  'sla.breached': 'SLA Breached',
  'sla.breached.response': 'Response SLA Breached',
  'sla.breached.resolution': 'Resolution SLA Breached',
  'sla.breached.update': 'Update SLA Breached',
  
  // Task events
  'task.created': 'New task created',
  'task.updated': 'Task updated',
  'task.assigned': 'Task assigned',
  'task.dueDateApproaching': 'Task due date approaching',
  'task.overdue': 'Task overdue',
  'task.overdue.critical': 'Critical task overdue',
  'task.overdue.high': 'High priority task overdue',
  'task.overdue.medium': 'Medium priority task overdue',
  'task.statusChanged': 'Task status changed',
  'task.completed': 'Task completed',
  'task.completed.success': 'Task completed successfully',
  'task.completed.partial': 'Task partially completed',
  'task.deleted': 'Task deleted',
  
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
  'release.deploymentCompleted.success': 'Release deployment completed successfully',
  'release.deploymentCompleted.failure': 'Release deployment failed',
  'release.deploymentCompleted.partial': 'Release deployment partially completed',
  'release.rollback': 'Release rollback initiated',
  'release.verified': 'Release verified in production',
  'release.buildStarted': 'Release build started',
  'release.buildCompleted': 'Release build completed',
  'release.buildCompleted.success': 'Release build completed successfully',
  'release.buildCompleted.failure': 'Release build failed',
  'release.canceled': 'Release canceled',
  
  // Asset events
  'asset.created': 'New asset added',
  'asset.updated': 'Asset updated',
  'asset.retired': 'Asset retired',
  'asset.expiring': 'Asset warranty/license expiring',
  'asset.expiring.approaching': 'Asset warranty/license expiration approaching',
  'asset.expiring.imminent': 'Asset warranty/license expiration imminent',
  'asset.maintenance.scheduled': 'Asset maintenance scheduled',
  
  // Test events
  'test.created': 'New test case created',
  'test.executed': 'Test executed',
  'test.passed': 'Test passed',
  'test.failed': 'Test failed',
  'test.failed.critical': 'Critical test failed',
  'test.failed.high': 'High priority test failed',
  
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
  'backlogItem.completed.success': 'Backlog item completed successfully',
  'backlogItem.completed.partial': 'Backlog item partially completed',
  
  // Reminder events
  'reminder.upcoming': 'Reminder coming up',
  'reminder.upcoming.approaching': 'Reminder approaching due time',
  'reminder.upcoming.imminent': 'Reminder imminent',
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
  'testExecution.failed.critical': 'Critical test execution failed',
  'testExecution.failed.high': 'High priority test execution failed',
  'testExecution.completed': 'Test execution completed',
  'testExecution.completed.success': 'Test execution completed successfully',
  'testExecution.completed.partial': 'Test execution partially completed',
  'testExecution.blocked': 'Test execution blocked'
};

