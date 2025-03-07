
import { ReleaseItem, ApiResponse } from '../../types';
import { delay, createApiErrorResponse, createApiSuccessResponse } from '../../mockData/apiHelpers';
import { v4 as uuidv4 } from 'uuid';
import { validateReleaseExists, addReleaseAuditEntry, findReleaseItem, findReleaseItemByRelation } from './releaseHelpers';
import { mockReleases as releases, mockReleaseItems } from './mockData';

// Reference to the mock data
let mockReleases = releases;
let releaseItems = [...mockReleaseItems];

/**
 * Add an item to a release
 */
export const addItemToRelease = async (
  releaseId: string,
  itemId: string,
  itemType: 'change' | 'incident' | 'asset',
  userId: string
): Promise<ApiResponse<ReleaseItem>> => {
  await delay();
  
  const { exists, index } = validateReleaseExists(mockReleases, releaseId);
  
  if (!exists) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  // Check if item already exists in the release
  const existingItemCheck = findReleaseItemByRelation(releaseItems, releaseId, itemId, itemType);
  
  if (existingItemCheck.exists) {
    return createApiErrorResponse("Item already exists in this release", 400);
  }
  
  const newItem: ReleaseItem = {
    id: uuidv4(),
    releaseId,
    itemId,
    itemType,
    addedAt: new Date(),
    addedBy: userId
  };
  
  releaseItems.push(newItem);
  
  // Update the release's items
  const releaseIndex = mockReleases.findIndex(r => r.id === releaseId);
  mockReleases[releaseIndex].items.push(newItem);
  
  // Add audit entry
  mockReleases[releaseIndex].audit = addReleaseAuditEntry(
    mockReleases[releaseIndex],
    `Added ${itemType} (${itemId}) to release`,
    userId
  );
  
  return createApiSuccessResponse(newItem, `Item added to release successfully`);
};

/**
 * Remove an item from a release
 */
export const removeItemFromRelease = async (
  releaseId: string,
  itemId: string,
  userId: string
): Promise<ApiResponse<void>> => {
  await delay();
  
  const { exists, index } = validateReleaseExists(mockReleases, releaseId);
  
  if (!exists) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  // Find the item to remove
  const itemResult = findReleaseItem(releaseItems, releaseId, itemId);
  
  if (!itemResult.exists) {
    return createApiErrorResponse("Item not found in this release", 404);
  }
  
  // Remove the item from releaseItems
  releaseItems.splice(itemResult.index, 1);
  
  // Update the release's items
  const releaseIndex = mockReleases.findIndex(r => r.id === releaseId);
  mockReleases[releaseIndex].items = mockReleases[releaseIndex].items.filter(
    item => item.id !== itemId
  );
  
  // Add audit entry
  mockReleases[releaseIndex].audit = addReleaseAuditEntry(
    mockReleases[releaseIndex],
    `Removed ${itemResult.item.itemType} (${itemResult.item.itemId}) from release`,
    userId
  );
  
  return createApiSuccessResponse(undefined, `Item removed from release successfully`);
};

// Export mockReleases and releaseItems for use in other modules
export { mockReleases, releaseItems };

// Set mockReleases and releaseItems for testing/mocking
export const setMockData = (releases: typeof mockReleases, items: typeof releaseItems) => {
  mockReleases = releases;
  releaseItems = items;
};
