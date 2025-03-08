
import { AuditEntry } from './audit';

export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';
export type TicketType = 'incident' | 'service';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4';
export type TicketStatus = 'new' | 'in-progress' | 'on-hold' | 'resolved' | 'closed' | 'pending';
export type PendingSubStatus = 'customer-info' | 'customer-testing' | 'third-party';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  type: TicketType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  dueDate?: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  slaId?: string;
  firstResponseAt?: Date;
  audit: AuditEntry[];
  
  // Related items
  relatedAssets?: string[];
  relatedProblems?: string[];
  relatedChanges?: string[];
  parentTicketId?: string;
  
  // On-hold and pending status reason
  pendingSubStatus?: PendingSubStatus;
  pendingReason?: string;
  pendingStartDate?: Date;
  
  // Reopening information
  reopenReason?: string;
  reopenedAt?: Date;
  previousStatus?: TicketStatus;
}

export interface TicketNote {
  id: string;
  ticketId: string;
  text: string;
  createdAt: Date;
  createdBy: string;
  isInternal: boolean;
}

export interface TicketWithNotes extends Ticket {
  notes: TicketNote[];
}

export interface RelatedItem {
  id: string;
  title: string;
  type: string;
  status: string;
}
