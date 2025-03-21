
export type TicketType = 'incident' | 'service' | 'problem' | 'change' | 'security';
export type TicketPriority = 'critical' | 'high' | 'medium' | 'low';
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'security' | 'other';
export type TicketStatus = 'open' | 'in-progress' | 'on-hold' | 'resolved' | 'closed';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  reportedBy: string;
  assignedTo?: string;
  dueDate?: Date;
}

export interface RelatedItem {
  id: string;
  title: string;
  type: string;
  status: string;
  relationship: string;
}

export interface TicketUpdatePayload {
  priority?: TicketPriority;
  category?: TicketCategory;
  status?: TicketStatus;
  assignedTo?: string;
  description?: string;
}
