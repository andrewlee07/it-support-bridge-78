
// Dashboard stats
import { Ticket } from './ticket';

export interface DashboardStats {
  openIncidents: number;
  inProgressIncidents: number;
  openServiceRequests: number;
  inProgressServiceRequests: number;
  pendingChangeRequests: number;
  upcomingChanges: number;
  slaCompliance: number;
  recentTickets: Ticket[];
  ticketsByCategory: {
    category: string;
    count: number;
  }[];
  ticketsByPriority: {
    priority: string;
    count: number;
  }[];
}
