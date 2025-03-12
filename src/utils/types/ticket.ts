
import { AuditEntry } from './audit';

export type TicketStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed' | 'fulfilled' | 'new' | 'approved' | 'on-hold';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4' | 'high' | 'medium' | 'low';
export type TicketCategory = 'software' | 'hardware' | 'network' | 'access' | 'other';
export type PendingSubStatus = 'awaiting-customer' | 'awaiting-third-party' | 'awaiting-maintenance' | 'awaiting-approval' | 'customer-info' | 'customer-testing' | 'third-party' | 'approval' | 'development';
export type RelatedItemType = 'incident' | 'problem' | 'change' | 'service' | 'bug' | 
                              'knownError' | 'knowledge' | 'backlogItem' | 'task' | 'backlog';
export type TicketType = 'incident' | 'service' | 'change';

// Adding TicketFilter and TestCoverageRelationship types that were referenced but missing
export type TicketFilter = {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: TicketCategory[];
  assignedTo?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchText?: string;
};

export type TestCoverageRelationship = {
  id: string;
  ticketId: string;
  testCaseId: string;
  relationshipType: 'covers' | 'affects';
  createdAt: Date;
};

export interface RelatedItem {
  id: string;
  type: RelatedItemType;
  status: string;
  title: string;
  createdAt: Date;
}

export interface TicketNote {
  id: string;
  ticketId: string;
  text: string;
  createdAt: Date;
  createdBy: string;
  isInternal: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  type: TicketType;
  audit: AuditEntry[];
  
  // Fields for pending status
  pendingSubStatus?: PendingSubStatus;
  pendingReason?: string;
  
  // Fields for resolution
  resolutionNotes?: string;
  rootCause?: string;
  resolution?: string;
  
  // Fields for reopening
  reopenReason?: string;
  reopenedAt?: Date;
  
  // Related items
  relatedItems?: RelatedItem[];
  
  // Service-specific fields
  serviceId?: string;
  requestType?: string;
  
  // Incident-specific fields
  impactLevel?: string;
  urgency?: string;
  affectedServices?: string[];
  
  // SLA information
  slaTarget?: Date;
  slaStatus?: 'within' | 'warning' | 'breached';
  firstResponseAt?: Date;
  
  // Customer information
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  
  // Additional metadata
  tags?: string[];
  attachments?: any[];
  
  // Additional properties referenced in errors
  relatedProblems?: string[];
  associatedAssets?: string[];
  notes?: TicketNote[];
}

// Extended ticket interface with notes
export interface TicketWithNotes extends Ticket {
  notes: TicketNote[];
}
