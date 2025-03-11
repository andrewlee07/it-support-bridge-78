
import { EventType } from '@/utils/types/eventBus';
import { Notification } from '@/components/shared/notifications/types';

/**
 * Maps event types to user-friendly notification titles
 */
export const EVENT_TITLE_MAP: Record<EventType, string> = {
  'ticket.created': 'New ticket created',
  'ticket.updated': 'Ticket updated',
  'ticket.assigned': 'Ticket assigned',
  'ticket.resolved': 'Ticket resolved',
  'ticket.closed': 'Ticket closed',
  'ticket.reopened': 'Ticket reopened',
  'change.created': 'New change request',
  'change.updated': 'Change request updated',
  'change.approved': 'Change request approved',
  'change.rejected': 'Change request rejected',
  'change.implemented': 'Change implemented',
  'problem.created': 'New problem record',
  'problem.updated': 'Problem record updated',
  'problem.resolved': 'Problem resolved',
  'sla.warning': 'SLA Warning',
  'sla.breached': 'SLA Breached',
  'task.created': 'New task created',
  'task.updated': 'Task updated',
  'task.completed': 'Task completed',
  'release.created': 'New release created',
  'release.updated': 'Release updated',
  'release.deployed': 'Release deployed',
  'knowledge.created': 'New article created',
  'knowledge.updated': 'Article updated',
  'knowledge.published': 'Article published',
  'asset.created': 'New asset added',
  'asset.updated': 'Asset updated',
  'asset.retired': 'Asset retired',
  'test.created': 'New test case created',
  'test.executed': 'Test executed',
  'test.passed': 'Test passed',
  'test.failed': 'Test failed'
};

/**
 * Maps event types to notification types
 */
export const EVENT_TO_NOTIFICATION_TYPE: Record<EventType, Notification['type']> = {
  'ticket.created': 'incident',
  'ticket.updated': 'incident',
  'ticket.assigned': 'incident',
  'ticket.resolved': 'incident',
  'ticket.closed': 'incident',
  'ticket.reopened': 'incident',
  'change.created': 'change',
  'change.updated': 'change',
  'change.approved': 'change',
  'change.rejected': 'change',
  'change.implemented': 'change',
  'problem.created': 'incident',
  'problem.updated': 'incident',
  'problem.resolved': 'incident',
  'sla.warning': 'incident',
  'sla.breached': 'incident',
  'task.created': 'task',
  'task.updated': 'task',
  'task.completed': 'task',
  'release.created': 'release',
  'release.updated': 'release',
  'release.deployed': 'release',
  'knowledge.created': 'knowledge',
  'knowledge.updated': 'knowledge',
  'knowledge.published': 'knowledge',
  'asset.created': 'asset',
  'asset.updated': 'asset',
  'asset.retired': 'asset',
  'test.created': 'testCase',
  'test.executed': 'testCase',
  'test.passed': 'testCase',
  'test.failed': 'bug'
};

/**
 * Maps event types to priority
 */
export const EVENT_TO_PRIORITY: Record<EventType, Notification['priority']> = {
  'ticket.created': 'medium',
  'ticket.updated': 'low',
  'ticket.assigned': 'medium',
  'ticket.resolved': 'medium',
  'ticket.closed': 'low',
  'ticket.reopened': 'high',
  'change.created': 'medium',
  'change.updated': 'low',
  'change.approved': 'medium',
  'change.rejected': 'high',
  'change.implemented': 'medium',
  'problem.created': 'high',
  'problem.updated': 'medium',
  'problem.resolved': 'medium',
  'sla.warning': 'high',
  'sla.breached': 'critical',
  'task.created': 'medium',
  'task.updated': 'low',
  'task.completed': 'medium',
  'release.created': 'medium',
  'release.updated': 'low',
  'release.deployed': 'high',
  'knowledge.created': 'low',
  'knowledge.updated': 'low',
  'knowledge.published': 'medium',
  'asset.created': 'low',
  'asset.updated': 'low',
  'asset.retired': 'medium',
  'test.created': 'low',
  'test.executed': 'low',
  'test.passed': 'medium',
  'test.failed': 'high'
};
