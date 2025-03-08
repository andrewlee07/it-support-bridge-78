
// Audit trail
export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: 'ticket' | 'asset' | 'user' | 'change' | 'release' | 'problem';
  message: string;
  performedBy: string;
  timestamp: Date;
  details?: string;
  newValue?: string;
  oldValue?: string;
}
