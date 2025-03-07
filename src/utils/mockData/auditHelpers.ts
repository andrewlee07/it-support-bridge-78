
import { AuditEntry } from '../types';

// Mock audit trail entries helper function
export const createAuditEntries = (entityId: string, entityType: 'ticket' | 'asset' | 'user' | 'change', createdBy: string): AuditEntry[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  return [
    {
      id: `audit-${entityId}-1`,
      entityId,
      entityType,
      message: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} created`,
      performedBy: createdBy,
      timestamp: yesterday,
    },
    {
      id: `audit-${entityId}-2`,
      entityId,
      entityType,
      message: 'Status changed to in-progress',
      performedBy: 'user-2',
      timestamp: new Date(yesterday.getTime() + 3600000), // 1 hour later
    },
  ];
};
