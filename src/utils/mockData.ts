
import { User, Ticket, TicketType, TicketStatus, TicketPriority, TicketCategory, AuditEntry } from './types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    department: 'IT',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'it',
    department: 'IT',
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    department: 'Marketing',
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'user',
    department: 'Finance',
  },
  {
    id: 'user-5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'user',
    department: 'HR',
  },
];

// Mock audit trail entries
const createAuditEntries = (ticketId: string, createdBy: string): AuditEntry[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  return [
    {
      id: `audit-${ticketId}-1`,
      ticketId,
      message: 'Ticket created',
      performedBy: createdBy,
      timestamp: yesterday,
    },
    {
      id: `audit-${ticketId}-2`,
      ticketId,
      message: 'Status changed to in-progress',
      performedBy: 'user-2',
      timestamp: new Date(yesterday.getTime() + 3600000), // 1 hour later
    },
  ];
};

// Mock tickets
export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    title: 'Laptop not starting',
    description: 'My laptop won\'t power on. I\'ve tried charging it and holding the power button.',
    status: 'in-progress',
    priority: 'high',
    category: 'hardware',
    type: 'incident',
    createdBy: 'user-3',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(),
    audit: createAuditEntries('ticket-1', 'user-3'),
  },
  {
    id: 'ticket-2',
    title: 'Need access to marketing drive',
    description: 'I need access to the marketing shared drive for the new campaign.',
    status: 'open',
    priority: 'medium',
    category: 'access',
    type: 'service',
    createdBy: 'user-4',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    audit: createAuditEntries('ticket-2', 'user-4'),
  },
  {
    id: 'ticket-3',
    title: 'Email not syncing on mobile',
    description: 'I can\'t get my email to sync on my company mobile phone.',
    status: 'resolved',
    priority: 'medium',
    category: 'software',
    type: 'incident',
    createdBy: 'user-5',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    resolvedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('ticket-3', 'user-5'),
  },
  {
    id: 'ticket-4',
    title: 'Request for new monitor',
    description: 'I would like to request a second monitor for my workstation.',
    status: 'open',
    priority: 'low',
    category: 'hardware',
    type: 'service',
    createdBy: 'user-3',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('ticket-4', 'user-3'),
  },
  {
    id: 'ticket-5',
    title: 'Can\'t connect to VPN',
    description: 'I\'m unable to connect to the company VPN from home.',
    status: 'open',
    priority: 'high',
    category: 'network',
    type: 'incident',
    createdBy: 'user-4',
    createdAt: new Date(),
    updatedAt: new Date(),
    audit: createAuditEntries('ticket-5', 'user-4'),
  },
  {
    id: 'ticket-6',
    title: 'Software installation request',
    description: 'I need Adobe Photoshop installed on my computer.',
    status: 'in-progress',
    priority: 'medium',
    category: 'software',
    type: 'service',
    createdBy: 'user-5',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    audit: createAuditEntries('ticket-6', 'user-5'),
  },
];

// Helper function to filter tickets
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

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get ticket by ID
export const getTicketById = (id: string): Ticket | undefined => {
  return mockTickets.find(ticket => ticket.id === id);
};

// Dashboard stats
export const getDashboardStats = () => {
  const openIncidents = mockTickets.filter(
    ticket => ticket.type === 'incident' && ticket.status === 'open'
  ).length;
  
  const inProgressIncidents = mockTickets.filter(
    ticket => ticket.type === 'incident' && ticket.status === 'in-progress'
  ).length;
  
  const openServiceRequests = mockTickets.filter(
    ticket => ticket.type === 'service' && ticket.status === 'open'
  ).length;
  
  const inProgressServiceRequests = mockTickets.filter(
    ticket => ticket.type === 'service' && ticket.status === 'in-progress'
  ).length;
  
  // Mock SLA compliance calculation - in a real app, this would be more complex
  const slaCompliance = 85;
  
  return {
    openIncidents,
    inProgressIncidents,
    openServiceRequests,
    inProgressServiceRequests,
    slaCompliance
  };
};
