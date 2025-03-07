
// SLA types
import { TicketPriority } from './ticket';

export interface SLA {
  id: string;
  name: string;
  description: string;
  priorityLevel: TicketPriority;
  responseTimeHours: number;
  resolutionTimeHours: number;
  isActive: boolean;
}
