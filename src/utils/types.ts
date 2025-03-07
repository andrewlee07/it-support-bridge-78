
// User types
export type UserRole = 'admin' | 'it' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

// Ticket types
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';
export type TicketType = 'incident' | 'service';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  type: TicketType;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  audit: AuditEntry[];
}

// Audit trail
export interface AuditEntry {
  id: string;
  ticketId: string;
  message: string;
  performedBy: string;
  timestamp: Date;
}

// Dashboard stats
export interface DashboardStats {
  openIncidents: number;
  inProgressIncidents: number;
  openServiceRequests: number;
  inProgressServiceRequests: number;
  slaCompliance: number;
}
