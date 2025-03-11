
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
  'knownError.resolved': 'Known error resolved'
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
  'problem.assigned': 'incident',
  'problem.rootCauseIdentified': 'incident',
  'problem.workaroundAvailable': 'incident',
  'problem.closed': 'incident',
  'sla.warning': 'incident',
  'sla.breached': 'incident',
  'task.created': 'task',
  'task.updated': 'task',
  'task.completed': 'task',
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
  'knowledge.created': 'knowledge',
  'knowledge.updated': 'knowledge',
  'knowledge.published': 'knowledge',
  'asset.created': 'asset',
  'asset.updated': 'asset',
  'asset.retired': 'asset',
  'test.created': 'testCase',
  'test.executed': 'testCase',
  'test.passed': 'testCase',
  'test.failed': 'bug',
  'knownError.created': 'knowledge',
  'knownError.updated': 'knowledge',
  'knownError.workaroundUpdated': 'knowledge',
  'knownError.planToFix': 'knowledge',
  'knownError.resolved': 'knowledge'
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
  'problem.assigned': 'medium',
  'problem.rootCauseIdentified': 'high',
  'problem.workaroundAvailable': 'high',
  'problem.closed': 'medium',
  'sla.warning': 'high',
  'sla.breached': 'critical',
  'task.created': 'medium',
  'task.updated': 'low',
  'task.completed': 'medium',
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
  'knowledge.created': 'low',
  'knowledge.updated': 'low',
  'knowledge.published': 'medium',
  'asset.created': 'low',
  'asset.updated': 'low',
  'asset.retired': 'medium',
  'test.created': 'low',
  'test.executed': 'low',
  'test.passed': 'medium',
  'test.failed': 'high',
  'knownError.created': 'high',
  'knownError.updated': 'medium',
  'knownError.workaroundUpdated': 'high',
  'knownError.planToFix': 'medium',
  'knownError.resolved': 'medium'
};

/**
 * Maps release event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const RELEASE_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'release.created': ['release-manager', 'change-manager', 'dev-team', 'test-team'],
  'release.planApproved': ['release-team', 'change-manager', 'service-owners', 'stakeholders'],
  'release.readyForTest': ['test-team', 'qa-manager', 'release-manager'],
  'release.testCompleted': ['release-manager', 'change-manager', 'dev-team', 'stakeholders'],
  'release.scheduledDeployment': ['all-stakeholders', 'support-staff', 'affected-service-users'],
  'release.deploymentStarted': ['release-team', 'support-staff', 'affected-service-users'],
  'release.deploymentCompleted': ['all-stakeholders', 'support-staff', 'affected-service-users'],
  'release.rollback': ['all-stakeholders', 'support-staff', 'affected-service-users']
};

/**
 * Maps release event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const RELEASE_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'release.created': ['email', 'teams', 'inApp'],
  'release.planApproved': ['email', 'teams', 'inApp'],
  'release.readyForTest': ['email', 'teams', 'inApp'],
  'release.testCompleted': ['email', 'teams', 'inApp'],
  'release.scheduledDeployment': ['email', 'teams', 'inApp'],
  'release.deploymentStarted': ['email', 'teams', 'inApp'],
  'release.deploymentCompleted': ['email', 'teams', 'inApp'],
  'release.rollback': ['email', 'teams', 'inApp', 'sms']
};

/**
 * Maps problem event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const PROBLEM_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'problem.created': ['problem-manager', 'service-owner', 'it-management'],
  'problem.assigned': ['assignee', 'previous-assignee', 'problem-manager'],
  'problem.rootCauseIdentified': ['problem-manager', 'service-owner', 'related-incident-owners'],
  'problem.workaroundAvailable': ['related-incident-owners', 'service-users', 'support-staff'],
  'problem.resolved': ['stakeholders', 'related-incident-owners', 'service-users'],
  'problem.closed': ['problem-manager', 'service-owner', 'it-management']
};

/**
 * Maps problem event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const PROBLEM_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'problem.created': ['email', 'teams', 'inApp'],
  'problem.assigned': ['email', 'teams', 'inApp'],
  'problem.rootCauseIdentified': ['email', 'teams', 'inApp'],
  'problem.workaroundAvailable': ['email', 'teams', 'inApp'],
  'problem.resolved': ['email', 'teams', 'inApp', 'sms'],
  'problem.closed': ['email', 'inApp']
};

/**
 * Maps known error event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KEDB_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'knownError.created': ['support-staff', 'service-owner', 'affected-service-users'],
  'knownError.updated': ['support-staff', 'previous-viewers'],
  'knownError.workaroundUpdated': ['support-staff', 'affected-service-users'],
  'knownError.planToFix': ['support-staff', 'service-owner', 'affected-service-users'],
  'knownError.resolved': ['support-staff', 'service-owner', 'affected-service-users']
};

/**
 * Maps known error event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KEDB_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'knownError.created': ['email', 'teams', 'inApp'],
  'knownError.updated': ['email', 'teams', 'inApp'],
  'knownError.workaroundUpdated': ['email', 'teams', 'inApp'],
  'knownError.planToFix': ['email', 'teams', 'inApp'],
  'knownError.resolved': ['email', 'teams', 'inApp']
};

/**
 * Maps knowledge article event types to recipient groups
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KNOWLEDGE_EVENT_RECIPIENTS: Partial<Record<EventType, string[]>> = {
  'knowledge.created': ['knowledge-team', 'service-owner'],
  'knowledge.updated': ['knowledge-team', 'previous-viewers', 'subscribers'],
  'knowledge.published': ['all-users', 'service-users', 'subscribers']
};

/**
 * Maps knowledge article event types to recommended notification channels
 * Using Partial<Record> as we're only defining a subset of events
 */
export const KNOWLEDGE_EVENT_CHANNELS: Partial<Record<EventType, ('email' | 'teams' | 'inApp' | 'sms')[]>> = {
  'knowledge.created': ['email', 'inApp'],
  'knowledge.updated': ['email', 'inApp'],
  'knowledge.published': ['email', 'teams', 'inApp']
};
