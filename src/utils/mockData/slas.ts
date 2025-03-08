
import { SLA } from '../types';

// Default SLA calculation options
const defaultCalculationOptions = {
  pauseOutsideBusinessHours: true,
  pauseDuringPendingStatus: true,
  businessHoursId: 'default-business-hours'
};

// Mock SLAs
export const mockSLAs: SLA[] = [
  // Incident SLAs
  {
    id: 'sla-1',
    name: 'P1 Incident SLA',
    description: 'Service Level Agreement for P1 priority incidents',
    priorityLevel: 'P1',
    ticketType: 'incident',
    responseTimeHours: 0.5, // 30 minutes
    resolutionTimeHours: 4,
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
  {
    id: 'sla-2',
    name: 'P2 Incident SLA',
    description: 'Service Level Agreement for P2 priority incidents',
    priorityLevel: 'P2',
    ticketType: 'incident',
    responseTimeHours: 1,
    resolutionTimeHours: 8,
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
  {
    id: 'sla-3',
    name: 'P3 Incident SLA',
    description: 'Service Level Agreement for P3 priority incidents',
    priorityLevel: 'P3',
    ticketType: 'incident',
    responseTimeHours: 4,
    resolutionTimeHours: 24,
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
  {
    id: 'sla-4',
    name: 'P4 Incident SLA',
    description: 'Service Level Agreement for P4 priority incidents',
    priorityLevel: 'P4',
    ticketType: 'incident',
    responseTimeHours: 8,
    resolutionTimeHours: 48,
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
  // Service Request SLAs
  {
    id: 'sla-5',
    name: 'P1 Service Request SLA',
    description: 'Service Level Agreement for P1 priority service requests',
    priorityLevel: 'P1',
    ticketType: 'service',
    responseTimeHours: 0.5, // Same response time as incidents
    resolutionTimeHours: 8,  // Different resolution time
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
  {
    id: 'sla-6',
    name: 'P2 Service Request SLA',
    description: 'Service Level Agreement for P2 priority service requests',
    priorityLevel: 'P2',
    ticketType: 'service',
    responseTimeHours: 1,
    resolutionTimeHours: 16,
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
  {
    id: 'sla-7',
    name: 'P3 Service Request SLA',
    description: 'Service Level Agreement for P3 priority service requests',
    priorityLevel: 'P3',
    ticketType: 'service',
    responseTimeHours: 4,
    resolutionTimeHours: 40,
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
  {
    id: 'sla-8',
    name: 'P4 Service Request SLA',
    description: 'Service Level Agreement for P4 priority service requests',
    priorityLevel: 'P4',
    ticketType: 'service',
    responseTimeHours: 8,
    resolutionTimeHours: 72,
    isActive: true,
    calculationOptions: defaultCalculationOptions,
  },
];
