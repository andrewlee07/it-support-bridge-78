import { AuditEntry } from './audit';
import { Ticket, TicketCategory, PendingSubStatus } from './ticket';

// Problem management specific types
export type ProblemStatus = 'new' | 'under-investigation' | 'root-cause-identified' | 'known-error' | 'resolved' | 'closed' | 'pending';
export type ProblemPriority = 'P1' | 'P2' | 'P3';

export interface Problem {
  id: string;
  title: string;
  description: string;
  status: ProblemStatus;
  priority: ProblemPriority;
  category: TicketCategory;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  audit: AuditEntry[];
  
  // Problem-specific fields
  relatedIncidents?: string[];
  rootCause?: string;
  workaround?: string;
  resolutionPlan?: string;
  closureNotes?: string;
  resolutionStatus?: 'resolved' | 'known-error';
  resolutionDescription?: string;
  
  // Known Error fields
  knownErrorId?: string;
  symptoms?: string;
  affectedServices?: string[];
  
  // Pending status fields
  pendingSubStatus?: PendingSubStatus;
  reopenReason?: string;
  reopenedAt?: Date;
  
  // Associated assets and services
  associatedAssets?: string[];
  associatedServices?: string[];
}

export interface RelatedIncident {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: Date;
}

export interface KnownError {
  id: string;
  problemId: string;
  title: string;
  description: string;
  symptoms: string;
  workaround: string;
  affectedServices: string[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
