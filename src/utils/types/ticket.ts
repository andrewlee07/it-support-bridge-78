import { AuditEntry } from './audit';

export type TicketStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed' | 'fulfilled';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4';
export type TicketCategory = 'software' | 'hardware' | 'network' | 'access' | 'other';
export type PendingSubStatus = 'awaiting-customer' | 'awaiting-third-party' | 'awaiting-maintenance' | 'awaiting-approval';
export type RelatedItemType = 'incident' | 'problem' | 'change' | 'service' | 'bug' | 
                              'knownError' | 'knowledge' | 'backlogItem' | 'task';

export interface RelatedItem {
  id: string;
  type: RelatedItemType;
  status: string;
  title: string;
  createdAt: Date;
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
  type: 'incident' | 'service';
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
  
  // Customer information
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  
  // Additional metadata
  tags?: string[];
  attachments?: any[];
}
