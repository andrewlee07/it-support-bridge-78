/**
 * Map of event types to their data structures
 */
import { EventType } from './eventTypeDefinitions';
import { TaskEventData } from './taskEventTypes';
import { ProblemEventData } from './problemEventTypes';
import { KnowledgeArticleEventData } from './knowledgeEventTypes';
import { KnownErrorEventData } from './knownErrorEventTypes';
import { ReleaseEventData } from './releaseEventTypes';
import { BacklogItemEventData } from './backlogItemEventTypes';
import { ReminderEventData } from './reminderEventTypes';
import { TestCaseEventData, TestExecutionEventData } from './testEventTypes';

// Map of event types to their data structures
export interface EventDataMap {
  // Task events
  'task.created': TaskEventData;
  'task.updated': TaskEventData;
  'task.assigned': TaskEventData;
  'task.dueDateApproaching': TaskEventData;
  'task.overdue': TaskEventData;
  'task.overdue.critical': TaskEventData;
  'task.statusChanged': TaskEventData;
  'task.completed': TaskEventData;
  
  // Problem events
  'problem.created': ProblemEventData;
  'problem.updated': ProblemEventData;
  'problem.assigned': ProblemEventData;
  'problem.rootCauseIdentified': ProblemEventData;
  'problem.workaroundAvailable': ProblemEventData;
  'problem.resolved': ProblemEventData;
  'problem.closed': ProblemEventData;
  
  // Incident specific events
  'incident.created': ProblemEventData;
  'incident.updated': ProblemEventData;
  'incident.assigned': ProblemEventData;
  'incident.resolved': ProblemEventData;
  'incident.closed': ProblemEventData;
  'incident.reopened': ProblemEventData;
  'incident.created.p1': ProblemEventData;
  'incident.created.p2': ProblemEventData;
  'incident.escalated': ProblemEventData;
  
  // Service request specific events
  'service.created': TaskEventData;
  'service.updated': TaskEventData;
  'service.assigned': TaskEventData;
  'service.resolved': TaskEventData;
  'service.closed': TaskEventData;
  'service.reopened': TaskEventData;
  'service.approved': TaskEventData;
  'service.rejected': TaskEventData;
  
  // Knowledge events
  'knowledge.created': KnowledgeArticleEventData;
  'knowledge.updated': KnowledgeArticleEventData;
  'knowledge.published': KnowledgeArticleEventData;
  
  // Known Error events
  'knownError.created': KnownErrorEventData;
  'knownError.updated': KnownErrorEventData;
  'knownError.workaroundUpdated': KnownErrorEventData;
  'knownError.planToFix': KnownErrorEventData;
  'knownError.resolved': KnownErrorEventData;
  
  // Release events
  'release.created': ReleaseEventData;
  'release.updated': ReleaseEventData;
  'release.planApproved': ReleaseEventData;
  'release.readyForTest': ReleaseEventData;
  'release.testCompleted': ReleaseEventData;
  'release.scheduledDeployment': ReleaseEventData;
  'release.deploymentStarted': ReleaseEventData;
  'release.deploymentCompleted': ReleaseEventData;
  'release.deployed': ReleaseEventData;
  'release.rollback': ReleaseEventData;
  
  // SLA events
  'sla.warning': ProblemEventData;
  'sla.warning.response': ProblemEventData;
  'sla.warning.resolution': ProblemEventData;
  'sla.breached': ProblemEventData;
  'sla.breached.response': ProblemEventData;
  'sla.breached.resolution': ProblemEventData;
  
  // Change events
  'change.created': ReleaseEventData;
  'change.updated': ReleaseEventData;
  'change.approved': ReleaseEventData;
  'change.rejected': ReleaseEventData;
  'change.implemented': ReleaseEventData;
  'change.rollback': ReleaseEventData;
  'change.emergency.created': ReleaseEventData;
  'change.emergency.approved': ReleaseEventData;
  
  // Backlog item events
  'backlogItem.created': BacklogItemEventData;
  'backlogItem.priorityChanged': BacklogItemEventData;
  'backlogItem.addedToSprint': BacklogItemEventData;
  'backlogItem.removedFromSprint': BacklogItemEventData;
  'backlogItem.statusChanged': BacklogItemEventData;
  'backlogItem.readyForReview': BacklogItemEventData;
  'backlogItem.completed': BacklogItemEventData;
  
  // Reminder events
  'reminder.upcoming': ReminderEventData;
  'reminder.due': ReminderEventData;
  'reminder.recurring': ReminderEventData;
  'reminder.snoozed': ReminderEventData;
  'reminder.canceled': ReminderEventData;
  
  // Test case events
  'testCase.created': TestCaseEventData;
  'testCase.updated': TestCaseEventData;
  
  // Test execution events
  'testExecution.scheduled': TestExecutionEventData;
  'testExecution.started': TestExecutionEventData;
  'testExecution.failed': TestExecutionEventData;
  'testExecution.completed': TestExecutionEventData;
  'testExecution.blocked': TestExecutionEventData;
  
  // Asset events
  'asset.created': any;
  'asset.updated': any;
  'asset.retired': any;
  'asset.expiring': any;
  'asset.maintenance.scheduled': any;
  
  // Original ticket events (keeping for backward compatibility)
  'ticket.created': ProblemEventData;
  'ticket.updated': ProblemEventData;
  'ticket.assigned': ProblemEventData;
  'ticket.resolved': ProblemEventData;
  'ticket.closed': ProblemEventData;
  'ticket.reopened': ProblemEventData;
  
  // Test events (legacy)
  'test.created': TestCaseEventData;
  'test.executed': TestExecutionEventData;
  'test.passed': TestExecutionEventData;
  'test.failed': TestExecutionEventData;
}
