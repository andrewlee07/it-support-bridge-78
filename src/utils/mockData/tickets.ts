
import { Ticket } from '../types/ticket';

// Sample incident data
const incidents: Ticket[] = [
  {
    id: 'INC-1001',
    title: 'Network Outage in North Data Center',
    description: 'Complete network outage affecting all services in the north data center.',
    status: 'in-progress',
    priority: 'P1',
    category: 'Network',
    assignedTo: 'user123',
    createdAt: '2023-06-10T08:30:00Z',
    updatedAt: '2023-06-10T09:15:00Z',
    resolvedAt: null,
    createdBy: 'system',
    affectedServices: ['web-app', 'api-gateway'],
    sla: {
      responseTime: {
        target: '30m',
        actual: '15m',
        status: 'met'
      },
      resolutionTime: {
        target: '4h',
        actual: null,
        status: 'pending'
      }
    }
  },
  {
    id: 'INC-1002',
    title: 'Authentication Service Degradation',
    description: 'Users experiencing intermittent login failures due to authentication service issues.',
    status: 'open',
    priority: 'P2',
    category: 'Software',
    assignedTo: 'user456',
    createdAt: '2023-06-11T14:45:00Z',
    updatedAt: '2023-06-11T14:45:00Z',
    resolvedAt: null,
    createdBy: 'user789',
    affectedServices: ['auth-service'],
    sla: {
      responseTime: {
        target: '1h',
        actual: null,
        status: 'pending'
      },
      resolutionTime: {
        target: '8h',
        actual: null,
        status: 'pending'
      }
    }
  },
  {
    id: 'INC-1003',
    title: 'Database Performance Degradation',
    description: 'Database queries taking longer than usual, affecting application response times.',
    status: 'pending',
    priority: 'P2',
    category: 'Database',
    assignedTo: 'user789',
    createdAt: '2023-06-09T11:20:00Z',
    updatedAt: '2023-06-09T13:45:00Z',
    resolvedAt: null,
    createdBy: 'user123',
    affectedServices: ['customer-db', 'reporting-service'],
    sla: {
      responseTime: {
        target: '1h',
        actual: '45m',
        status: 'met'
      },
      resolutionTime: {
        target: '8h',
        actual: null,
        status: 'at-risk'
      }
    }
  },
  {
    id: 'INC-1004',
    title: 'Email Service Outage',
    description: 'Corporate email service is completely down. Users unable to send or receive emails.',
    status: 'resolved',
    priority: 'P1',
    category: 'Software',
    assignedTo: 'user456',
    createdAt: '2023-06-08T09:10:00Z',
    updatedAt: '2023-06-08T12:30:00Z',
    resolvedAt: '2023-06-08T12:30:00Z',
    createdBy: 'user789',
    affectedServices: ['email-service'],
    sla: {
      responseTime: {
        target: '30m',
        actual: '25m',
        status: 'met'
      },
      resolutionTime: {
        target: '4h',
        actual: '3h 20m',
        status: 'met'
      }
    }
  },
  {
    id: 'INC-1005',
    title: 'VPN Connection Issues',
    description: 'Remote employees unable to connect to corporate VPN from specific regions.',
    status: 'in-progress',
    priority: 'P3',
    category: 'Network',
    assignedTo: 'user123',
    createdAt: '2023-06-12T15:30:00Z',
    updatedAt: '2023-06-12T16:15:00Z',
    resolvedAt: null,
    createdBy: 'user456',
    affectedServices: ['vpn-service'],
    sla: {
      responseTime: {
        target: '2h',
        actual: '45m',
        status: 'met'
      },
      resolutionTime: {
        target: '12h',
        actual: null,
        status: 'pending'
      }
    }
  }
];

// Function to get all incidents
export const getIncidents = (): Ticket[] => {
  return incidents;
};

// Additional functions for CRUD operations can be added here
