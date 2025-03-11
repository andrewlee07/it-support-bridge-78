
import { EventType } from '@/utils/types/eventBus';

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
  'problem.assigned': 'Problem assigned',
  'problem.rootCauseIdentified': 'Root cause identified',
  'problem.workaroundAvailable': 'Workaround available',
  'problem.closed': 'Problem closed',
  'sla.warning': 'SLA Warning',
  'sla.breached': 'SLA Breached',
  'task.created': 'New task created',
  'task.updated': 'Task updated',
  'task.completed': 'Task completed',
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
  'knowledge.created': 'New article created',
  'knowledge.updated': 'Article updated',
  'knowledge.published': 'Article published',
  'asset.created': 'New asset added',
  'asset.updated': 'Asset updated',
  'asset.retired': 'Asset retired',
  'test.created': 'New test case created',
  'test.executed': 'Test executed',
  'test.passed': 'Test passed',
  'test.failed': 'Test failed',
  'knownError.created': 'New known error added',
  'knownError.updated': 'Known error updated',
  'knownError.workaroundUpdated': 'Workaround updated',
  'knownError.planToFix': 'Fix scheduled',
  'knownError.resolved': 'Known error resolved',
  // Add mappings for backlog item events
  'backlogItem.created': 'New backlog item created',
  'backlogItem.priorityChanged': 'Backlog item priority changed',
  'backlogItem.addedToSprint': 'Backlog item added to sprint',
  'backlogItem.removedFromSprint': 'Backlog item removed from sprint',
  'backlogItem.statusChanged': 'Backlog item status changed',
  'backlogItem.readyForReview': 'Backlog item ready for review',
  'backlogItem.completed': 'Backlog item completed'
};
