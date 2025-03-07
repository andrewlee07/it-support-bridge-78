
// Base ticket types
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed' | 'approved' | 'fulfilled';
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4';
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';
export type TicketType = 'incident' | 'service' | 'change';

import { AuditEntry } from './audit';
import { TestCase } from './testTypes';
import { BacklogItem } from './backlogTypes';

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
  dueDate?: Date;
  slaBreachAt?: Date;
  audit: AuditEntry[];
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

// Test coverage metrics
export interface BacklogTestCoverage {
  backlogItemId: string;
  totalTestCases: number;
  passedTests: number;
  failedTests: number;
  notExecutedTests: number;
  coveragePercentage: number;
}
