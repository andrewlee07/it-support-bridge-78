
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
  bugs: ['test.failed'],
  testCases: ['test.created', 'test.executed', 'test.passed'],
  backlogItems: [],
  releases: ['release.created', 'release.updated', 'release.deployed'],
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
  tasks: ['task.created', 'task.updated', 'task.completed']
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
