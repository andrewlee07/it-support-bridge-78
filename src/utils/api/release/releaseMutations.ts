import { Release, ReleaseStatus, ApiResponse, ReleaseItem } from '../../types';
import { delay, createApiErrorResponse, createApiSuccessResponse } from '../../mockData/apiHelpers';
import { v4 as uuidv4 } from 'uuid';
import { validateReleaseExists, addReleaseAuditEntry, generateReleaseId, findReleaseItemByRelation } from './releaseHelpers';
import { mockReleases as releases, mockReleaseItems } from './mockData';
import { synchronizeReleaseStatus } from '@/api/statusSynchronization';

// Reference to the mock data - we get it from mockData and update it here
// This ensures we're all working with the same data
let mockReleases = releases; 
let releaseItems = [...mockReleaseItems];

/**
 * Create a new release
 */
export const createRelease = async (
  releaseData: Omit<Release, 'id' | 'createdAt' | 'updatedAt' | 'approvalStatus' | 'items' | 'audit'>,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const newRelease: Release = {
    id: generateReleaseId(mockReleases.length),
    ...releaseData,
    createdAt: new Date(),
    updatedAt: new Date(),
    approvalStatus: 'pending',
    items: [],
    audit: [
      {
        id: uuidv4(),
        entityId: generateReleaseId(mockReleases.length),
        entityType: 'release',
        message: `Release created`,
        performedBy: userId,
        timestamp: new Date(),
      }
    ]
  };
  
  mockReleases.push(newRelease);
  
  return createApiSuccessResponse(newRelease, "Release created successfully");
};

/**
 * Update an existing release
 */
export const updateRelease = async (
  id: string,
  releaseData: Partial<Omit<Release, 'id' | 'createdAt' | 'items' | 'audit'>>,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const { exists, index } = validateReleaseExists(mockReleases, id);
  
  if (!exists) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  const updatedRelease = {
    ...mockReleases[index],
    ...releaseData,
    updatedAt: new Date()
  };
  
  // Add audit entry
  updatedRelease.audit = addReleaseAuditEntry(updatedRelease, `Release updated`, userId);
  
  mockReleases[index] = updatedRelease;
  
  return createApiSuccessResponse(updatedRelease, "Release updated successfully");
};

/**
 * Change release status
 */
export const updateReleaseStatus = async (
  id: string,
  status: ReleaseStatus,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const { exists, index } = validateReleaseExists(mockReleases, id);
  
  if (!exists) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  // Get previous status for audit
  const previousStatus = mockReleases[index].status;
  
  const updatedRelease = {
    ...mockReleases[index],
    status,
    updatedAt: new Date()
  };
  
  // Add audit entry
  updatedRelease.audit = addReleaseAuditEntry(
    updatedRelease, 
    `Release status changed from ${previousStatus} to ${status}`, 
    userId
  );
  
  mockReleases[index] = updatedRelease;
  
  // Synchronize status with linked items (if enabled in settings)
  try {
    await synchronizeReleaseStatus(id, status);
  } catch (error) {
    console.error('Failed to synchronize statuses:', error);
    // Continue with the update even if synchronization fails
  }
  
  return createApiSuccessResponse(updatedRelease, `Release status updated to ${status}`);
};

/**
 * Approve or reject a release
 */
export const updateReleaseApproval = async (
  id: string,
  approved: boolean,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const { exists, index } = validateReleaseExists(mockReleases, id);
  
  if (!exists) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  // Check if a release-manager has approved
  const currentUser = getUserById(userId);
  const isReleaseManager = currentUser?.role === 'release-manager';
  
  // If approving, validate if a release-manager has approved
  if (approved && !isReleaseManager) {
    // In a real app, we would check the approval history
    // For this mock, we'll just prevent the approval if user is not a release-manager
    return createApiErrorResponse('Release requires approval from a Release Manager', 403);
  }
  
  const updatedRelease = {
    ...mockReleases[index],
    approvalStatus: approved ? 'approved' as const : 'rejected' as const,
    approvedBy: approved ? userId : undefined,
    approvedAt: approved ? new Date() : undefined,
    updatedAt: new Date()
  };
  
  // Add audit entry
  updatedRelease.audit = addReleaseAuditEntry(
    updatedRelease, 
    `Release ${approved ? 'approved' : 'rejected'}`, 
    userId
  );
  
  mockReleases[index] = updatedRelease;
  
  return createApiSuccessResponse(updatedRelease, `Release ${approved ? 'approved' : 'rejected'} successfully`);
};

// Export mockReleases for use in other modules
export { mockReleases };

// Set mockReleases for testing/mocking
export const setMockReleases = (releases: Release[]) => {
  mockReleases = releases;
};
