
// Audit trail
export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: 'ticket' | 'asset' | 'user' | 'change' | 'release';
  message: string;
  performedBy: string;
  timestamp: Date;
}
