
export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: 'ticket' | 'asset' | 'user' | 'change' | 'release' | 'problem';
  message: string;
  performedBy: string;
  timestamp: Date;
  details?: string;
  oldValue?: string;
  newValue?: string;
}
