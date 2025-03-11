import { EventType } from '@/utils/types/eventBus';

/**
 * Interface for event field definition
 */
export interface EventFieldDefinition {
  type: string;
  required: boolean;
  description?: string;
}

/**
 * Interface for event documentation
 */
export interface EventDocumentation {
  eventType: EventType;
  title: string;
  description: string;
  requiredFields: string[];
  optionalFields: string[];
  defaultRecipients: string[];
  defaultChannels: string[];
  exampleData?: Record<string, any>;
}

/**
 * Event groups for organization
 */
export const EVENT_GROUPS = {
  TICKET: 'Ticket Management',
  INCIDENT: 'Incident Management',
  SERVICE: 'Service Request Management',
  CHANGE: 'Change Management',
  PROBLEM: 'Problem Management',
  SLA: 'SLA Management',
  TASK: 'Task Management',
  RELEASE: 'Release Management',
  ASSET: 'Asset Management',
  TEST: 'Test Management',
  KNOWLEDGE: 'Knowledge Management',
  KNOWN_ERROR: 'Known Error Database',
  BACKLOG: 'Backlog Management',
  REMINDER: 'Reminder Management',
  TEST_EXECUTION: 'Test Execution Management'
};

/**
 * Comprehensive documentation for all event types
 */
export const EVENT_DOCUMENTATION: EventDocumentation[] = [
  {
    eventType: 'ticket.created',
    title: 'Ticket Created',
    description: 'A new ticket has been created.',
    requiredFields: ['title', 'description', 'priority'],
    optionalFields: ['category', 'assignedTo'],
    defaultRecipients: ['supportTeam', 'requestor'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      title: 'Network outage in the main office',
      description: 'Users are unable to access network resources.',
      priority: 'high',
      category: 'network',
      assignedTo: 'john.doe@example.com'
    }
  },
  {
    eventType: 'ticket.updated',
    title: 'Ticket Updated',
    description: 'An existing ticket has been updated.',
    requiredFields: ['id', 'updatedFields'],
    optionalFields: ['status', 'assignedTo'],
    defaultRecipients: ['supportTeam', 'requestor'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: '12345',
      updatedFields: ['status', 'assignedTo'],
      status: 'in progress',
      assignedTo: 'jane.smith@example.com'
    }
  },
  {
    eventType: 'ticket.assigned',
    title: 'Ticket Assigned',
    description: 'A ticket has been assigned to a user.',
    requiredFields: ['id', 'assignedTo'],
    optionalFields: [],
    defaultRecipients: ['assignedUser', 'supportTeam'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: '12345',
      assignedTo: 'jane.smith@example.com'
    }
  },
  {
    eventType: 'ticket.resolved',
    title: 'Ticket Resolved',
    description: 'A ticket has been resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['requestor', 'supportTeam'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: '12345',
      resolutionDetails: 'Issue resolved by restarting the server.'
    }
  },
  {
    eventType: 'ticket.closed',
    title: 'Ticket Closed',
    description: 'A ticket has been closed.',
    requiredFields: ['id'],
    optionalFields: [],
    defaultRecipients: ['requestor', 'supportTeam'],
    defaultChannels: ['email'],
    exampleData: {
      id: '12345'
    }
  },
  {
    eventType: 'ticket.reopened',
    title: 'Ticket Reopened',
    description: 'A ticket has been reopened.',
    requiredFields: ['id', 'reopenReason'],
    optionalFields: [],
    defaultRecipients: ['supportTeam', 'requestor'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: '12345',
      reopenReason: 'The issue has resurfaced.'
    }
  },
  {
    eventType: 'incident.created',
    title: 'Incident Created',
    description: 'A new incident has been created.',
    requiredFields: ['title', 'description', 'priority'],
    optionalFields: ['affectedServices', 'relatedIncidents'],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email', 'pager'],
    exampleData: {
      title: 'Production database is down',
      description: 'The main production database is inaccessible.',
      priority: 'P1',
      affectedServices: ['Database Service', 'Web Application'],
      relatedIncidents: []
    }
  },
  {
    eventType: 'incident.updated',
    title: 'Incident Updated',
    description: 'An existing incident has been updated.',
    requiredFields: ['id', 'updatedFields'],
    optionalFields: ['status', 'assignedTo'],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      updatedFields: ['status', 'assignedTo'],
      status: 'in progress',
      assignedTo: 'john.doe@example.com'
    }
  },
  {
    eventType: 'incident.assigned',
    title: 'Incident Assigned',
    description: 'An incident has been assigned to a user.',
    requiredFields: ['id', 'assignedTo'],
    optionalFields: [],
    defaultRecipients: ['assignedUser', 'incidentTeam'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      assignedTo: 'jane.smith@example.com'
    }
  },
  {
    eventType: 'incident.resolved',
    title: 'Incident Resolved',
    description: 'An incident has been resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      resolutionDetails: 'Issue resolved by applying a patch.'
    }
  },
  {
    eventType: 'incident.resolved.success',
    title: 'Incident Resolved Successfully',
    description: 'An incident has been successfully resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      resolutionDetails: 'Issue resolved by applying a patch.'
    }
  },
  {
    eventType: 'incident.resolved.partial',
    title: 'Incident Resolved Partially',
    description: 'An incident has been partially resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      resolutionDetails: 'Issue resolved by applying a temporary fix.'
    }
  },
  {
    eventType: 'incident.closed',
    title: 'Incident Closed',
    description: 'An incident has been closed.',
    requiredFields: ['id'],
    optionalFields: [],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'INC-123'
    }
  },
  {
    eventType: 'incident.reopened',
    title: 'Incident Reopened',
    description: 'An incident has been reopened.',
    requiredFields: ['id', 'reopenReason'],
    optionalFields: [],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      reopenReason: 'The issue has resurfaced.'
    }
  },
  {
    eventType: 'incident.created.p1',
    title: 'Critical Incident Created',
    description: 'A new critical (P1) incident has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['affectedServices'],
    defaultRecipients: ['onCallTeam', 'management'],
    defaultChannels: ['email', 'pager'],
    exampleData: {
      title: 'Major service outage',
      description: 'Critical services are unavailable.',
      affectedServices: ['Authentication', 'Payment Gateway']
    }
  },
  {
    eventType: 'incident.created.p2',
    title: 'High Priority Incident Created',
    description: 'A new high priority (P2) incident has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['affectedServices'],
    defaultRecipients: ['incidentTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      title: 'Performance degradation',
      description: 'Application response time is significantly increased.',
      affectedServices: ['Web Application']
    }
  },
  {
    eventType: 'incident.created.p3',
    title: 'Medium Priority Incident Created',
    description: 'A new medium priority (P3) incident has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['affectedServices'],
    defaultRecipients: ['incidentTeam'],
    defaultChannels: ['email'],
    exampleData: {
      title: 'Intermittent errors',
      description: 'Users are experiencing intermittent errors.',
      affectedServices: ['Web Application']
    }
  },
  {
    eventType: 'incident.created.p4',
    title: 'Low Priority Incident Created',
    description: 'A new low priority (P4) incident has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['affectedServices'],
    defaultRecipients: ['incidentTeam'],
    defaultChannels: ['email'],
    exampleData: {
      title: 'Minor UI issue',
      description: 'A minor UI issue has been reported.',
      affectedServices: ['Web Application']
    }
  },
  {
    eventType: 'incident.escalated',
    title: 'Incident Escalated',
    description: 'An incident has been escalated.',
    requiredFields: ['id', 'escalationReason'],
    optionalFields: ['escalatedTo'],
    defaultRecipients: ['incidentTeam', 'management'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      escalationReason: 'SLA breach imminent',
      escalatedTo: 'supportManager@example.com'
    }
  },
  {
    eventType: 'incident.escalated.critical',
    title: 'Critical Incident Escalated',
    description: 'A critical incident has been escalated.',
    requiredFields: ['id', 'escalationReason'],
    optionalFields: ['escalatedTo'],
    defaultRecipients: ['onCallTeam', 'management'],
    defaultChannels: ['email', 'pager'],
    exampleData: {
      id: 'INC-123',
      escalationReason: 'Major service outage',
      escalatedTo: 'onCallManager@example.com'
    }
  },
  {
    eventType: 'incident.escalated.high',
    title: 'High Priority Incident Escalated',
    description: 'A high priority incident has been escalated.',
    requiredFields: ['id', 'escalationReason'],
    optionalFields: ['escalatedTo'],
    defaultRecipients: ['incidentTeam', 'management'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'INC-123',
      escalationReason: 'SLA breach approaching',
      escalatedTo: 'supportManager@example.com'
    }
  },
  {
    eventType: 'incident.updated.critical',
    title: 'Critical Incident Updated',
    description: 'A critical incident has been updated.',
    requiredFields: ['id', 'updatedFields'],
    optionalFields: ['status', 'assignedTo'],
    defaultRecipients: ['onCallTeam', 'management'],
    defaultChannels: ['email', 'pager'],
    exampleData: {
      id: 'INC-123',
      updatedFields: ['status', 'assignedTo'],
      status: 'in progress',
      assignedTo: 'john.doe@example.com'
    }
  },
  {
    eventType: 'service.created',
    title: 'Service Request Created',
    description: 'A new service request has been created.',
    requiredFields: ['title', 'description', 'category'],
    optionalFields: ['requestedBy', 'approvalRequired'],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      title: 'Request for new software',
      description: 'Request to install Adobe Photoshop.',
      category: 'Software Installation',
      requestedBy: 'user123@example.com',
      approvalRequired: true
    }
  },
  {
    eventType: 'service.updated',
    title: 'Service Request Updated',
    description: 'An existing service request has been updated.',
    requiredFields: ['id', 'updatedFields'],
    optionalFields: ['status', 'assignedTo'],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      id: 'SR-456',
      updatedFields: ['status', 'assignedTo'],
      status: 'in progress',
      assignedTo: 'jane.smith@example.com'
    }
  },
  {
    eventType: 'service.assigned',
    title: 'Service Request Assigned',
    description: 'A service request has been assigned to a user.',
    requiredFields: ['id', 'assignedTo'],
    optionalFields: [],
    defaultRecipients: ['assignedUser', 'serviceDesk'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'SR-456',
      assignedTo: 'jane.smith@example.com'
    }
  },
  {
    eventType: 'service.resolved',
    title: 'Service Request Resolved',
    description: 'A service request has been resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      id: 'SR-456',
      resolutionDetails: 'Software installed successfully.'
    }
  },
  {
    eventType: 'service.closed',
    title: 'Service Request Closed',
    description: 'A service request has been closed.',
    requiredFields: ['id'],
    optionalFields: [],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'SR-456'
    }
  },
  {
    eventType: 'service.reopened',
    title: 'Service Request Reopened',
    description: 'A service request has been reopened.',
    requiredFields: ['id', 'reopenReason'],
    optionalFields: [],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      id: 'SR-456',
      reopenReason: 'Software is not working as expected.'
    }
  },
  {
    eventType: 'service.approved',
    title: 'Service Request Approved',
    description: 'A service request has been approved.',
    requiredFields: ['id', 'approver'],
    optionalFields: [],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      id: 'SR-456',
      approver: 'manager@example.com'
    }
  },
  {
    eventType: 'service.rejected',
    title: 'Service Request Rejected',
    description: 'A service request has been rejected.',
    requiredFields: ['id', 'rejectReason'],
    optionalFields: [],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      id: 'SR-456',
      rejectReason: 'Request does not meet requirements.'
    }
  },
  {
    eventType: 'service.created.high',
    title: 'High Priority Service Request Created',
    description: 'A new high priority service request has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['requestedBy'],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      title: 'Urgent software installation',
      description: 'Need software installed immediately.',
      requestedBy: 'user123@example.com'
    }
  },
  {
    eventType: 'service.created.medium',
    title: 'Medium Priority Service Request Created',
    description: 'A new medium priority service request has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['requestedBy'],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      title: 'Standard software installation',
      description: 'Request to install standard software.',
      requestedBy: 'user123@example.com'
    }
  },
  {
    eventType: 'service.created.low',
    title: 'Low Priority Service Request Created',
    description: 'A new low priority service request has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['requestedBy'],
    defaultRecipients: ['serviceDesk', 'requestor'],
    defaultChannels: ['email', 'portal'],
    exampleData: {
      title: 'Minor service request',
      description: 'Request for minor service.',
      requestedBy: 'user123@example.com'
    }
  },
  {
    eventType: 'change.created',
    title: 'Change Request Created',
    description: 'A new change request has been created.',
    requiredFields: ['title', 'description', 'type'],
    optionalFields: ['scheduledStart', 'scheduledEnd'],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email', 'calendar'],
    exampleData: {
      title: 'Server upgrade',
      description: 'Upgrade the production server.',
      type: 'standard',
      scheduledStart: '2024-01-15T00:00:00.000Z',
      scheduledEnd: '2024-01-16T00:00:00.000Z'
    }
  },
  {
    eventType: 'change.updated',
    title: 'Change Request Updated',
    description: 'An existing change request has been updated.',
    requiredFields: ['id', 'updatedFields'],
    optionalFields: ['status', 'scheduledStart', 'scheduledEnd'],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email', 'calendar'],
    exampleData: {
      id: 'CR-789',
      updatedFields: ['status', 'scheduledStart'],
      status: 'in progress',
      scheduledStart: '2024-01-16T00:00:00.000Z'
    }
  },
  {
    eventType: 'change.approved',
    title: 'Change Request Approved',
    description: 'A change request has been approved.',
    requiredFields: ['id', 'approver'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      approver: 'manager@example.com'
    }
  },
  {
    eventType: 'change.rejected',
    title: 'Change Request Rejected',
    description: 'A change request has been rejected.',
    requiredFields: ['id', 'rejectReason'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      rejectReason: 'Does not meet requirements.'
    }
  },
  {
    eventType: 'change.implemented',
    title: 'Change Request Implemented',
    description: 'A change request has been implemented.',
    requiredFields: ['id'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789'
    }
  },
  {
    eventType: 'change.rollback',
    title: 'Change Request Rolled Back',
    description: 'A change request has been rolled back.',
    requiredFields: ['id', 'rollbackReason'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      rollbackReason: 'Implementation failed.'
    }
  },
  {
    eventType: 'change.emergency.created',
    title: 'Emergency Change Request Created',
    description: 'A new emergency change request has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['justification'],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email', 'pager'],
    exampleData: {
      title: 'Immediate security patch',
      description: 'Apply security patch to production servers.',
      justification: 'Critical security vulnerability.'
    }
  },
  {
    eventType: 'change.emergency.approved',
    title: 'Emergency Change Request Approved',
    description: 'An emergency change request has been approved.',
    requiredFields: ['id', 'approver'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'ECR-101',
      approver: 'securityOfficer@example.com'
    }
  },
  {
    eventType: 'change.implemented.success',
    title: 'Change Implemented Successfully',
    description: 'A change request has been successfully implemented.',
    requiredFields: ['id'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789'
    }
  },
  {
    eventType: 'change.implemented.failure',
    title: 'Change Implementation Failed',
    description: 'A change request implementation has failed.',
    requiredFields: ['id', 'failureReason'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      failureReason: 'Server crashed during upgrade.'
    }
  },
  {
    eventType: 'change.implemented.partial',
    title: 'Change Implemented Partially',
    description: 'A change request has been partially implemented.',
    requiredFields: ['id', 'partialImplementationDetails'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      partialImplementationDetails: 'Only half of the servers were upgraded.'
    }
  },
  {
    eventType: 'change.submitted',
    title: 'Change Request Submitted',
    description: 'A change request has been submitted for review.',
    requiredFields: ['id', 'submitter'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      submitter: 'requester@example.com'
    }
  },
  {
    eventType: 'change.reviewed',
    title: 'Change Request Reviewed',
    description: 'A change request has been reviewed.',
    requiredFields: ['id', 'reviewer'],
    optionalFields: ['reviewComments'],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      reviewer: 'reviewer@example.com',
      reviewComments: 'Ready for approval.'
    }
  },
  {
    eventType: 'change.tested',
    title: 'Change Request Tested',
    description: 'A change request has been tested.',
    requiredFields: ['id', 'tester'],
    optionalFields: ['testResults'],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      tester: 'tester@example.com',
      testResults: 'All tests passed.'
    }
  },
  {
    eventType: 'change.canceled',
    title: 'Change Request Canceled',
    description: 'A change request has been canceled.',
    requiredFields: ['id', 'cancelReason'],
    optionalFields: [],
    defaultRecipients: ['changeManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'CR-789',
      cancelReason: 'Project requirements changed.'
    }
  },
  {
    eventType: 'problem.created',
    title: 'Problem Created',
    description: 'A new problem record has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['relatedIncidents', 'rootCause'],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      title: 'Recurring network issues',
      description: 'Users are experiencing intermittent network connectivity problems.',
      relatedIncidents: ['INC-123', 'INC-124'],
      rootCause: 'Unknown'
    }
  },
  {
    eventType: 'problem.updated',
    title: 'Problem Updated',
    description: 'An existing problem record has been updated.',
    requiredFields: ['id', 'updatedFields'],
    optionalFields: ['status', 'rootCause'],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'PRB-001',
      updatedFields: ['status', 'rootCause'],
      status: 'in progress',
      rootCause: 'Misconfigured network device'
    }
  },
  {
    eventType: 'problem.resolved',
    title: 'Problem Resolved',
    description: 'A problem record has been resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'PRB-001',
      resolutionDetails: 'Network device reconfigured.'
    }
  },
  {
    eventType: 'problem.resolved.success',
    title: 'Problem Resolved Successfully',
    description: 'A problem record has been successfully resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'PRB-001',
      resolutionDetails: 'Network device reconfigured and tested.'
    }
  },
  {
    eventType: 'problem.resolved.partial',
    title: 'Problem Resolved Partially',
    description: 'A problem record has been partially resolved.',
    requiredFields: ['id', 'resolutionDetails'],
    optionalFields: [],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'PRB-001',
      resolutionDetails: 'Temporary workaround implemented.'
    }
  },
  {
    eventType: 'problem.assigned',
    title: 'Problem Assigned',
    description: 'A problem record has been assigned to a user.',
    requiredFields: ['id', 'assignedTo'],
    optionalFields: [],
    defaultRecipients: ['assignedUser', 'problemManagement'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'PRB-001',
      assignedTo: 'john.doe@example.com'
    }
  },
  {
    eventType: 'problem.rootCauseIdentified',
    title: 'Root Cause Identified',
    description: 'The root cause of a problem has been identified.',
    requiredFields: ['id', 'rootCause'],
    optionalFields: [],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'PRB-001',
      rootCause: 'Misconfigured network device'
    }
  },
  {
    eventType: 'problem.workaroundAvailable',
    title: 'Workaround Available',
    description: 'A workaround is available for a problem.',
    requiredFields: ['id', 'workaround'],
    optionalFields: [],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      id: 'PRB-001',
      workaround: 'Restart the network device.'
    }
  },
  {
    eventType: 'problem.closed',
    title: 'Problem Closed',
    description: 'A problem record has been closed.',
    requiredFields: ['id'],
    optionalFields: [],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email'],
    exampleData: {
      id: 'PRB-001'
    }
  },
  {
    eventType: 'problem.created.critical',
    title: 'Critical Problem Created',
    description: 'A new critical problem has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['relatedIncidents'],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      title: 'Major service outage',
      description: 'Critical services are unavailable.',
      relatedIncidents: ['INC-123', 'INC-124']
    }
  },
  {
    eventType: 'problem.created.high',
    title: 'High Priority Problem Created',
    description: 'A new high priority problem has been created.',
    requiredFields: ['title', 'description'],
    optionalFields: ['relatedIncidents'],
    defaultRecipients: ['problemManagement', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      title: 'Performance degradation',
      description: 'Application response time is significantly increased.',
      relatedIncidents: ['INC-123', 'INC-124']
    }
  },
  {
    eventType: 'sla.warning',
    title: 'SLA Warning',
    description: 'An SLA is approaching breach.',
    requiredFields: ['slaId', 'remainingTime'],
    optionalFields: ['ticketId'],
    defaultRecipients: ['supportTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      slaId: 'SLA-001',
      remainingTime: '2 hours',
      ticketId: 'INC-123'
    }
  },
  {
    eventType: 'sla.warning.response',
    title: 'SLA Response Warning',
    description: 'An SLA for initial response is approaching breach.',
    requiredFields: ['slaId', 'remainingTime'],
    optionalFields: ['ticketId'],
    defaultRecipients: ['supportTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      slaId: 'SLA-001',
      remainingTime: '1 hour',
      ticketId: 'INC-123'
    }
  },
  {
    eventType: 'sla.warning.resolution',
    title: 'SLA Resolution Warning',
    description: 'An SLA for resolution is approaching breach.',
    requiredFields: ['slaId', 'remainingTime'],
    optionalFields: ['ticketId'],
    defaultRecipients: ['supportTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      slaId: 'SLA-001',
      remainingTime: '4 hours',
      ticketId: 'INC-123'
    }
  },
  {
    eventType: 'sla.warning.update',
    title: 'SLA Update Warning',
    description: 'An SLA for providing an update is approaching breach.',
    requiredFields: ['slaId', 'remainingTime'],
    optionalFields: ['ticketId'],
    defaultRecipients: ['supportTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      slaId: 'SLA-001',
      remainingTime: '30 minutes',
      ticketId: 'INC-123'
    }
  },
  {
    eventType: 'sla.warning.approaching',
    title: 'SLA Approaching Warning',
    description: 'An SLA is approaching its deadline.',
    requiredFields: ['slaId', 'remainingTime'],
    optionalFields: ['ticketId'],
    defaultRecipients: ['supportTeam', 'stakeholders'],
    defaultChannels: ['email', 'slack'],
    exampleData: {
      slaId: 'SLA-001',
      remainingTime: '1 day',
      ticketId: 'INC-123'
    }
  },
  {
    eventType: 'sla.warning.imminent',
    title: 'SLA Imminent Warning',
    description: 'An SLA is about to breach.',
    requiredFields: ['slaId', 'remainingTime'],
    optionalFields: ['ticketId'],
    defaultRecipients: ['supportTeam', 'stakeholders'],
    defaultChannels: ['email
