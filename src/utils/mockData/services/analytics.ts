
import { ServiceTicketCount } from './types';

// Mock service ticket counts for dashboard and reports
export const mockServiceTicketCounts: ServiceTicketCount[] = [
  {
    serviceId: 'service-1',
    serviceName: 'Email Services',
    incidents: 12,
    requests: 45,
    total: 57
  },
  {
    serviceId: 'service-2',
    serviceName: 'Network Access',
    incidents: 8,
    requests: 23,
    total: 31
  },
  {
    serviceId: 'service-3',
    serviceName: 'Software Installation',
    incidents: 3,
    requests: 67,
    total: 70
  },
  {
    serviceId: 'service-4',
    serviceName: 'Hardware Support',
    incidents: 15,
    requests: 32,
    total: 47
  },
  {
    serviceId: 'service-5',
    serviceName: 'Account Management',
    incidents: 6,
    requests: 89,
    total: 95
  }
];
