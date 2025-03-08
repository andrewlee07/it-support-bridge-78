// Base ticket types
export type TicketStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed' | 'approved' | 'fulfilled';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4' | 'medium'; // Added 'medium' for compatibility
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';
export type TicketType = 'incident' | 'service' | 'change';

// New type for pending sub-statuses
export type PendingSubStatus = 'customer-info' | 'customer-testing' | 'third-party' | 'approval' | 'development';

import { AuditEntry } from './audit';
import { TestCase } from './test';
import { BacklogItem } from './backlogTypes';
import { Bug } from './test/bug';

export interface TicketNote {
  id: string;
  text: string;
  createdAt: Date;
  createdBy: string;
  isInternal: boolean;
}

export interface RelatedItem {
  id: string;
  type: 'bug' | 'backlogItem';
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
  type: TicketType;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  reopenedAt?: Date;
  dueDate?: Date;
  slaBreachAt?: Date;
  notes?: TicketNote[];
  audit: AuditEntry[];
  // Related items (bugs or backlog items created from this ticket)
  relatedItems?: RelatedItem[];
  // Additional metadata fields that don't conflict with the base type
  _rootCause?: string;
  _closureReason?: string;
  _reopenReason?: string;
  _closeNotes?: string;
  // Pending sub-status
  pendingSubStatus?: PendingSubStatus;
  // SLA pause tracking
  slaResponsePausedAt?: Date;
  slaResolutionPausedAt?: Date;
  slaTotalPausedDuration?: number; // In milliseconds
  // First response tracking
  firstResponseAt?: Date;
}

// Filter and search
export interface TicketFilter {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: TicketCategory[];
  type?: TicketType[];
  assignedTo?: string;
  createdBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

// Test coverage relationship
export interface TestCoverageRelationship {
  backlogItemId: string;
  testCaseId: string;
  coverageType: 'direct' | 'indirect';
  createdAt: Date;
}
