
export type AuditEntityType = string;

export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
  action: string;
  details?: string;
  oldValue?: string;
  newValue?: string;
  performedBy: string;
  // Additional fields needed by components
  message?: string;        // Used by several components for display
  description?: string;    // Used by ProblemActivity
  user?: string;           // Used by ProblemActivity
  assignedTo?: string;     // Used by ProblemActivity
}
