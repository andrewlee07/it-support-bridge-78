
export interface EventGroup {
  name: string;
  events: EventType[];
}

export type EventType = string;

export interface EventDataField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';
  description: string;
  required: boolean;
}

export interface EventDocumentation {
  type: EventType;
  description: string;
  source: 'System' | 'User' | 'Integration' | 'Scheduled';
  dataFields: EventDataField[];
  notes?: string[];
  example?: Record<string, any>;
}

// Event groups organized by process
export const EVENT_GROUPS: EventGroup[] = [
  {
    name: 'Incident Management',
    events: [
      'incident.created',
      'incident.updated',
      'incident.assigned',
      'incident.resolved',
      'incident.escalated',
      'incident.closed',
      'incident.reopened'
    ]
  },
  {
    name: 'Problem Management',
    events: [
      'problem.created',
      'problem.updated',
      'problem.assigned',
      'problem.rootCauseIdentified',
      'problem.workaroundAvailable',
      'problem.resolved',
      'problem.closed',
      'knownError.created',
      'knownError.updated',
      'knownError.resolved'
    ]
  },
  {
    name: 'Change Management',
    events: [
      'change.created',
      'change.updated',
      'change.submitted',
      'change.approved',
      'change.rejected',
      'change.implemented',
      'change.rollback',
      'change.reviewed',
      'change.closed'
    ]
  },
  {
    name: 'Release Management',
    events: [
      'release.created',
      'release.updated',
      'release.planApproved',
      'release.deploymentStarted',
      'release.deploymentCompleted',
      'release.verified',
      'release.deployed',
      'release.rollback'
    ]
  },
  {
    name: 'Service Request Management',
    events: [
      'service.created',
      'service.updated',
      'service.assigned',
      'service.approved',
      'service.rejected',
      'service.resolved',
      'service.closed'
    ]
  },
  {
    name: 'Knowledge Management',
    events: [
      'knowledge.created',
      'knowledge.updated',
      'knowledge.published',
      'knowledge.archived',
      'knowledge.viewed'
    ]
  },
  {
    name: 'Asset Management',
    events: [
      'asset.created',
      'asset.updated',
      'asset.retired',
      'asset.assigned',
      'asset.maintenance.scheduled',
      'asset.expiring'
    ]
  },
  {
    name: 'Test Management',
    events: [
      'test.created',
      'test.executed',
      'test.passed',
      'test.failed',
      'testCase.created',
      'testExecution.started',
      'testExecution.completed',
      'testExecution.failed'
    ]
  }
];

// Sample event documentation for some key events
const EVENT_DOCUMENTATION: Record<string, EventDocumentation> = {
  'incident.created': {
    type: 'incident.created',
    description: 'Triggered when a new incident is created',
    source: 'User',
    dataFields: [
      { name: 'id', type: 'string', description: 'Unique identifier for the incident', required: true },
      { name: 'title', type: 'string', description: 'Title of the incident', required: true },
      { name: 'description', type: 'string', description: 'Detailed description of the incident', required: true },
      { name: 'priority', type: 'string', description: 'Priority level (critical, high, medium, low)', required: true },
      { name: 'createdBy', type: 'string', description: 'User ID of the creator', required: true },
      { name: 'createdAt', type: 'date', description: 'Timestamp of creation', required: true },
      { name: 'assignedTo', type: 'string', description: 'User ID of assignee', required: false },
      { name: 'serviceId', type: 'string', description: 'Associated service identifier', required: false },
      { name: 'category', type: 'string', description: 'Incident category', required: false }
    ],
    notes: [
      'This event is automatically triggered when an incident record is created',
      'Notifications are sent to default recipients based on priority and service'
    ],
    example: {
      id: 'INC-12345',
      title: 'Website login page not responding',
      description: 'Users are unable to access the login page, receiving 503 errors',
      priority: 'high',
      createdBy: 'user-123',
      createdAt: '2023-09-15T14:32:21Z',
      serviceId: 'SRV-001',
      category: 'availability'
    }
  },
  'incident.assigned': {
    type: 'incident.assigned',
    description: 'Triggered when an incident is assigned to a user or team',
    source: 'User',
    dataFields: [
      { name: 'id', type: 'string', description: 'Unique identifier for the incident', required: true },
      { name: 'title', type: 'string', description: 'Title of the incident', required: true },
      { name: 'assignedTo', type: 'string', description: 'User ID of the new assignee', required: true },
      { name: 'assignedBy', type: 'string', description: 'User ID of the person making the assignment', required: true },
      { name: 'assignedAt', type: 'date', description: 'Timestamp of assignment', required: true },
      { name: 'previousAssignee', type: 'string', description: 'User ID of previous assignee', required: false },
      { name: 'priority', type: 'string', description: 'Priority level', required: false },
      { name: 'notes', type: 'string', description: 'Assignment notes', required: false }
    ],
    notes: [
      'Notifications are sent to both the new assignee and the previous assignee (if any)',
      'If the priority is critical, additional stakeholders are notified'
    ],
    example: {
      id: 'INC-12345',
      title: 'Website login page not responding',
      assignedTo: 'user-456',
      assignedBy: 'user-789',
      assignedAt: '2023-09-15T15:10:05Z',
      previousAssignee: 'user-123',
      priority: 'high',
      notes: 'Assigning to database team'
    }
  },
  'problem.rootCauseIdentified': {
    type: 'problem.rootCauseIdentified',
    description: 'Triggered when the root cause of a problem is identified',
    source: 'User',
    dataFields: [
      { name: 'id', type: 'string', description: 'Unique identifier for the problem', required: true },
      { name: 'title', type: 'string', description: 'Title of the problem', required: true },
      { name: 'rootCause', type: 'string', description: 'Description of the identified root cause', required: true },
      { name: 'identifiedBy', type: 'string', description: 'User ID of the person identifying the cause', required: true },
      { name: 'identifiedAt', type: 'date', description: 'Timestamp of identification', required: true },
      { name: 'relatedIncidents', type: 'array', description: 'List of incident IDs related to this problem', required: false },
      { name: 'category', type: 'string', description: 'Root cause category', required: false },
      { name: 'fixPlan', type: 'string', description: 'Plan to address the root cause', required: false }
    ],
    notes: [
      'This event may trigger notifications to stakeholders of related incidents',
      'May initiate change management process if a fix is proposed'
    ],
    example: {
      id: 'PROB-789',
      title: 'Intermittent login failures',
      rootCause: 'Database connection pool exhaustion due to connection leaks',
      identifiedBy: 'user-456',
      identifiedAt: '2023-09-18T09:45:30Z',
      relatedIncidents: ['INC-12345', 'INC-12346', 'INC-12350'],
      category: 'software defect',
      fixPlan: 'Apply patch to connection management module'
    }
  },
  'change.approved': {
    type: 'change.approved',
    description: 'Triggered when a change request is approved',
    source: 'User',
    dataFields: [
      { name: 'id', type: 'string', description: 'Unique identifier for the change', required: true },
      { name: 'title', type: 'string', description: 'Title of the change', required: true },
      { name: 'approvedBy', type: 'string', description: 'User ID of approver', required: true },
      { name: 'approvedAt', type: 'date', description: 'Timestamp of approval', required: true },
      { name: 'implementationWindow', type: 'object', description: 'Scheduled implementation timeframe', required: true },
      { name: 'risk', type: 'string', description: 'Assessed risk level', required: false },
      { name: 'notes', type: 'string', description: 'Approval notes or conditions', required: false },
      { name: 'approvalBoard', type: 'string', description: 'Board or group that approved the change', required: false }
    ],
    notes: [
      'Approval initiates implementation scheduling',
      'Notifications sent to change initiator, implementers, and affected service owners'
    ],
    example: {
      id: 'CHG-456',
      title: 'Deploy database connection pool fix',
      approvedBy: 'user-789',
      approvedAt: '2023-09-19T14:00:00Z',
      implementationWindow: {
        startDate: '2023-09-22T01:00:00Z',
        endDate: '2023-09-22T03:00:00Z'
      },
      risk: 'medium',
      notes: 'Approved with condition of additional testing',
      approvalBoard: 'CAB'
    }
  },
  'release.deploymentCompleted': {
    type: 'release.deploymentCompleted',
    description: 'Triggered when a release deployment is completed',
    source: 'System',
    dataFields: [
      { name: 'id', type: 'string', description: 'Unique identifier for the release', required: true },
      { name: 'name', type: 'string', description: 'Name of the release', required: true },
      { name: 'version', type: 'string', description: 'Version number', required: true },
      { name: 'status', type: 'string', description: 'Deployment status (success, partial, failed)', required: true },
      { name: 'completedAt', type: 'date', description: 'Timestamp of completion', required: true },
      { name: 'deployedBy', type: 'string', description: 'User ID of deployer', required: true },
      { name: 'components', type: 'array', description: 'List of deployed components', required: false },
      { name: 'issues', type: 'array', description: 'List of issues encountered', required: false },
      { name: 'rollbackRequired', type: 'boolean', description: 'Whether rollback is required', required: false }
    ],
    notes: [
      'This event may trigger post-deployment verification tests',
      'If status is not success, it may trigger incident or problem creation'
    ],
    example: {
      id: 'REL-123',
      name: 'Authentication Service Update',
      version: '2.3.1',
      status: 'success',
      completedAt: '2023-09-22T02:45:10Z',
      deployedBy: 'user-456',
      components: ['auth-api', 'user-db-schema', 'login-ui'],
      issues: [],
      rollbackRequired: false
    }
  }
};

// Helper functions for working with event documentation

/**
 * Get all events for a specific process
 */
export const getProcessEvents = (processName: string): EventType[] => {
  const group = EVENT_GROUPS.find(g => g.name === processName);
  return group ? group.events : [];
};

/**
 * Get detailed documentation for a specific event type
 */
export const getEventDocumentation = (eventType: EventType): EventDocumentation | null => {
  return EVENT_DOCUMENTATION[eventType] || null;
};

export default {
  EVENT_GROUPS,
  EVENT_DOCUMENTATION,
  getProcessEvents,
  getEventDocumentation
};
