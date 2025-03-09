
import { ServiceTicketCount } from './types';

// Mock service ticket counts for analytics
export const mockServiceTicketCounts: ServiceTicketCount[] = [
  { serviceId: 'srv-1', serviceName: 'Laptop Request', incidents: 12, requests: 45, total: 57 },
  { serviceId: 'srv-2', serviceName: 'Software Installation', incidents: 5, requests: 68, total: 73 },
  { serviceId: 'srv-3', serviceName: 'VPN Access', incidents: 8, requests: 32, total: 40 },
  { serviceId: 'srv-4', serviceName: 'Password Reset', incidents: 3, requests: 89, total: 92 },
  { serviceId: 'srv-5', serviceName: 'Technical Support', incidents: 21, requests: 34, total: 55 },
];
