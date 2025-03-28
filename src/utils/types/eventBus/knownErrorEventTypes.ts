
/**
 * Known Error specific event types
 */

export type KnownErrorEventType =
  | 'knownError.created'
  | 'knownError.updated'
  | 'knownError.workaroundUpdated'
  | 'knownError.planToFix'
  | 'knownError.resolved';

export interface KnownErrorCreatedEvent {
  id: string;
  title: string;
  description: string;
  problemId?: string;
  category?: string;
  severity?: string;
  affectedServices?: string[];
  createdBy: string;
  createdAt: string;
}

export interface KnownErrorUpdatedEvent {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  severity?: string;
  affectedServices?: string[];
  updatedBy: string;
  updatedAt: string;
  changes?: Record<string, any>;
}

export interface KnownErrorWorkaroundEvent {
  id: string;
  workaround: string;
  updatedBy: string;
  updatedAt: string;
  previousWorkaround?: string;
}

export interface KnownErrorPlanToFixEvent {
  id: string;
  fixPlan: string;
  estimatedFixDate?: string;
  assignedTo?: string;
  updatedBy: string;
  updatedAt: string;
}

export interface KnownErrorResolvedEvent {
  id: string;
  resolutionSummary: string;
  resolvedBy: string;
  resolvedAt: string;
  fixedInVersion?: string;
  relatedChangeId?: string;
}

/**
 * Common interface for known error event data
 */
export interface KnownErrorEventData {
  id: string;
  knownErrorId: string;
  title: string;
  description?: string;
  status?: 'active' | 'resolved';
  severity?: string;
  category?: string;
  workaround?: string;
  permanentFix?: string;
  scheduledFixDate?: string;
  resolution?: string;
  problemId?: string;
  relatedIncidents?: string[];
  affectedServices?: string[];
  updatedFields?: string[];
  tenantId?: string;
}
