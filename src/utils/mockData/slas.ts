
import { SLA } from '../types';

// Mock SLAs
export const mockSLAs: SLA[] = [
  {
    id: 'sla-1',
    name: 'High Priority SLA',
    description: 'Service Level Agreement for high priority tickets',
    priorityLevel: 'high',
    responseTimeHours: 1,
    resolutionTimeHours: 4,
    isActive: true,
  },
  {
    id: 'sla-2',
    name: 'Medium Priority SLA',
    description: 'Service Level Agreement for medium priority tickets',
    priorityLevel: 'medium',
    responseTimeHours: 4,
    resolutionTimeHours: 8,
    isActive: true,
  },
  {
    id: 'sla-3',
    name: 'Low Priority SLA',
    description: 'Service Level Agreement for low priority tickets',
    priorityLevel: 'low',
    responseTimeHours: 8,
    resolutionTimeHours: 24,
    isActive: true,
  },
];
