
import { AuditEntry } from './audit';

export type TicketType = 'incident' | 'service' | 'problem' | 'change' | 'security';
export type TicketPriority = 'critical' | 'high' | 'medium' | 'low' | 'P1' | 'P2' | 'P3' | 'P4';
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'security' | 'other' | 'data-breach' | 'sar';
export type TicketStatus = 'open' | 'in-progress' | 'on-hold' | 'resolved' | 'closed' | 'new' | 'approved' | 'fulfilled' | 'pending';

export type PendingSubStatus = 'awaiting-approval' | 'awaiting-customer' | 'awaiting-third-party' | 'awaiting-parts';

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
  
  // Added properties for ChangeRequest compatibility
  createdBy?: string;
  audit?: AuditEntry[];
  
  // Added properties for security tickets
  securityClassification?: 'public' | 'internal' | 'confidential' | 'restricted';
  breachType?: string;
  dataSubjects?: string;
  reportedToAuthorities?: boolean;
  reportedDate?: Date;
  sarRequestType?: string;
  dpaRequired?: boolean;
  
  // Service-related properties
  serviceId?: string;
  
  // Relations
  relatedItems?: RelatedItem[];
  relatedProblems?: string[];
  associatedAssets?: string[];
  affectedServices?: string[];
  
  // Incident-specific properties
  impactLevel?: string;
  urgency?: string;
  firstResponseAt?: Date;
  
  // Customer-related
  customerId?: string;
  
  // Notes
  notes?: TicketNote[];
}

export interface TicketNote {
  id: string;
  ticketId: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  isPrivate: boolean;
}

export interface TicketWithNotes extends Ticket {
  notes: TicketNote[];
}

export interface RelatedItem {
  id: string;
  title: string;
  type: string;
  status: string;
  relationship: string;
  createdAt?: Date;
}

export interface TicketUpdatePayload {
  priority?: TicketPriority;
  category?: TicketCategory;
  status?: TicketStatus;
  assignedTo?: string;
  description?: string;
}
