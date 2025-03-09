
import { ServiceCategory, ServiceWithCategory, Service } from '@/utils/types/service';

// Export mock service ticket counts type
export interface ServiceTicketCount {
  serviceId: string;
  serviceName: string;
  incidents: number;
  requests: number;
  total: number;
}
