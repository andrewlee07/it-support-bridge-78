export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: AuditEntityType;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  details?: string;
}

export type AuditEntityType = 'change' | 'ticket' | 'user' | 'asset' | 'release' | 'problem';
