
// Base ticket types
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed' | 'approved' | 'fulfilled';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4' | 'medium'; // Added 'medium' for compatibility
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';
export type TicketType = 'incident' | 'service' | 'change';

import { AuditEntry } from './audit';
import { TestCase } from './test';
import { BacklogItem } from './backlogTypes';

export interface TicketNote {
  id: string;
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
  // Additional metadata fields that don't conflict with the base type
  _rootCause?: string;
  _closureReason?: string;
  _reopenReason?: string;
  _closeNotes?: string;
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
