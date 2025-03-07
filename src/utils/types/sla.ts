
// SLA types
import { TicketPriority, TicketType } from './ticket';

export interface SLA {
  id: string;
  name: string;
  description: string;
  priorityLevel: TicketPriority;
  ticketType: TicketType;
  responseTimeHours: number;
  resolutionTimeHours: number;
  isActive: boolean;
}
