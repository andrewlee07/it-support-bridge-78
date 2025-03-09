
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
}
