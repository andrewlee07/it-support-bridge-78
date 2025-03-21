import { Ticket, TicketStatus, TicketPriority, TicketType, RelatedItem } from '../types';
import { createAuditEntries } from './auditHelpers';

// Mock tickets
export const mockTickets: Ticket[] = [
  {
    id: 'INC00001',
    title: 'Laptop not starting',
    description: 'My laptop won\'t power on. I\'ve tried charging it and holding the power button.',
    status: 'in-progress',
    priority: 'P1',
    category: 'hardware',
    type: 'incident',
    createdBy: 'user-3',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(),
    audit: createAuditEntries('INC00001', 'ticket', 'user-3'),
    relatedProblems: ['PRB00001', 'PRB00005'],
  },
  {
    id: 'SR00001',
    title: 'Need access to marketing drive',
    description: 'I need access to the marketing shared drive for the new campaign.',
    status: 'open',
    priority: 'P2',
    category: 'access',
    type: 'service',
    createdBy: 'user-4',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    audit: createAuditEntries('SR00001', 'ticket', 'user-4'),
  },
  {
    id: 'INC00002',
    title: 'Email not syncing on mobile',
    description: 'I can\'t get my email to sync on my company mobile phone.',
    status: 'resolved',
    priority: 'P2',
    category: 'software',
    type: 'incident',
    createdBy: 'user-5',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    resolvedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('INC00002', 'ticket', 'user-5'),
    relatedProblems: ['PRB00002'],
  },
  {
    id: 'SR00002',
    title: 'Request for new monitor',
    description: 'I would like to request a second monitor for my workstation.',
    status: 'open',
    priority: 'P4',
    category: 'hardware',
    type: 'service',
    createdBy: 'user-3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('SR00002', 'ticket', 'user-3'),
  },
  {
    id: 'INC00003',
    title: 'Can\'t connect to VPN',
    description: 'I\'m unable to connect to the company VPN from home.',
    status: 'open',
    priority: 'P1',
    category: 'network',
    type: 'incident',
    createdBy: 'user-4',
    createdAt: new Date(),
    updatedAt: new Date(),
    audit: createAuditEntries('INC00003', 'ticket', 'user-4'),
    relatedProblems: ['PRB00001', 'PRB00003'],
    relatedItems: [
      {
        id: 'BUG001',
        title: 'VPN Client crashes on connection attempt',
        type: 'bug',
        status: 'open',
        createdAt: new Date()
      }
    ]
  },
  {
    id: 'SR00003',
    title: 'Software installation request',
    description: 'I need Adobe Photoshop installed on my computer.',
    status: 'in-progress',
    priority: 'P3',
    category: 'software',
    type: 'service',
    createdBy: 'user-5',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('SR00003', 'ticket', 'user-5'),
    relatedItems: [
      {
        id: 'BKL001',
        title: 'Create standard software installation package',
        type: 'backlogItem',
        status: 'in-progress',
        createdAt: new Date()
      }
    ]
  },
  
  // Add security cases
  {
    id: 'SEC00001',
    title: 'Suspicious login attempts detected',
    description: 'Multiple failed login attempts from unusual IP addresses have been detected on the customer portal.',
    status: 'in-progress',
    priority: 'P1',
    category: 'security',
    type: 'security',
    createdBy: 'user-2',
    assignedTo: 'user-3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(),
    audit: createAuditEntries('SEC00001', 'security', 'user-2'),
    securityClassification: 'confidential',
  },
  {
    id: 'SEC00002',
    title: 'Marketing database breach',
    description: 'Potential unauthorized access to the marketing database containing customer email addresses and preferences.',
    status: 'open',
    priority: 'P1',
    category: 'data-breach',
    type: 'security',
    createdBy: 'user-5',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    audit: createAuditEntries('SEC00002', 'security', 'user-5'),
    securityClassification: 'restricted',
    dataSubjects: 1240,
    breachType: 'unauthorized-access',
    reportedToAuthorities: true,
    reportedDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 'SEC00003',
    title: 'SAR Request - John Smith',
    description: 'Subject Access Request from John Smith requesting all personal data held by the company.',
    status: 'open',
    priority: 'P3',
    category: 'sar',
    type: 'security',
    createdBy: 'user-1',
    assignedTo: 'user-4',
    createdAt: new Date(),
    updatedAt: new Date(),
    audit: createAuditEntries('SEC00003', 'security', 'user-1'),
    securityClassification: 'confidential',
    sarRequestType: 'access',
    dpaRequired: true,
  },
];

// Helper function to filter tickets by type
export const getTicketsByType = (type: TicketType): Ticket[] => {
  return mockTickets.filter(ticket => ticket.type === type);
};

// Helper function to filter tickets by status
export const getTicketsByStatus = (status: TicketStatus): Ticket[] => {
  return mockTickets.filter(ticket => ticket.status === status);
};

// Helper function to filter tickets by priority
export const getTicketsByPriority = (priority: TicketPriority): Ticket[] => {
  return mockTickets.filter(ticket => ticket.priority === priority);
};

// Helper function to get ticket by ID
export const getTicketById = (id: string): Ticket | undefined => {
  // Handle partial ID search
  if (id.startsWith('INC') || id.startsWith('SR')) {
    return mockTickets.find(ticket => ticket.id === id);
  } else {
    // Partial ID search - look for any ticket that contains this ID segment
    return mockTickets.find(ticket => ticket.id.toLowerCase().includes(id.toLowerCase()));
  }
};

// Get the next incident ID number
export const getNextIncidentIdNumber = (): number => {
  const existingIds = mockTickets
    .filter(ticket => ticket.type === 'incident' && ticket.id.startsWith('INC'))
    .map(ticket => {
      const numericPart = ticket.id.replace('INC', '');
      return parseInt(numericPart, 10);
    });
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return maxId + 1;
};

// Get the next service request ID number
export const getNextServiceRequestIdNumber = (): number => {
  const existingIds = mockTickets
    .filter(ticket => ticket.type === 'service' && ticket.id.startsWith('SR'))
    .map(ticket => {
      const numericPart = ticket.id.replace('SR', '');
      return parseInt(numericPart, 10);
    });
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return maxId + 1;
};

// Generate a new incident ID with format INC00001
export const generateIncidentId = (): string => {
  const nextNumber = getNextIncidentIdNumber();
  return `INC${nextNumber.toString().padStart(5, '0')}`;
};

// Generate a new service request ID with format SR00001
export const generateServiceRequestId = (): string => {
  const nextNumber = getNextServiceRequestIdNumber();
  return `SR${nextNumber.toString().padStart(5, '0')}`;
};

// Generate a new security case ID with format SEC00001
export const generateSecurityCaseId = (): string => {
  const existingIds = mockTickets
    .filter(ticket => ticket.type === 'security' && ticket.id.startsWith('SEC'))
    .map(ticket => {
      const numericPart = ticket.id.replace('SEC', '');
      return parseInt(numericPart, 10);
    });
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return `SEC${(maxId + 1).toString().padStart(5, '0')}`;
};
