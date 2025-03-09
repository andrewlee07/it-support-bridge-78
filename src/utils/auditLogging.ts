
import { User } from '@/utils/types/user';
import { AuditEntry } from '@/utils/types/audit';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for audit logs (in a real app, this would be sent to a secure backend)
let auditLogs: AuditEntry[] = [];

interface AuditLogOptions {
  user?: User | null;
  entityId: string;
  entityType: string;
  action: string;
  details?: string;
  oldValue?: string;
  newValue?: string;
}

/**
 * Log an admin action to the audit trail
 */
export const logAdminAction = (options: AuditLogOptions): AuditEntry => {
  const { user, entityId, entityType, action, details, oldValue, newValue } = options;
  
  const entry: AuditEntry = {
    id: uuidv4(),
    entityId,
    entityType,
    timestamp: new Date(),
    userId: user?.id,
    userName: user?.name,
    action,
    details,
    oldValue,
    newValue,
    performedBy: user?.name || 'Unknown user'
  };
  
  // In a production environment, this would be sent to a secure audit log service
  console.log(`[AUDIT] ${entry.action} on ${entry.entityType} by ${entry.performedBy}`);
  auditLogs.push(entry);
  
  return entry;
};

/**
 * Get all audit logs
 */
export const getAuditLogs = (): AuditEntry[] => {
  return [...auditLogs];
};

/**
 * Filter audit logs based on criteria
 */
export const filterAuditLogs = (filters: {
  entityType?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  action?: string;
}): AuditEntry[] => {
  return auditLogs.filter(log => {
    if (filters.entityType && log.entityType !== filters.entityType) return false;
    if (filters.userId && log.userId !== filters.userId) return false;
    if (filters.action && log.action !== filters.action) return false;
    
    if (filters.startDate && log.timestamp < filters.startDate) return false;
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (log.timestamp > endDate) return false;
    }
    
    return true;
  });
};

/**
 * Clear all audit logs (mainly for testing)
 */
export const clearAuditLogs = (): void => {
  auditLogs = [];
};
