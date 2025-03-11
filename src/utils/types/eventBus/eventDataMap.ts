
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

// Map of event types to their data structures
export interface EventDataMap {
  'task.created': TaskEventData;
  'task.updated': TaskEventData;
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
  // Add more event type to data mappings as needed
}
