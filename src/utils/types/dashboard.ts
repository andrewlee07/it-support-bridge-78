
// Dashboard stats
import { Ticket } from './ticket';
import { CrossSystemDashboardData, ReleaseRiskScore, BacklogProgressItem, TestMetricsData, RelationshipData } from './dashboard/crossSystemDashboard';

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

// Export the cross-system dashboard types for use elsewhere
export type { 
  CrossSystemDashboardData, 
  ReleaseRiskScore, 
  BacklogProgressItem, 
  TestMetricsData,
  RelationshipData
};
