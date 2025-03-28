
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
  // New fields for routing
  routingInfo?: {
    priority?: 'low' | 'medium' | 'high' | 'critical';
    audience?: string[];
    shouldEscalate?: boolean;
    channelPreferences?: string[];
  };
}

/**
 * Routing rules types for known error events
 */
export interface KnownErrorRoutingRule {
  id: string;
  name: string;
  description?: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
  targetChannels: string[];
  isActive: boolean;
  priority: number;
}

/**
 * Schedule-based routing for known error events
 */
export interface KnownErrorScheduleRule {
  id: string;
  name: string;
  description?: string;
  timeWindows: Array<{
    startTime: string;
    endTime: string;
    daysOfWeek: number[];
  }>;
  timezone: string;
  targetChannels: string[];
  fallbackChannels?: string[];
  isActive: boolean;
}

/**
 * Recipient mapping for known error events
 */
export interface KnownErrorRecipientMapping {
  id: string;
  eventType: KnownErrorEventType;
  severity: string;
  recipients: string[];
  recipientGroups: string[];
  isActive: boolean;
}
