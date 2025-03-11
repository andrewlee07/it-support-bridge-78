import { EventType } from '@/utils/types/eventBus';

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
] as const;

/**
 * Event Documentation
 *
 * This file provides documentation and examples for the various events
 * that can be published and subscribed to within the system.
 */

/**
 * Incident Events
 */
const incidentEvents = [
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
const serviceRequestEvents = [
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
const changeEvents = [
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
const problemEvents = [
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
const slaEvents = [
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
const taskEvents = [
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
const releaseEvents = [
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
const assetEvents = [
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
const testEvents = [
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
const knowledgeEvents = [
  'knowledge.created',
  'knowledge.updated',
  'knowledge.published',
];

/**
 * Known Error Events
 */
const knownErrorEvents = [
  'knownError.created',
  'knownError.updated',
  'knownError.workaroundUpdated',
  'knownError.planToFix',
  'knownError.resolved',
];

/**
 * Backlog Item Events
 */
const backlogItemEvents = [
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
const reminderEvents = [
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
const testCaseEvents = [
  'testCase.created',
  'testCase.updated',
];

/**
 * Event Examples
 *
 * Below are examples of how to publish and subscribe to events.
 */

/**
 * Example: Publishing an Incident Event
 */
function publishIncidentEvent() {
  // Example data for an incident event
  const incidentData = {
    incidentId: 'INC-123',
    title: 'Network Outage',
    description: 'Major network outage affecting multiple services.',
    status: 'Open',
    priority: 'High',
  };

  // Publish the incident event
  // EventBus.getInstance().publish('incident.created', 'ticketSystem', incidentData);
}

/**
 * Example: Subscribing to a Task Event
 */
function subscribeToTaskEvent() {
  // Subscribe to the 'task.completed' event
  // EventBus.getInstance().subscribe({
  //   eventTypes: ['task.completed'],
  //   callback: (event) => {
  //     console.log('Task Completed Event:', event);
  //     // Perform actions when a task is completed
  //   },
  // });
}

/**
 * Example: Publishing a Release Event
 */
function publishReleaseEvent() {
  // Example data for a release event
  const releaseData = {
    releaseId: 'REL-001',
    title: 'Version 2.0 Deployment',
    version: '2.0',
    status: 'Deployed',
  };

  // Publish the release event
  // EventBus.getInstance().publish('release.deployed', 'releaseManagement', releaseData);
}

/**
 * Example: Subscribing to a Problem Event
 */
function subscribeToProblemEvent() {
  // Subscribe to the 'problem.resolved' event
  // EventBus.getInstance().subscribe({
  //   eventTypes: ['problem.resolved'],
  //   callback: (event) => {
  //     console.log('Problem Resolved Event:', event);
  //     // Perform actions when a problem is resolved
  //   },
  // });
}

/**
 * Example: Publishing a Knowledge Event
 */
function publishKnowledgeEvent() {
  // Example data for a knowledge event
  const knowledgeData = {
    articleId: 'KA-001',
    title: 'Troubleshooting Network Issues',
    status: 'Published',
  };

  // Publish the knowledge event
  // EventBus.getInstance().publish('knowledge.published', 'knowledgeBase', knowledgeData);
}

/**
 * Example: Subscribing to a Known Error Event
 */
function subscribeToKnownErrorEvent() {
  // Subscribe to the 'knownError.resolved' event
  // EventBus.getInstance().subscribe({
  //   eventTypes: ['knownError.resolved'],
  //   callback: (event) => {
  //     console.log('Known Error Resolved Event:', event);
  //     // Perform actions when a known error is resolved
  //   },
  // });
}
