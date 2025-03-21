
import { EventType } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';

/**
 * Maps event types to notification types
 */
export const EVENT_TO_NOTIFICATION_TYPE: Partial<Record<EventType, Notification['type']>> = {
  // Original ticket events
  'ticket.created': 'incident',
  'ticket.updated': 'incident',
  'ticket.assigned': 'incident',
  'ticket.resolved': 'incident',
  'ticket.closed': 'incident',
  'ticket.reopened': 'incident',
  
  // Incident specific events
  'incident.created': 'incident',
  'incident.created.p1': 'incident',
  'incident.created.p2': 'incident',
  'incident.created.p3': 'incident',
  'incident.created.p4': 'incident',
  'incident.updated': 'incident',
  'incident.updated.critical': 'incident',
  'incident.assigned': 'incident',
  'incident.resolved': 'incident',
  'incident.resolved.success': 'incident',
  'incident.resolved.partial': 'incident',
  'incident.closed': 'incident',
  'incident.reopened': 'incident',
  'incident.escalated': 'incident',
  'incident.escalated.critical': 'incident',
  'incident.escalated.high': 'incident',
  
  // Security case events
  'security.created': 'incident',
  'security.updated': 'incident',
  'security.assigned': 'incident',
  'security.resolved': 'incident',
  'security.resolved.success': 'incident',
  'security.resolved.partial': 'incident',
  'security.closed': 'incident',
  'security.reopened': 'incident',
  'security.created.high': 'incident',
  'security.created.medium': 'incident',
  'security.created.low': 'incident',
  'security.escalated': 'incident',
  'security.escalated.critical': 'incident',
  'security.investigation.updated': 'incident',
  'security.breach.detected': 'incident',
  'security.compliance.issue': 'incident',
  
  // Service request specific events
  'service.created': 'task',
  'service.created.high': 'task',
  'service.created.medium': 'task',
  'service.created.low': 'task',
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
  'change.implemented.success': 'change',
  'change.implemented.failure': 'change',
  'change.implemented.partial': 'change',
  'change.rollback': 'change',
  'change.emergency.created': 'change',
  'change.emergency.approved': 'change',
  'change.submitted': 'change',
  'change.reviewed': 'change',
  'change.tested': 'change',
  'change.canceled': 'change',
  
  // Problem events
  'problem.created': 'incident',
  'problem.created.critical': 'incident',
  'problem.created.high': 'incident',
  'problem.updated': 'incident',
  'problem.resolved': 'incident',
  'problem.resolved.success': 'incident',
  'problem.resolved.partial': 'incident',
  'problem.assigned': 'incident',
  'problem.rootCauseIdentified': 'incident',
  'problem.workaroundAvailable': 'incident',
  'problem.closed': 'incident',
  
  // SLA events
  'sla.warning': 'incident',
  'sla.warning.response': 'incident',
  'sla.warning.resolution': 'incident',
  'sla.warning.update': 'incident',
  'sla.warning.approaching': 'incident',
  'sla.warning.imminent': 'incident',
  'sla.breached': 'incident',
  'sla.breached.response': 'incident',
  'sla.breached.resolution': 'incident',
  'sla.breached.update': 'incident',
  
  // Task events
  'task.created': 'task',
  'task.updated': 'task',
  'task.assigned': 'task',
  'task.dueDateApproaching': 'task',
  'task.overdue': 'task',
  'task.overdue.critical': 'task',
  'task.overdue.high': 'task',
  'task.overdue.medium': 'task',
  'task.statusChanged': 'task',
  'task.completed': 'task',
  'task.completed.success': 'task',
  'task.completed.partial': 'task',
  'task.deleted': 'task',
  
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
  'release.deploymentCompleted.success': 'release',
  'release.deploymentCompleted.failure': 'release',
  'release.deploymentCompleted.partial': 'release',
  'release.rollback': 'release',
  'release.verified': 'release',
  'release.buildStarted': 'release',
  'release.buildCompleted': 'release',
  'release.buildCompleted.success': 'release',
  'release.buildCompleted.failure': 'release',
  'release.canceled': 'release',
  
  // Asset events
  'asset.created': 'asset',
  'asset.updated': 'asset',
  'asset.retired': 'asset',
  'asset.expiring': 'asset',
  'asset.expiring.approaching': 'asset',
  'asset.expiring.imminent': 'asset',
  'asset.maintenance.scheduled': 'asset',
  
  // Test events
  'test.created': 'testCase',
  'test.executed': 'testCase',
  'test.passed': 'testCase',
  'test.failed': 'bug',
  'test.failed.critical': 'bug',
  'test.failed.high': 'bug',
  
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
  'backlogItem.completed.success': 'backlogItem',
  'backlogItem.completed.partial': 'backlogItem',
  
  // Reminder events
  'reminder.upcoming': 'task',
  'reminder.upcoming.approaching': 'task',
  'reminder.upcoming.imminent': 'task',
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
  'testExecution.failed.critical': 'bug',
  'testExecution.failed.high': 'bug',
  'testExecution.completed': 'testCase',
  'testExecution.completed.success': 'testCase',
  'testExecution.completed.partial': 'testCase',
  'testExecution.blocked': 'bug'
};

