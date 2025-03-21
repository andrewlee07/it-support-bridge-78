
export type AuditEntityType = 'problem' | 'change' | 'ticket' | 'asset' | 'user' | 'release' | 'security' | 'role' | 'group' | 'permission' | 'bug';

export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: AuditEntityType;
  action?: string;
  timestamp: Date;
  userId?: string;
  performedBy?: string;
  message?: string;
  details?: string;
  userName?: string;
  user?: string;
  oldValue?: string;
  newValue?: string;
  description?: string;
  assignedTo?: string;
}
