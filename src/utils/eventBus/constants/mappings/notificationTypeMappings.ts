
import { EventType } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';

/**
 * Maps event types to notification types
 */
export const EVENT_TO_NOTIFICATION_TYPE: Record<EventType, Notification['type']> = {
  // Original ticket events
  'ticket.created': 'incident',
  'ticket.updated': 'incident',
  'ticket.assigned': 'incident',
  'ticket.resolved': 'incident',
  'ticket.closed': 'incident',
  'ticket.reopened': 'incident',
  
  // Incident specific events
  'incident.created': 'incident',
  'incident.updated': 'incident',
  'incident.assigned': 'incident',
  'incident.resolved': 'incident',
  'incident.closed': 'incident',
  'incident.reopened': 'incident',
  'incident.created.p1': 'incident',
  'incident.created.p2': 'incident',
  'incident.escalated': 'incident',
  
  // Service request specific events
  'service.created': 'task',
  'service.updated': 'task',
  'service.assigned': 'task',
  'service.resolved': 'task',
  'service.closed': 'task',
  'service.reopened': 'task',
  'service.approved': 'task',
  'service.rejected': 'task',
  
  // Change events
  'change.created': 'change',
  'change.updated': 'change',
  'change.approved': 'change',
  'change.rejected': 'change',
  'change.implemented': 'change',
  'change.rollback': 'change',
  'change.emergency.created': 'change',
  'change.emergency.approved': 'change',
  
  // Problem events
  'problem.created': 'incident',
  'problem.updated': 'incident',
  'problem.resolved': 'incident',
  'problem.assigned': 'incident',
  'problem.rootCauseIdentified': 'incident',
  'problem.workaroundAvailable': 'incident',
  'problem.closed': 'incident',
  
  // SLA events
  'sla.warning': 'incident',
  'sla.warning.response': 'incident',
  'sla.warning.resolution': 'incident',
  'sla.breached': 'incident',
  'sla.breached.response': 'incident',
  'sla.breached.resolution': 'incident',
  
  // Task events
  'task.created': 'task',
  'task.updated': 'task',
  'task.assigned': 'task',
  'task.dueDateApproaching': 'task',
  'task.overdue': 'task',
  'task.overdue.critical': 'task',
  'task.statusChanged': 'task',
  'task.completed': 'task',
  
  // Release events
  'release.created': 'release',
  'release.updated': 'release',
  'release.deployed': 'release',
  'release.planApproved': 'release',
  'release.readyForTest': 'release',
  'release.testCompleted': 'release',
  'release.scheduledDeployment': 'release',
  'release.deploymentStarted': 'release',
  'release.deploymentCompleted': 'release',
  'release.rollback': 'release',
  
  // Asset events
  'asset.created': 'asset',
  'asset.updated': 'asset',
  'asset.retired': 'asset',
  'asset.expiring': 'asset',
  'asset.maintenance.scheduled': 'asset',
  
  // Test events
  'test.created': 'testCase',
  'test.executed': 'testCase',
  'test.passed': 'testCase',
  'test.failed': 'bug',
  
  // Knowledge events
  'knowledge.created': 'knowledge',
  'knowledge.updated': 'knowledge',
  'knowledge.published': 'knowledge',
  
  // Known Error events
  'knownError.created': 'knowledge',
  'knownError.updated': 'knowledge',
  'knownError.workaroundUpdated': 'knowledge',
  'knownError.planToFix': 'knowledge',
  'knownError.resolved': 'knowledge',
  
  // Backlog item events
  'backlogItem.created': 'backlogItem',
  'backlogItem.priorityChanged': 'backlogItem',
  'backlogItem.addedToSprint': 'backlogItem',
  'backlogItem.removedFromSprint': 'backlogItem',
  'backlogItem.statusChanged': 'backlogItem',
  'backlogItem.readyForReview': 'backlogItem',
  'backlogItem.completed': 'backlogItem',
  
  // Reminder events
  'reminder.upcoming': 'task',
  'reminder.due': 'task',
  'reminder.recurring': 'task',
  'reminder.snoozed': 'task',
  'reminder.canceled': 'task',
  
  // Test case events
  'testCase.created': 'testCase',
  'testCase.updated': 'testCase',
  
  // Test execution events
  'testExecution.scheduled': 'testCase',
  'testExecution.started': 'testCase',
  'testExecution.failed': 'bug',
  'testExecution.completed': 'testCase',
  'testExecution.blocked': 'bug'
};
