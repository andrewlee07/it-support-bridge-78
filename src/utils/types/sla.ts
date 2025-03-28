
import { TicketPriority, TicketType } from './ticket';
import { SLACalculationOptions } from './businessHours';

export interface SLA {
  id: string;
  name: string;
  description: string;
  priorityLevel: TicketPriority;
  ticketType: TicketType;
  responseTimeHours: number;
  resolutionTimeHours: number;
  calculationOptions: SLACalculationOptions;
  isActive: boolean;
  
  // For backward compatibility
  priority?: string;
  responseTime?: number;
  resolutionTime?: number;
  businessHoursOnly?: boolean;
  active?: boolean;
}
