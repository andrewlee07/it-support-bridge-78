
import { EventType } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';

/**
 * Maps event types to priority
 */
export const EVENT_TO_PRIORITY: Partial<Record<EventType, Notification['priority']>> = {
  // Original ticket events
  'ticket.created': 'medium',
  'ticket.updated': 'low',
  'ticket.assigned': 'medium',
  'ticket.resolved': 'medium',
  'ticket.closed': 'low',
  'ticket.reopened': 'high',
  
  // Incident specific events
  'incident.created': 'medium',
  'incident.updated': 'low',
  'incident.updated.critical': 'high',
  'incident.assigned': 'medium',
  'incident.resolved': 'medium',
  'incident.resolved.success': 'medium',
  'incident.resolved.partial': 'high',
  'incident.closed': 'low',
  'incident.reopened': 'high',
  'incident.created.p1': 'critical',
  'incident.created.p2': 'high',
  'incident.created.p3': 'medium',
  'incident.created.p4': 'low',
  'incident.escalated': 'high',
  'incident.escalated.critical': 'critical',
  'incident.escalated.high': 'high',
  
  // Service request specific events
  'service.created': 'medium',
  'service.created.high': 'high',
  'service.created.medium': 'medium',
  'service.created.low': 'low',
  'service.updated': 'low',
  'service.assigned': 'medium',
  'service.resolved': 'medium',
  'service.closed': 'low',
  'service.reopened': 'medium',
  'service.approved': 'medium',
  'service.rejected': 'high',
  
  // Change events
  'change.created': 'medium',
  'change.updated': 'low',
  'change.approved': 'medium',
  'change.rejected': 'high',
  'change.implemented': 'medium',
  'change.implemented.success': 'medium',
  'change.implemented.failure': 'critical',
  'change.implemented.partial': 'high',
  'change.rollback': 'critical',
  'change.emergency.created': 'high',
  'change.emergency.approved': 'high',
  'change.submitted': 'medium',
  'change.reviewed': 'medium',
  'change.tested': 'medium',
  'change.canceled': 'medium',
  
  // Problem events
  'problem.created': 'high',
  'problem.created.critical': 'critical',
  'problem.created.high': 'high',
  'problem.updated': 'medium',
  'problem.resolved': 'medium',
  'problem.resolved.success': 'medium',
  'problem.resolved.partial': 'high',
  'problem.assigned': 'medium',
  'problem.rootCauseIdentified': 'high',
  'problem.workaroundAvailable': 'high',
  'problem.closed': 'medium',
  
  // SLA events
  'sla.warning': 'high',
  'sla.warning.response': 'high',
  'sla.warning.resolution': 'high',
  'sla.warning.update': 'medium',
  'sla.warning.approaching': 'high',
  'sla.warning.imminent': 'critical',
  'sla.breached': 'critical',
  'sla.breached.response': 'critical',
  'sla.breached.resolution': 'critical',
  'sla.breached.update': 'high',
  
  // Task events
  'task.created': 'medium',
  'task.updated': 'low',
  'task.assigned': 'medium',
  'task.dueDateApproaching': 'high',
  'task.overdue': 'high',
  'task.overdue.critical': 'critical',
  'task.overdue.high': 'high',
  'task.overdue.medium': 'medium',
  'task.statusChanged': 'medium',
  'task.completed': 'medium',
  'task.completed.success': 'medium',
  'task.completed.partial': 'high',
  'task.deleted': 'low',
  
  // Release events
  'release.created': 'medium',
  'release.updated': 'low',
  'release.deployed': 'high',
  'release.planApproved': 'medium',
  'release.readyForTest': 'medium',
  'release.testCompleted': 'medium',
  'release.scheduledDeployment': 'high',
  'release.deploymentStarted': 'high',
  'release.deploymentCompleted': 'high',
  'release.deploymentCompleted.success': 'medium',
  'release.deploymentCompleted.failure': 'critical',
  'release.deploymentCompleted.partial': 'high',
  'release.rollback': 'critical',
  'release.verified': 'medium',
  'release.buildStarted': 'medium',
  'release.buildCompleted': 'medium',
  'release.buildCompleted.success': 'medium',
  'release.buildCompleted.failure': 'critical',
  'release.canceled': 'medium',
  
  // Asset events
  'asset.created': 'low',
  'asset.updated': 'low',
  'asset.retired': 'medium',
  'asset.expiring': 'high',
  'asset.expiring.approaching': 'medium',
  'asset.expiring.imminent': 'high',
  'asset.maintenance.scheduled': 'medium',
  
  // Test events
  'test.created': 'low',
  'test.executed': 'low',
  'test.passed': 'medium',
  'test.failed': 'high',
  'test.failed.critical': 'critical',
  'test.failed.high': 'high',
  
  // Knowledge events
  'knowledge.created': 'low',
  'knowledge.updated': 'low',
  'knowledge.published': 'medium',
  
  // Known Error events
  'knownError.created': 'high',
  'knownError.updated': 'medium',
  'knownError.workaroundUpdated': 'high',
  'knownError.planToFix': 'medium',
  'knownError.resolved': 'medium',
  
  // Backlog item events
  'backlogItem.created': 'medium',
  'backlogItem.priorityChanged': 'high',
  'backlogItem.addedToSprint': 'medium',
  'backlogItem.removedFromSprint': 'high',
  'backlogItem.statusChanged': 'medium',
  'backlogItem.readyForReview': 'high',
  'backlogItem.completed': 'medium',
  'backlogItem.completed.success': 'medium',
  'backlogItem.completed.partial': 'high',
  
  // Reminder events
  'reminder.upcoming': 'high',
  'reminder.upcoming.approaching': 'medium',
  'reminder.upcoming.imminent': 'high',
  'reminder.due': 'critical',
  'reminder.recurring': 'medium',
  'reminder.snoozed': 'low',
  'reminder.canceled': 'low',
  
  // Test case events
  'testCase.created': 'medium',
  'testCase.updated': 'low',
  
  // Test execution events
  'testExecution.scheduled': 'medium',
  'testExecution.started': 'medium',
  'testExecution.failed': 'high',
  'testExecution.failed.critical': 'critical',
  'testExecution.failed.high': 'high',
  'testExecution.completed': 'medium',
  'testExecution.completed.success': 'medium',
  'testExecution.completed.partial': 'high',
  'testExecution.blocked': 'high'
};
