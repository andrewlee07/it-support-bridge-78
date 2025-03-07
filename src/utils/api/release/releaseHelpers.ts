
import { v4 as uuidv4 } from 'uuid';
import { Release, ReleaseItem, AuditEntry } from '../../types';
import { createApiErrorResponse, createApiSuccessResponse } from '../../mockData/apiHelpers';
import { createAuditEntry } from '../../mockData/auditHelpers';

// Helper functions for release management

/**
 * Validate if a release exists in the collection
 */
export const validateReleaseExists = (
  releases: Release[],
  id: string
) => {
  const releaseIndex = releases.findIndex(release => release.id === id);
  
  if (releaseIndex === -1) {
    return { exists: false, index: -1 };
  }
  
  return { exists: true, index: releaseIndex };
};

/**
 * Create an audit entry for a release
 */
export const addReleaseAuditEntry = (
  release: Release,
  message: string,
  userId: string
): AuditEntry[] => {
  const auditEntry = createAuditEntry({
    entityId: release.id,
    entityType: 'release',
    message,
    performedBy: userId
  });
  
  return [...release.audit, auditEntry];
};

/**
 * Find a release item in a collection
 */
export const findReleaseItem = (
  items: ReleaseItem[],
  releaseId: string,
  itemId: string
) => {
  const itemIndex = items.findIndex(
    item => item.releaseId === releaseId && item.id === itemId
  );
  
  if (itemIndex === -1) {
    return { exists: false, index: -1 };
  }
  
  return { exists: true, index: itemIndex, item: items[itemIndex] };
};

/**
 * Find a release item by its relation to another item
 */
export const findReleaseItemByRelation = (
  items: ReleaseItem[],
  releaseId: string,
  itemId: string, 
  itemType: 'change' | 'incident' | 'asset'
) => {
  const existingItem = items.find(
    item => item.releaseId === releaseId && item.itemId === itemId && item.itemType === itemType
  );
  
  if (!existingItem) {
    return { exists: false };
  }
  
  return { exists: true, item: existingItem };
};

/**
 * Generate a new release ID
 */
export const generateReleaseId = (currentCount: number): string => {
  return `REL-${1006 + currentCount}`;
};
