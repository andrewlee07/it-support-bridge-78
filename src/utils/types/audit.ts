
export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: AuditEntityType;
  timestamp: Date;
  userId?: string;
  userName?: string;
  
  // Add properties that are being used in various components
  performedBy?: string;
  message?: string;
  action?: string;
  details?: string;
  
  // Additional fields used in problem management
  newValue?: string;
  oldValue?: string;
  user?: string;
  description?: string;
  assignedTo?: string;
}

export type AuditEntityType = 'change' | 'ticket' | 'user' | 'asset' | 'release' | 'problem' | 'group' | 'role' | 'permission';

