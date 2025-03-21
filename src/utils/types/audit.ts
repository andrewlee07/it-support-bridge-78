export type AuditEntityType = 'problem' | 'change' | 'ticket' | 'asset' | 'user' | 'release' | 'security';

export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: AuditEntityType;
  action: string;
  timestamp: Date;
  userId: string;
  details?: string;
}
