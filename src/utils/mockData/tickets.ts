
import { Ticket } from '../types/ticket';

// Sample incident data
const incidents: Ticket[] = [
  {
    id: 'INC00001',
    title: 'Network Outage in North Data Center',
    description: 'Complete network outage affecting all services in the north data center.',
    status: 'in-progress',
    priority: 'P1',
    category: 'network', // Fixed category to match TicketCategory type
    assignedTo: 'user123',
    createdAt: new Date('2023-06-10T08:30:00Z'), // Convert to Date object
    updatedAt: new Date('2023-06-10T09:15:00Z'), // Convert to Date object
    resolvedAt: null,
    createdBy: 'system',
    affectedServices: ['web-app', 'api-gateway'],
    type: 'incident', // Add required type field
    audit: [], // Add required audit field
    // Remove sla field as it's not in the Ticket type
  },
  {
    id: 'INC00002',
    title: 'Authentication Service Degradation',
    description: 'Users experiencing intermittent login failures due to authentication service issues.',
    status: 'open',
    priority: 'P2',
    category: 'software', // Fixed category to match TicketCategory type
    assignedTo: 'user456',
    createdAt: new Date('2023-06-11T14:45:00Z'), // Convert to Date object
    updatedAt: new Date('2023-06-11T14:45:00Z'), // Convert to Date object
    resolvedAt: null,
    createdBy: 'user789',
    affectedServices: ['auth-service'],
    type: 'incident', // Add required type field
    audit: [], // Add required audit field
    // Remove sla field as it's not in the Ticket type
  },
  {
    id: 'INC00003',
    title: 'Database Performance Degradation',
    description: 'Database queries taking longer than usual, affecting application response times.',
    status: 'pending',
    priority: 'P2',
    category: 'other', // Fixed category as "Database" isn't in TicketCategory
    assignedTo: 'user789',
    createdAt: new Date('2023-06-09T11:20:00Z'), // Convert to Date object
    updatedAt: new Date('2023-06-09T13:45:00Z'), // Convert to Date object
    resolvedAt: null,
    createdBy: 'user123',
    affectedServices: ['customer-db', 'reporting-service'],
    type: 'incident', // Add required type field
    audit: [], // Add required audit field
    // Remove sla field as it's not in the Ticket type
  },
  {
    id: 'INC00004',
    title: 'Email Service Outage',
    description: 'Corporate email service is completely down. Users unable to send or receive emails.',
    status: 'resolved',
    priority: 'P1',
    category: 'software', // Fixed category to match TicketCategory type
    assignedTo: 'user456',
    createdAt: new Date('2023-06-08T09:10:00Z'), // Convert to Date object
    updatedAt: new Date('2023-06-08T12:30:00Z'), // Convert to Date object
    resolvedAt: new Date('2023-06-08T12:30:00Z'), // Convert to Date object
    createdBy: 'user789',
    affectedServices: ['email-service'],
    type: 'incident', // Add required type field
    audit: [], // Add required audit field
    // Remove sla field as it's not in the Ticket type
  },
  {
    id: 'INC00005',
    title: 'VPN Connection Issues',
    description: 'Remote employees unable to connect to corporate VPN from specific regions.',
    status: 'in-progress',
    priority: 'P3',
    category: 'network', // Fixed category to match TicketCategory type
    assignedTo: 'user123',
    createdAt: new Date('2023-06-12T15:30:00Z'), // Convert to Date object
    updatedAt: new Date('2023-06-12T16:15:00Z'), // Convert to Date object
    resolvedAt: null,
    createdBy: 'user456',
    affectedServices: ['vpn-service'],
    type: 'incident', // Add required type field
    audit: [], // Add required audit field
    // Remove sla field as it's not in the Ticket type
  }
];

// Add service tickets for complete data
const serviceRequests: Ticket[] = [
  {
    id: 'SR00001',
    title: 'New Employee Onboarding',
    description: 'Setup required for new employee starting on Monday',
    status: 'open',
    priority: 'P3',
    category: 'access',
    assignedTo: 'user456',
    createdAt: new Date('2023-06-15T09:10:00Z'),
    updatedAt: new Date('2023-06-15T09:10:00Z'),
    resolvedAt: null,
    createdBy: 'user789',
    type: 'service',
    affectedServices: [],
    audit: [], // Add required audit field
  },
  {
    id: 'SR00002',
    title: 'Software Installation Request',
    description: 'Need Adobe Creative Suite installed on design team laptops',
    status: 'in-progress',
    priority: 'P3',
    category: 'software',
    assignedTo: 'user123',
    createdAt: new Date('2023-06-14T11:30:00Z'),
    updatedAt: new Date('2023-06-14T13:45:00Z'),
    resolvedAt: null,
    createdBy: 'user456',
    type: 'service',
    affectedServices: [],
    audit: [], // Add required audit field
  }
];

// Combine all tickets
export const mockTickets = [...incidents, ...serviceRequests];

// Function to get all incidents
export const getIncidents = (): Ticket[] => {
  return incidents;
};

// Function to get a ticket by ID
export const getTicketById = (id: string): Ticket | undefined => {
  return mockTickets.find(ticket => ticket.id === id);
};

// Function to get tickets by type
export const getTicketsByType = (type: 'incident' | 'service'): Ticket[] => {
  return mockTickets.filter(ticket => ticket.type === type);
};

// Function to get tickets by status
export const getTicketsByStatus = (status: string): Ticket[] => {
  return mockTickets.filter(ticket => ticket.status === status);
};

// Function to get tickets by priority
export const getTicketsByPriority = (priority: string): Ticket[] => {
  return mockTickets.filter(ticket => ticket.priority === priority);
};

// Helper function to generate new incident ID
export const generateIncidentId = (): string => {
  const lastIncident = incidents[incidents.length - 1];
  const lastId = parseInt(lastIncident.id.replace('INC', ''));
  const newId = lastId + 1;
  return `INC${newId.toString().padStart(5, '0')}`;
};

// Helper function to generate new service request ID
export const generateServiceRequestId = (): string => {
  const serviceRequests = mockTickets.filter(ticket => ticket.type === 'service');
  const lastRequest = serviceRequests[serviceRequests.length - 1];
  const lastId = parseInt(lastRequest.id.replace('SR', ''));
  const newId = lastId + 1;
  return `SR${newId.toString().padStart(5, '0')}`;
};
