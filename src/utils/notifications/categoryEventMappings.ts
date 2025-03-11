
import { EventType } from '@/utils/types/eventBus';

/**
 * Maps notification category toggles to event types
 */
export const categoryToEventTypes: Record<string, EventType[]> = {
  incidents: [
    'ticket.created', 
    'ticket.updated', 
    'ticket.assigned', 
    'ticket.resolved', 
    'ticket.closed', 
    'ticket.reopened',
    'problem.created',
    'problem.updated',
    'problem.assigned',
    'problem.rootCauseIdentified',
    'problem.workaroundAvailable',
    'problem.resolved',
    'problem.closed'
  ],
  bugs: [
    'test.failed', 
    'testExecution.failed',
    'testExecution.blocked'
  ],
  testCases: [
    'test.created', 
    'test.executed', 
    'test.passed',
    'testCase.created',
    'testCase.updated',
    'testExecution.scheduled',
    'testExecution.started',
    'testExecution.completed'
  ],
  backlogItems: [
    'backlogItem.created',
    'backlogItem.priorityChanged',
    'backlogItem.addedToSprint',
    'backlogItem.removedFromSprint',
    'backlogItem.statusChanged',
    'backlogItem.readyForReview',
    'backlogItem.completed'
  ],
  releases: [
    'release.created', 
    'release.updated',
    'release.planApproved',
    'release.readyForTest',
    'release.testCompleted',
    'release.scheduledDeployment',
    'release.deploymentStarted',
    'release.deploymentCompleted',
    'release.deployed',
    'release.rollback'
  ],
  assets: ['asset.created', 'asset.updated', 'asset.retired'],
  changes: [
    'change.created', 
    'change.updated', 
    'change.approved', 
    'change.rejected', 
    'change.implemented'
  ],
  knowledge: [
    'knowledge.created', 
    'knowledge.updated', 
    'knowledge.published',
    'knownError.created',
    'knownError.updated',
    'knownError.workaroundUpdated',
    'knownError.planToFix',
    'knownError.resolved'
  ],
  tasks: [
    'task.created', 
    'task.updated', 
    'task.completed',
    'task.assigned',
    'task.dueDateApproaching',
    'task.overdue',
    'task.statusChanged',
    'reminder.upcoming',
    'reminder.due',
    'reminder.recurring',
    'reminder.snoozed',
    'reminder.canceled'
  ]
};

/**
 * Default notification settings
 */
export const defaultSettings = {
  categories: {
    incidents: true,
    bugs: true,
    testCases: true,
    backlogItems: true,
    releases: true,
    assets: true,
    changes: true,
    knowledge: true,
    tasks: true
  },
  deliveryMethods: {
    inApp: true,
    email: true
  },
  priorityLevels: {
    critical: true,
    high: true,
    medium: true,
    low: true
  }
};

