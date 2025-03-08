
import { v4 as uuidv4 } from 'uuid';
import { AuditEntry, AuditEntityType } from './types/audit';

/**
 * Creates a new audit entry
 * 
 * @param entityId - The ID of the entity (ticket, asset, change request, etc.)
 * @param entityType - The type of entity
 * @param message - The audit message
 * @param performedBy - The ID of the user who performed the action
 * @returns The created audit entry
 */
export const createAuditEntry = (
  entityId: string,
  entityType: AuditEntityType,
  message: string,
  performedBy: string
): AuditEntry => {
  return {
    id: uuidv4(),
    entityId,
    entityType,
    message,
    performedBy,
    timestamp: new Date(),
    action: message.split(':')[0]
  };
};

/**
 * Adds an audit entry to an existing array of entries
 * 
 * @param existingEntries - The existing audit entries
 * @param entityId - The ID of the entity
 * @param entityType - The type of entity
 * @param message - The audit message
 * @param performedBy - The ID of the user who performed the action
 * @returns The updated array of audit entries
 */
export const addAuditEntry = (
  existingEntries: AuditEntry[],
  entityId: string,
  entityType: AuditEntityType,
  message: string,
  performedBy: string
): AuditEntry[] => {
  return [
    ...existingEntries,
    createAuditEntry(entityId, entityType, message, performedBy)
  ];
};
