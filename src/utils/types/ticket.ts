
import { AuditEntry } from './audit';

export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';
export type TicketType = 'incident' | 'service' | 'change';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4' | 'medium';
export type TicketStatus = 'new' | 'in-progress' | 'on-hold' | 'resolved' | 'closed' | 'pending' | 'open' | 'approved' | 'fulfilled';
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
  relatedItems?: RelatedItem[];
  parentTicketId?: string;
  
  // On-hold and pending status reason
  pendingSubStatus?: PendingSubStatus;
  pendingReason?: string;
  pendingStartDate?: Date;
  
  // Reopening information
  reopenReason?: string;
  reopenedAt?: Date;
  previousStatus?: TicketStatus;
  
  // Notes information
  notes?: TicketNote[];
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
  createdAt?: Date;
}

export interface TicketFilter {
  status?: string[];
  priority?: string[];
  assignedTo?: string[];
  category?: string[];
  type?: string[];
}

export interface TestCoverageRelationship {
  id: string;
  backlogItemId: string;
  testCaseId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
