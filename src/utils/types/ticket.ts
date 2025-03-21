import { AuditEntry } from './audit';

export type TicketStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed' | 'fulfilled' | 'new' | 'approved' | 'on-hold';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4' | 'high' | 'medium' | 'low';
export type TicketCategory = 'software' | 'hardware' | 'network' | 'access' | 'other' | 'security' | 'data-breach' | 'sar';
export type PendingSubStatus = 'awaiting-customer' | 'awaiting-third-party' | 'awaiting-maintenance' | 'awaiting-approval' | 'customer-info' | 'customer-testing' | 'third-party' | 'approval' | 'development';
export type RelatedItemType = 'incident' | 'problem' | 'change' | 'service' | 'bug' | 
                              'knownError' | 'knowledge' | 'backlogItem' | 'task' | 'backlog' | 'security';
export type TicketType = 'incident' | 'service' | 'change' | 'security';

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
  relatedProblems?: string[];
  associatedAssets?: string[];
  notes?: TicketNote[];
  
  // Watch list functionality
  watchers?: string[];

  // Security-specific fields
  securityClassification?: 'public' | 'internal' | 'confidential' | 'restricted';
  dataSubjects?: number;
  breachType?: 'data-loss' | 'unauthorized-access' | 'system-compromise' | 'phishing' | 'malware' | 'other';
  sarRequestType?: 'access' | 'rectification' | 'erasure' | 'portability' | 'objection';
  dpaRequired?: boolean;
  reportedToAuthorities?: boolean;
  reportedDate?: Date;
}

// Extended ticket interface with notes
export interface TicketWithNotes extends Ticket {
  notes: TicketNote[];
}
