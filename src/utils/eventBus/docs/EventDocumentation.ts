
import { EventType } from '@/utils/types/eventBus';
import { EVENT_TITLE_MAP } from '../constants/mappings/titleMappings';
import { EVENT_TO_NOTIFICATION_TYPE } from '../constants/mappings/notificationTypeMappings';
import { 
  RELEASE_EVENT_RECIPIENTS, 
  RELEASE_EVENT_CHANNELS,
  PROBLEM_EVENT_RECIPIENTS,
  PROBLEM_EVENT_CHANNELS,
  KEDB_EVENT_RECIPIENTS,
  KEDB_EVENT_CHANNELS,
  KNOWLEDGE_EVENT_RECIPIENTS,
  KNOWLEDGE_EVENT_CHANNELS
} from '../constants/mappings';

// Group events by process for better organization
export const EVENT_GROUPS = {
  incident: [
    'incident.created',
    'incident.created.p1',
    'incident.created.p2',
    'incident.created.p3',
    'incident.created.p4',
    'incident.updated',
    'incident.updated.critical',
    'incident.assigned',
    'incident.resolved',
    'incident.resolved.success',
    'incident.resolved.partial',
    'incident.closed',
    'incident.reopened',
    'incident.escalated',
    'incident.escalated.critical',
    'incident.escalated.high'
  ],
  problem: [
    'problem.created',
    'problem.created.critical',
    'problem.created.high',
    'problem.updated',
    'problem.resolved',
    'problem.resolved.success',
    'problem.resolved.partial',
    'problem.assigned',
    'problem.rootCauseIdentified',
    'problem.workaroundAvailable',
    'problem.closed'
  ],
  change: [
    'change.created',
    'change.updated',
    'change.submitted',
    'change.approved',
    'change.rejected',
    'change.implemented',
    'change.implemented.success',
    'change.implemented.failure',
    'change.implemented.partial',
    'change.rollback',
    'change.emergency.created',
    'change.emergency.approved',
    'change.reviewed',
    'change.tested',
    'change.canceled'
  ],
  release: [
    'release.created',
    'release.updated',
    'release.planApproved',
    'release.buildStarted',
    'release.buildCompleted',
    'release.buildCompleted.success',
    'release.buildCompleted.failure',
    'release.readyForTest',
    'release.testCompleted',
    'release.scheduledDeployment',
    'release.deploymentStarted',
    'release.deploymentCompleted',
    'release.deploymentCompleted.success',
    'release.deploymentCompleted.failure',
    'release.deploymentCompleted.partial',
    'release.deployed',
    'release.verified',
    'release.rollback',
    'release.canceled'
  ],
  task: [
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
    'task.deleted'
  ],
  serviceRequest: [
    'service.created',
    'service.created.high',
    'service.created.medium',
    'service.created.low',
    'service.updated',
    'service.assigned',
    'service.resolved',
    'service.closed',
    'service.reopened',
    'service.approved',
    'service.rejected'
  ],
  testing: [
    'testCase.created',
    'testCase.updated',
    'testExecution.scheduled',
    'testExecution.started',
    'testExecution.failed',
    'testExecution.failed.critical',
    'testExecution.failed.high',
    'testExecution.completed',
    'testExecution.completed.success',
    'testExecution.completed.partial',
    'testExecution.blocked',
    'test.created',
    'test.executed',
    'test.passed',
    'test.failed',
    'test.failed.critical',
    'test.failed.high'
  ],
  knowledgeBase: [
    'knowledge.created',
    'knowledge.updated',
    'knowledge.published',
    'knownError.created',
    'knownError.updated',
    'knownError.workaroundUpdated',
    'knownError.planToFix',
    'knownError.resolved'
  ],
  assets: [
    'asset.created',
    'asset.updated',
    'asset.retired',
    'asset.expiring',
    'asset.expiring.approaching',
    'asset.expiring.imminent',
    'asset.maintenance.scheduled'
  ],
  sla: [
    'sla.warning',
    'sla.warning.response',
    'sla.warning.resolution',
    'sla.warning.update',
    'sla.warning.approaching',
    'sla.warning.imminent',
    'sla.breached',
    'sla.breached.response',
    'sla.breached.resolution',
    'sla.breached.update'
  ],
  backlog: [
    'backlogItem.created',
    'backlogItem.priorityChanged',
    'backlogItem.addedToSprint',
    'backlogItem.removedFromSprint',
    'backlogItem.statusChanged',
    'backlogItem.readyForReview',
    'backlogItem.completed',
    'backlogItem.completed.success',
    'backlogItem.completed.partial'
  ],
  reminder: [
    'reminder.upcoming',
    'reminder.upcoming.approaching',
    'reminder.upcoming.imminent',
    'reminder.due',
    'reminder.recurring',
    'reminder.snoozed',
    'reminder.canceled'
  ],
  legacy: [
    'ticket.created',
    'ticket.updated',
    'ticket.assigned',
    'ticket.resolved',
    'ticket.closed',
    'ticket.reopened'
  ]
};

// Define required and optional data fields for each event type
export interface EventFieldDefinition {
  eventType: EventType;
  title: string;
  description: string;
  requiredFields: string[];
  optionalFields: string[];
  defaultRecipients: string[];
  defaultChannels: string[];
  exampleData: Record<string, any>;
}

// Generate documentation for all events
const generateEventDocumentation = (): Record<EventType, EventFieldDefinition> => {
  const documentation: Partial<Record<EventType, EventFieldDefinition>> = {};
  
  // Get all event types from EVENT_GROUPS
  const allEventTypes = Object.values(EVENT_GROUPS).flat() as EventType[];
  
  allEventTypes.forEach(eventType => {
    // Get default recipients and channels if available
    const defaultRecipients = getDefaultRecipients(eventType);
    const defaultChannels = getDefaultChannels(eventType);
    
    documentation[eventType] = {
      eventType,
      title: EVENT_TITLE_MAP[eventType] || eventType.replace(/\./g, ' '),
      description: getEventDescription(eventType),
      requiredFields: ['id', 'type', 'source', 'timestamp', 'data'],
      optionalFields: ['metadata', 'actor', 'entity', 'changes'],
      defaultRecipients,
      defaultChannels,
      exampleData: createExampleData(eventType)
    };
  });
  
  return documentation as Record<EventType, EventFieldDefinition>;
};

// Get default recipients for an event type
const getDefaultRecipients = (eventType: EventType): string[] => {
  if (eventType.startsWith('release.') && RELEASE_EVENT_RECIPIENTS && RELEASE_EVENT_RECIPIENTS[eventType]) {
    return RELEASE_EVENT_RECIPIENTS[eventType] || [];
  }
  
  if (eventType.startsWith('problem.') && PROBLEM_EVENT_RECIPIENTS && PROBLEM_EVENT_RECIPIENTS[eventType]) {
    return PROBLEM_EVENT_RECIPIENTS[eventType] || [];
  }
  
  if (eventType.startsWith('knownError.') && KEDB_EVENT_RECIPIENTS && KEDB_EVENT_RECIPIENTS[eventType]) {
    return KEDB_EVENT_RECIPIENTS[eventType] || [];
  }
  
  if (eventType.startsWith('knowledge.') && KNOWLEDGE_EVENT_RECIPIENTS && KNOWLEDGE_EVENT_RECIPIENTS[eventType]) {
    return KNOWLEDGE_EVENT_RECIPIENTS[eventType] || [];
  }
  
  // Default recipients based on event type
  if (eventType.startsWith('incident.')) {
    return ['incident-team', 'service-owner'];
  }
  
  if (eventType.startsWith('change.')) {
    return ['change-manager', 'approvers', 'service-owner'];
  }
  
  if (eventType.startsWith('task.')) {
    return ['assignee', 'task-creator'];
  }
  
  return ['system-administrators'];
};

// Get default channels for an event type
const getDefaultChannels = (eventType: EventType): string[] => {
  if (eventType.startsWith('release.') && RELEASE_EVENT_CHANNELS && RELEASE_EVENT_CHANNELS[eventType]) {
    return RELEASE_EVENT_CHANNELS[eventType] || ['email', 'inApp'];
  }
  
  if (eventType.startsWith('problem.') && PROBLEM_EVENT_CHANNELS && PROBLEM_EVENT_CHANNELS[eventType]) {
    return PROBLEM_EVENT_CHANNELS[eventType] || ['email', 'inApp'];
  }
  
  if (eventType.startsWith('knownError.') && KEDB_EVENT_CHANNELS && KEDB_EVENT_CHANNELS[eventType]) {
    return KEDB_EVENT_CHANNELS[eventType] || ['email', 'inApp'];
  }
  
  if (eventType.startsWith('knowledge.') && KNOWLEDGE_EVENT_CHANNELS && KNOWLEDGE_EVENT_CHANNELS[eventType]) {
    return KNOWLEDGE_EVENT_CHANNELS[eventType] || ['email', 'inApp'];
  }
  
  // Critical events should use more immediate channels
  if (eventType.includes('.critical') || 
      eventType.includes('.p1') || 
      eventType.includes('.breached') ||
      eventType.includes('.imminent')) {
    return ['email', 'sms', 'teams', 'inApp'];
  }
  
  // High priority events
  if (eventType.includes('.high') || 
      eventType.includes('.p2') || 
      eventType.includes('.warning')) {
    return ['email', 'teams', 'inApp'];
  }
  
  // Standard notification channels
  return ['email', 'inApp'];
};

// Get description for an event type
const getEventDescription = (eventType: EventType): string => {
  const parts = eventType.split('.');
  const process = parts[0];
  const action = parts[1];
  const qualifier = parts[2];
  
  let description = `Event triggered when a ${process} is ${action}`;
  
  if (qualifier) {
    if (['p1', 'p2', 'p3', 'p4'].includes(qualifier)) {
      description += ` with priority ${qualifier.toUpperCase()}`;
    } else if (['critical', 'high', 'medium', 'low'].includes(qualifier)) {
      description += ` with ${qualifier} severity`;
    } else if (['approaching', 'imminent'].includes(qualifier)) {
      description += ` and time is ${qualifier}`;
    } else if (['success', 'failure', 'partial'].includes(qualifier)) {
      description += ` with ${qualifier} outcome`;
    } else if (['response', 'resolution', 'update'].includes(qualifier)) {
      description += ` for ${qualifier} SLA`;
    }
  }
  
  return description;
};

// Create example data for an event type
const createExampleData = (eventType: EventType): Record<string, any> => {
  const parts = eventType.split('.');
  const process = parts[0];
  
  const base = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    type: eventType,
    source: 'itil-system',
    timestamp: new Date().toISOString(),
    metadata: {
      correlationId: '123e4567-e89b-12d3-a456-426614174001',
      origin: 'web-interface',
      userId: 'user-123',
      tenantId: 'tenant-abc',
      requestId: 'req-456',
      severity: eventType.includes('critical') ? 'critical' : 'normal',
      tags: ['automated', 'test-data']
    }
  };
  
  // Add process-specific data
  switch (process) {
    case 'incident':
      return {
        ...base,
        data: {
          incidentId: 'INC-1234',
          title: 'System outage',
          description: 'Production system is not responding',
          priority: eventType.includes('p1') ? 'p1' : 
                   eventType.includes('p2') ? 'p2' : 
                   eventType.includes('p3') ? 'p3' : 'p4',
          affectedService: 'Online Banking',
          status: eventType.includes('resolved') ? 'resolved' : 
                 eventType.includes('closed') ? 'closed' : 'open'
        },
        actor: {
          id: 'user-789',
          name: 'John Smith',
          type: 'user',
          email: 'john.smith@example.com'
        },
        entity: {
          id: 'INC-1234',
          type: 'incident',
          name: 'System outage',
          url: '/incidents/INC-1234'
        },
        changes: eventType.includes('updated') ? {
          fields: ['status', 'assignee'],
          before: { status: 'open', assignee: null },
          after: { status: 'in-progress', assignee: 'user-789' }
        } : undefined
      };
    
    case 'problem':
      return {
        ...base,
        data: {
          problemId: 'PRB-5678',
          title: 'Recurring network timeout',
          description: 'Network connections time out during peak hours',
          severity: eventType.includes('critical') ? 'critical' : 
                   eventType.includes('high') ? 'high' : 'medium',
          status: eventType.includes('resolved') ? 'resolved' : 
                 eventType.includes('closed') ? 'closed' : 'open',
          relatedIncidents: ['INC-1234', 'INC-2345']
        },
        actor: {
          id: 'user-456',
          name: 'Jane Doe',
          type: 'user',
          email: 'jane.doe@example.com'
        },
        entity: {
          id: 'PRB-5678',
          type: 'problem',
          name: 'Recurring network timeout',
          url: '/problems/PRB-5678'
        }
      };
      
    case 'change':
      return {
        ...base,
        data: {
          changeId: 'CHG-9012',
          title: 'Database server upgrade',
          description: 'Upgrade DB servers to latest version',
          changeType: eventType.includes('emergency') ? 'emergency' : 'normal',
          risk: 'medium',
          status: eventType.includes('approved') ? 'approved' : 
                 eventType.includes('rejected') ? 'rejected' : 
                 eventType.includes('implemented') ? 'implemented' : 'submitted',
          scheduledDate: new Date(Date.now() + 86400000).toISOString() // Tomorrow
        },
        actor: {
          id: 'user-789',
          name: 'Alex Johnson',
          type: 'user',
          email: 'alex.johnson@example.com'
        },
        entity: {
          id: 'CHG-9012',
          type: 'change',
          name: 'Database server upgrade',
          url: '/changes/CHG-9012'
        }
      };
      
    case 'release':
      return {
        ...base,
        data: {
          releaseId: 'REL-3456',
          title: 'Q2 Feature Release',
          description: 'Quarterly feature release including new dashboard',
          releaseType: 'feature',
          status: eventType.includes('deployed') ? 'deployed' : 
                 eventType.includes('approved') ? 'approved' : 'planned',
          scheduledDate: new Date(Date.now() + 86400000 * 7).toISOString(), // Next week
          relatedChanges: ['CHG-9012', 'CHG-9013']
        },
        actor: {
          id: 'user-123',
          name: 'Release Manager',
          type: 'user',
          email: 'release.manager@example.com'
        },
        entity: {
          id: 'REL-3456',
          type: 'release',
          name: 'Q2 Feature Release',
          url: '/releases/REL-3456'
        }
      };
      
    case 'task':
      return {
        ...base,
        data: {
          taskId: 'TSK-7890',
          title: 'Install updated monitoring agent',
          description: 'Deploy new monitoring agent to all servers',
          priority: eventType.includes('critical') ? 'critical' : 
                   eventType.includes('high') ? 'high' : 'medium',
          status: eventType.includes('completed') ? 'completed' : 'in-progress',
          dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
          assignee: 'user-456'
        },
        actor: {
          id: 'user-123',
          name: 'Task Creator',
          type: 'user',
          email: 'task.creator@example.com'
        },
        entity: {
          id: 'TSK-7890',
          type: 'task',
          name: 'Install updated monitoring agent',
          url: '/tasks/TSK-7890'
        }
      };
      
    // Add more cases for other processes
      
    default:
      return {
        ...base,
        data: {
          id: `${process.toUpperCase()}-1234`,
          title: `Example ${process} title`,
          description: `Example ${process} description`,
          status: 'active'
        }
      };
  }
};

export const EVENT_DOCUMENTATION = generateEventDocumentation();

// Export a function to get documentation for a specific event
export const getEventDocumentation = (eventType: EventType): EventFieldDefinition => {
  return EVENT_DOCUMENTATION[eventType] || {
    eventType,
    title: eventType,
    description: `Documentation not available for ${eventType}`,
    requiredFields: ['id', 'type', 'source', 'timestamp', 'data'],
    optionalFields: ['metadata', 'actor', 'entity', 'changes'],
    defaultRecipients: ['system-administrators'],
    defaultChannels: ['email', 'inApp'],
    exampleData: {}
  };
};

// Export a function to get all events for a specific process
export const getProcessEvents = (process: keyof typeof EVENT_GROUPS): EventType[] => {
  return EVENT_GROUPS[process] || [];
};

// Export a function to check if an event type is valid
export const isValidEventType = (eventType: string): eventType is EventType => {
  return Object.values(EVENT_GROUPS).some(group => 
    group.includes(eventType as EventType)
  );
};
