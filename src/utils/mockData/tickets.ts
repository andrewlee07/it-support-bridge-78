
import { Ticket, TicketStatus, TicketPriority, TicketType } from '../types';
import { createAuditEntries } from './auditHelpers';

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
    audit: createAuditEntries('ticket-1', 'ticket', 'user-3'),
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
    audit: createAuditEntries('ticket-2', 'ticket', 'user-4'),
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
    audit: createAuditEntries('ticket-3', 'ticket', 'user-5'),
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
    audit: createAuditEntries('ticket-4', 'ticket', 'user-3'),
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
    audit: createAuditEntries('ticket-5', 'ticket', 'user-4'),
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
    audit: createAuditEntries('ticket-6', 'ticket', 'user-5'),
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
  return mockTickets.find(ticket => ticket.id === id);
};
