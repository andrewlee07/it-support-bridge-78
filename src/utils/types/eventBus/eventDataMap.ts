
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
  'task.created': TaskEventData;
  'task.updated': TaskEventData;
  'task.assigned': TaskEventData;
  'task.dueDateApproaching': TaskEventData;
  'task.overdue': TaskEventData;
  'task.statusChanged': TaskEventData;
  'task.completed': TaskEventData;
  'problem.created': ProblemEventData;
  'problem.updated': ProblemEventData;
  'problem.assigned': ProblemEventData;
  'problem.rootCauseIdentified': ProblemEventData;
  'problem.workaroundAvailable': ProblemEventData;
  'problem.resolved': ProblemEventData;
  'problem.closed': ProblemEventData;
  'knowledge.created': KnowledgeArticleEventData;
  'knowledge.updated': KnowledgeArticleEventData;
  'knowledge.published': KnowledgeArticleEventData;
  'knownError.created': KnownErrorEventData;
  'knownError.updated': KnownErrorEventData;
  'knownError.workaroundUpdated': KnownErrorEventData;
  'knownError.planToFix': KnownErrorEventData;
  'knownError.resolved': KnownErrorEventData;
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
  // Add more event type to data mappings as needed
}

