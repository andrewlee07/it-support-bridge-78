
import { EventType } from '@/utils/types/eventBus';

// Event field definition type
export interface EventFieldDefinition {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

// Event documentation interface
export interface EventDocumentation {
  name: EventType;
  description: string;
  source: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  fields?: EventFieldDefinition[];
  examples?: string[];
  notes?: string[];
  relatedEvents?: EventType[];
  timeToProcess?: string;
}

// Fixing the type error by ensuring the array contains only valid EventTypes
const testExecutionEvents: EventType[] = [
  'testExecution.scheduled',
  'testExecution.started',
  'testExecution.failed',
  'testExecution.failed.critical',
  'testExecution.failed.high',
  'testExecution.completed',
  'testExecution.completed.success',
  'testExecution.completed.partial',
  'testExecution.blocked'
];

/**
 * Event Documentation
 *
 * This file provides documentation and examples for the various events
 * that can be published and subscribed to within the system.
 */

/**
 * Incident Events
 */
export const incidentEvents: EventType[] = [
  'incident.created',
  'incident.updated',
  'incident.assigned',
  'incident.resolved',
  'incident.closed',
  'incident.reopened',
  'incident.created.p1',
  'incident.created.p2',
  'incident.created.p3',
  'incident.created.p4',
  'incident.escalated',
  'incident.escalated.critical',
  'incident.escalated.high',
  'incident.updated.critical',
  'incident.resolved.success',
  'incident.resolved.partial',
];

/**
 * Service Request Events
 */
export const serviceRequestEvents: EventType[] = [
  'service.created',
  'service.updated',
  'service.assigned',
  'service.resolved',
  'service.closed',
  'service.reopened',
  'service.approved',
  'service.rejected',
  'service.created.high',
  'service.created.medium',
  'service.created.low',
];

/**
 * Change Events
 */
export const changeEvents: EventType[] = [
  'change.created',
  'change.updated',
  'change.approved',
  'change.rejected',
  'change.implemented',
  'change.rollback',
  'change.emergency.created',
  'change.emergency.approved',
  'change.implemented.success',
  'change.implemented.failure',
  'change.implemented.partial',
  'change.submitted',
  'change.reviewed',
  'change.tested',
  'change.canceled',
];

/**
 * Problem Events
 */
export const problemEvents: EventType[] = [
  'problem.created',
  'problem.updated',
  'problem.resolved',
  'problem.assigned',
  'problem.rootCauseIdentified',
  'problem.workaroundAvailable',
  'problem.closed',
  'problem.created.critical',
  'problem.created.high',
  'problem.resolved.success',
  'problem.resolved.partial',
];

/**
 * SLA Events
 */
export const slaEvents: EventType[] = [
  'sla.warning',
  'sla.warning.response',
  'sla.warning.resolution',
  'sla.warning.update',
  'sla.warning.approaching',
  'sla.warning.imminent',
  'sla.breached',
  'sla.breached.response',
  'sla.breached.resolution',
  'sla.breached.update',
];

/**
 * Task Events
 */
export const taskEvents: EventType[] = [
  'task.created',
  'task.updated',
  'task.assigned',
  'task.dueDateApproaching',
  'task.overdue',
  'task.overdue.critical',
  'task.overdue.high',
  'task.overdue.medium',
  'task.statusChanged',
  'task.completed',
  'task.completed.success',
  'task.completed.partial',
  'task.deleted',
];

/**
 * Release Events
 */
export const releaseEvents: EventType[] = [
  'release.created',
  'release.updated',
  'release.deployed',
  'release.planApproved',
  'release.readyForTest',
  'release.testCompleted',
  'release.scheduledDeployment',
  'release.deploymentStarted',
  'release.deploymentCompleted',
  'release.deploymentCompleted.success',
  'release.deploymentCompleted.failure',
  'release.deploymentCompleted.partial',
  'release.rollback',
  'release.verified',
  'release.buildStarted',
  'release.buildCompleted',
  'release.buildCompleted.success',
  'release.buildCompleted.failure',
  'release.canceled',
];

/**
 * Asset Events
 */
export const assetEvents: EventType[] = [
  'asset.created',
  'asset.updated',
  'asset.retired',
  'asset.expiring',
  'asset.expiring.approaching',
  'asset.expiring.imminent',
  'asset.maintenance.scheduled',
];

/**
 * Test Events
 */
export const testEvents: EventType[] = [
  'test.created',
  'test.executed',
  'test.passed',
  'test.failed',
  'test.failed.critical',
  'test.failed.high',
];

/**
 * Knowledge Events
 */
export const knowledgeEvents: EventType[] = [
  'knowledge.created',
  'knowledge.updated',
  'knowledge.published',
];

/**
 * Known Error Events
 */
export const knownErrorEvents: EventType[] = [
  'knownError.created',
  'knownError.updated',
  'knownError.workaroundUpdated',
  'knownError.planToFix',
  'knownError.resolved',
];

/**
 * Backlog Item Events
 */
export const backlogItemEvents: EventType[] = [
  'backlogItem.created',
  'backlogItem.priorityChanged',
  'backlogItem.addedToSprint',
  'backlogItem.removedFromSprint',
  'backlogItem.statusChanged',
  'backlogItem.readyForReview',
  'backlogItem.completed',
  'backlogItem.completed.success',
  'backlogItem.completed.partial',
];

/**
 * Reminder Events
 */
export const reminderEvents: EventType[] = [
  'reminder.upcoming',
  'reminder.upcoming.approaching',
  'reminder.upcoming.imminent',
  'reminder.due',
  'reminder.recurring',
  'reminder.snoozed',
  'reminder.canceled',
];

/**
 * Test Case Events
 */
export const testCaseEvents: EventType[] = [
  'testCase.created',
  'testCase.updated',
];

// Group all event types for easier reference
export const EVENT_GROUPS = {
  incidents: incidentEvents,
  serviceRequests: serviceRequestEvents,
  changes: changeEvents,
  problems: problemEvents,
  sla: slaEvents,
  tasks: taskEvents,
  releases: releaseEvents,
  assets: assetEvents,
  tests: testEvents,
  knowledge: knowledgeEvents,
  knownErrors: knownErrorEvents,
  backlogItems: backlogItemEvents,
  reminders: reminderEvents,
  testCases: testCaseEvents,
  testExecutions: testExecutionEvents
};

// Event documentation examples
export const EVENT_DOCUMENTATION: EventDocumentation[] = [
  {
    name: 'incident.created',
    description: 'Triggered when a new incident is created in the system',
    source: 'incident-management',
    category: 'Incident',
    priority: 'medium',
    fields: [
      { name: 'incidentId', type: 'string', description: 'Unique identifier for the incident', required: true },
      { name: 'title', type: 'string', description: 'Title of the incident', required: true },
      { name: 'description', type: 'string', description: 'Detailed description of the incident', required: false },
      { name: 'priority', type: 'string', description: 'Priority level of the incident', required: true },
      { name: 'status', type: 'string', description: 'Current status of the incident', required: true }
    ],
    examples: [
      `EventBus.publish('incident.created', 'incident-management', { 
        incidentId: 'INC-001', 
        title: 'Network Outage', 
        description: 'Complete network outage in the east region',
        priority: 'high',
        status: 'new'
      })`
    ]
  },
  {
    name: 'sla.warning.approaching',
    description: 'Triggered when an SLA breach is approaching (75% or more of time elapsed)',
    source: 'sla-monitoring',
    category: 'SLA',
    priority: 'high',
    fields: [
      { name: 'ticketId', type: 'string', description: 'ID of the ticket approaching SLA breach', required: true },
      { name: 'slaType', type: 'string', description: 'Type of SLA (response, resolution)', required: true },
      { name: 'elapsedPercent', type: 'number', description: 'Percentage of SLA time elapsed', required: true },
      { name: 'remainingTime', type: 'string', description: 'Time remaining before breach', required: true }
    ]
  },
  {
    name: 'sla.warning.imminent',
    description: 'Triggered when an SLA breach is imminent (90% or more of time elapsed)',
    source: 'sla-monitoring',
    category: 'SLA',
    priority: 'critical',
    fields: [
      { name: 'ticketId', type: 'string', description: 'ID of the ticket with imminent SLA breach', required: true },
      { name: 'slaType', type: 'string', description: 'Type of SLA (response, resolution)', required: true },
      { name: 'elapsedPercent', type: 'number', description: 'Percentage of SLA time elapsed', required: true },
      { name: 'remainingTime', type: 'string', description: 'Time remaining before breach', required: true }
    ]
  }
];

// Helper functions for event documentation

// Get documentation for a specific event
export function getEventDocumentation(eventType: EventType): EventDocumentation | undefined {
  return EVENT_DOCUMENTATION.find(doc => doc.name === eventType);
}

// Get all events related to a specific process
export function getProcessEvents(process: string): EventType[] {
  switch (process.toLowerCase()) {
    case 'incident':
      return EVENT_GROUPS.incidents;
    case 'service':
      return EVENT_GROUPS.serviceRequests;
    case 'change':
      return EVENT_GROUPS.changes;
    case 'problem':
      return EVENT_GROUPS.problems;
    case 'sla':
      return EVENT_GROUPS.sla;
    case 'task':
      return EVENT_GROUPS.tasks;
    case 'release':
      return EVENT_GROUPS.releases;
    case 'asset':
      return EVENT_GROUPS.assets;
    case 'test':
      return [...EVENT_GROUPS.tests, ...EVENT_GROUPS.testCases, ...EVENT_GROUPS.testExecutions];
    case 'knowledge':
      return EVENT_GROUPS.knowledge;
    case 'known-error':
      return EVENT_GROUPS.knownErrors;
    case 'backlog':
      return EVENT_GROUPS.backlogItems;
    case 'reminder':
      return EVENT_GROUPS.reminders;
    default:
      return [];
  }
}
