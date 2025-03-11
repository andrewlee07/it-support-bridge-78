
import { EventType } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';

/**
 * Maps event types to priority
 */
export const EVENT_TO_PRIORITY: Record<EventType, Notification['priority']> = {
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
  'incident.assigned': 'medium',
  'incident.resolved': 'medium',
  'incident.closed': 'low',
  'incident.reopened': 'high',
  'incident.created.p1': 'critical',
  'incident.created.p2': 'high',
  'incident.escalated': 'high',
  
  // Service request specific events
  'service.created': 'medium',
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
  'change.rollback': 'critical',
  'change.emergency.created': 'high',
  'change.emergency.approved': 'high',
  
  // Problem events
  'problem.created': 'high',
  'problem.updated': 'medium',
  'problem.resolved': 'medium',
  'problem.assigned': 'medium',
  'problem.rootCauseIdentified': 'high',
  'problem.workaroundAvailable': 'high',
  'problem.closed': 'medium',
  
  // SLA events
  'sla.warning': 'high',
  'sla.warning.response': 'high',
  'sla.warning.resolution': 'high',
  'sla.breached': 'critical',
  'sla.breached.response': 'critical',
  'sla.breached.resolution': 'critical',
  
  // Task events
  'task.created': 'medium',
  'task.updated': 'low',
  'task.assigned': 'medium',
  'task.dueDateApproaching': 'high',
  'task.overdue': 'high',
  'task.overdue.critical': 'critical',
  'task.statusChanged': 'medium',
  'task.completed': 'medium',
  
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
  'release.rollback': 'critical',
  
  // Asset events
  'asset.created': 'low',
  'asset.updated': 'low',
  'asset.retired': 'medium',
  'asset.expiring': 'high',
  'asset.maintenance.scheduled': 'medium',
  
  // Test events
  'test.created': 'low',
  'test.executed': 'low',
  'test.passed': 'medium',
  'test.failed': 'high',
  
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
  
  // Reminder events
  'reminder.upcoming': 'high',
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
  'testExecution.completed': 'medium',
  'testExecution.blocked': 'high'
};
