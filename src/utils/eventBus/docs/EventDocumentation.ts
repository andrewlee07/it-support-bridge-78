
import { EventType } from '@/utils/types/eventBus';

// Define event field definition type
export interface EventFieldDefinition {
  name: string;
  type: string;
  description: string;
  required: boolean;
  example?: string;
}

// Define event documentation type
export interface EventDocumentation {
  type: EventType;
  description: string;
  source: string;
  dataFields: EventFieldDefinition[];
  example?: Record<string, any>;
  notes?: string[];
}

// Define event group type
export type EventGroup = {
  name: string;
  description: string;
  events: EventType[];
};

// Event groups for organization
export const EVENT_GROUPS: EventGroup[] = [
  {
    name: 'Incident Management',
    description: 'Events related to incident management process',
    events: [
      'ticket.created', 'ticket.updated', 'ticket.assigned', 'ticket.resolved', 
      'ticket.closed', 'ticket.reopened', 'incident.created', 'incident.updated',
      'incident.assigned', 'incident.resolved', 'incident.closed', 'incident.reopened',
      'incident.escalated'
    ]
  },
  {
    name: 'Problem Management',
    description: 'Events related to problem management process',
    events: [
      'problem.created', 'problem.updated', 'problem.assigned', 'problem.rootCauseIdentified',
      'problem.workaroundAvailable', 'problem.resolved', 'problem.closed',
      'knownError.created', 'knownError.updated', 'knownError.workaroundUpdated',
      'knownError.planToFix', 'knownError.resolved'
    ]
  },
  {
    name: 'Change Management',
    description: 'Events related to change management process',
    events: [
      'change.created', 'change.updated', 'change.approved', 'change.rejected',
      'change.implemented', 'change.rollback', 'change.emergency.created',
      'change.emergency.approved', 'change.submitted', 'change.reviewed', 
      'change.tested', 'change.canceled'
    ]
  },
  {
    name: 'Release Management',
    description: 'Events related to release management process',
    events: [
      'release.created', 'release.updated', 'release.deployed', 'release.planApproved',
      'release.readyForTest', 'release.testCompleted', 'release.scheduledDeployment',
      'release.deploymentStarted', 'release.deploymentCompleted', 'release.rollback'
    ]
  },
  {
    name: 'Test Management',
    description: 'Events related to test management process',
    events: [
      'test.created', 'test.executed', 'test.passed', 'test.failed',
      'testCase.created', 'testCase.updated', 'testExecution.scheduled',
      'testExecution.started', 'testExecution.completed', 'testExecution.failed',
      'testExecution.blocked'
    ]
  },
  {
    name: 'Service Level Agreements',
    description: 'Events related to SLA monitoring',
    events: [
      'sla.warning', 'sla.breached', 'sla.warning.response', 'sla.warning.resolution',
      'sla.warning.update', 'sla.breached.response', 'sla.breached.resolution',
      'sla.breached.update', 'sla.warning.approaching', 'sla.warning.imminent'
    ]
  },
  {
    name: 'Task Management',
    description: 'Events related to task management',
    events: [
      'task.created', 'task.updated', 'task.assigned', 'task.completed',
      'task.dueDateApproaching', 'task.overdue', 'task.statusChanged'
    ]
  },
  {
    name: 'Reminders',
    description: 'Events related to reminders',
    events: [
      'reminder.upcoming', 'reminder.due', 'reminder.recurring',
      'reminder.snoozed', 'reminder.canceled'
    ]
  },
  {
    name: 'Knowledge Management',
    description: 'Events related to knowledge management',
    events: [
      'knowledge.created', 'knowledge.updated', 'knowledge.published'
    ]
  },
  {
    name: 'Asset Management',
    description: 'Events related to asset management',
    events: [
      'asset.created', 'asset.updated', 'asset.retired', 'asset.expiring',
      'asset.maintenance.scheduled'
    ]
  },
  {
    name: 'Backlog Management',
    description: 'Events related to backlog management',
    events: [
      'backlogItem.created', 'backlogItem.priorityChanged', 'backlogItem.addedToSprint',
      'backlogItem.removedFromSprint', 'backlogItem.statusChanged', 'backlogItem.readyForReview',
      'backlogItem.completed'
    ]
  }
];

// Sample documentation for a few events
export const EVENT_DOCUMENTATION: Record<EventType, EventDocumentation> = {
  'ticket.created': {
    type: 'ticket.created',
    description: 'Triggered when a new ticket is created in the system',
    source: 'ticketSystem',
    dataFields: [
      { name: 'ticketId', type: 'string', description: 'Unique identifier for the ticket', required: true },
      { name: 'title', type: 'string', description: 'Ticket title', required: true },
      { name: 'description', type: 'string', description: 'Ticket description', required: true },
      { name: 'priority', type: 'string', description: 'Ticket priority level', required: true },
      { name: 'category', type: 'string', description: 'Ticket category', required: true },
      { name: 'createdBy', type: 'string', description: 'User who created the ticket', required: true },
      { name: 'createdAt', type: 'string', description: 'Timestamp when ticket was created', required: true },
    ],
    notes: [
      'This event is used for both incidents and service requests',
      'Used by notification system to send email notifications'
    ]
  },
  // Add more event documentation as needed
} as Record<EventType, EventDocumentation>;

// Helper to get documentation for a specific event
export const getEventDocumentation = (eventType: EventType): EventDocumentation | undefined => {
  return EVENT_DOCUMENTATION[eventType];
};

// Helper to get all events for a specific process
export const getProcessEvents = (processName: string): EventType[] => {
  const group = EVENT_GROUPS.find(g => g.name.toLowerCase() === processName.toLowerCase());
  return group ? group.events : [];
};
