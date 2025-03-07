import { v4 as uuidv4 } from 'uuid';
import { 
  Release, 
  ReleaseItem, 
  ReleaseStatus, 
  ReleaseType, 
  AuditEntry,
  ApiResponse,
  PaginatedResponse
} from '../types';
import { mockUsers } from '../mockData/users';
import { mockTickets } from '../mockData/tickets';
import { mockChangeRequests } from '../mockData/changeManagement';
import { delay, createApiErrorResponse, createApiSuccessResponse } from '../mockData/apiHelpers';
import { createAuditEntry } from '../mockData/auditHelpers';

// Mock releases data
let mockReleases: Release[] = [
  {
    id: "REL-1001",
    title: "Website Modernization",
    version: "2.0.0",
    type: "major",
    description: "Major release with new UI components and improved user experience",
    plannedDate: new Date(2023, 11, 15),
    status: "Planned",
    owner: mockUsers[0].id,
    createdAt: new Date(2023, 10, 1),
    updatedAt: new Date(2023, 10, 1),
    approvalStatus: "pending",
    items: [],
    audit: []
  },
  {
    id: "REL-1002",
    title: "Security Patch Release",
    version: "1.5.3",
    type: "patch",
    description: "Critical security updates and bug fixes",
    plannedDate: new Date(2023, 10, 20),
    status: "In Progress",
    owner: mockUsers[1].id,
    createdAt: new Date(2023, 10, 5),
    updatedAt: new Date(2023, 10, 12),
    approvalStatus: "approved",
    approvedBy: mockUsers[0].id,
    approvedAt: new Date(2023, 10, 6),
    items: [],
    audit: []
  },
  {
    id: "REL-1003",
    title: "Feature Enhancement Pack",
    version: "1.6.0",
    type: "minor",
    description: "New features including enhanced reporting capabilities",
    plannedDate: new Date(2023, 11, 30),
    status: "Planned",
    owner: mockUsers[2].id,
    createdAt: new Date(2023, 10, 8),
    updatedAt: new Date(2023, 10, 8),
    approvalStatus: "pending",
    items: [],
    audit: []
  },
  {
    id: "REL-1004",
    title: "Database Optimization",
    version: "1.5.4",
    type: "patch",
    description: "Performance improvements for database queries",
    plannedDate: new Date(2023, 9, 25),
    status: "Deployed",
    owner: mockUsers[1].id,
    createdAt: new Date(2023, 9, 10),
    updatedAt: new Date(2023, 9, 26),
    approvalStatus: "approved",
    approvedBy: mockUsers[0].id,
    approvedAt: new Date(2023, 9, 15),
    items: [],
    audit: []
  },
  {
    id: "REL-1005",
    title: "Emergency Hotfix",
    version: "1.5.2.1",
    type: "emergency",
    description: "Critical bug fix for login functionality",
    plannedDate: new Date(2023, 9, 12),
    status: "Deployed",
    owner: mockUsers[0].id,
    createdAt: new Date(2023, 9, 11),
    updatedAt: new Date(2023, 9, 12),
    approvalStatus: "approved",
    approvedBy: mockUsers[0].id,
    approvedAt: new Date(2023, 9, 11),
    items: [],
    audit: []
  }
];

// Initialize with some demo release items
let mockReleaseItems: ReleaseItem[] = [
  {
    id: uuidv4(),
    releaseId: "REL-1001",
    itemId: mockChangeRequests[0].id,
    itemType: "change",
    addedAt: new Date(2023, 10, 2),
    addedBy: mockUsers[0].id
  },
  {
    id: uuidv4(),
    releaseId: "REL-1001",
    itemId: mockChangeRequests[1].id,
    itemType: "change",
    addedAt: new Date(2023, 10, 3),
    addedBy: mockUsers[0].id
  },
  {
    id: uuidv4(),
    releaseId: "REL-1002",
    itemId: mockChangeRequests[2].id,
    itemType: "change",
    addedAt: new Date(2023, 10, 6),
    addedBy: mockUsers[1].id
  },
  {
    id: uuidv4(),
    releaseId: "REL-1004",
    itemId: mockTickets[0].id,
    itemType: "incident",
    addedAt: new Date(2023, 9, 11),
    addedBy: mockUsers[1].id
  }
];

// Add items to the releases
mockReleases = mockReleases.map(release => {
  const items = mockReleaseItems.filter(item => item.releaseId === release.id);
  return {
    ...release,
    items
  };
});

// Get all releases with optional filtering
export const getReleases = async (
  status?: ReleaseStatus,
  searchQuery?: string
): Promise<ApiResponse<Release[]>> => {
  await delay();
  
  let filteredReleases = [...mockReleases];
  
  if (status) {
    filteredReleases = filteredReleases.filter(release => release.status === status);
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredReleases = filteredReleases.filter(release => 
      release.title.toLowerCase().includes(query) || 
      release.version.toLowerCase().includes(query) ||
      release.description.toLowerCase().includes(query)
    );
  }
  
  return createApiSuccessResponse(filteredReleases);
};

// Get a single release by ID
export const getReleaseById = async (id: string): Promise<ApiResponse<Release>> => {
  await delay();
  
  const release = mockReleases.find(release => release.id === id);
  
  if (!release) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  return createApiSuccessResponse(release);
};

// Create a new release
export const createRelease = async (
  releaseData: Omit<Release, 'id' | 'createdAt' | 'updatedAt' | 'approvalStatus' | 'items' | 'audit'>,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const newRelease: Release = {
    id: `REL-${1006 + mockReleases.length}`,
    ...releaseData,
    createdAt: new Date(),
    updatedAt: new Date(),
    approvalStatus: 'pending',
    items: [],
    audit: [
      createAuditEntry({
        entityId: `REL-${1006 + mockReleases.length}`,
        entityType: 'release',
        message: `Release created`,
        performedBy: userId
      })
    ]
  };
  
  mockReleases.push(newRelease);
  
  return createApiSuccessResponse(newRelease, "Release created successfully");
};

// Update an existing release
export const updateRelease = async (
  id: string,
  releaseData: Partial<Omit<Release, 'id' | 'createdAt' | 'items' | 'audit'>>,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const releaseIndex = mockReleases.findIndex(release => release.id === id);
  
  if (releaseIndex === -1) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  const updatedRelease = {
    ...mockReleases[releaseIndex],
    ...releaseData,
    updatedAt: new Date()
  };
  
  // Add audit entry
  const auditEntry = createAuditEntry({
    entityId: id,
    entityType: 'release',
    message: `Release updated`,
    performedBy: userId
  });
  
  updatedRelease.audit = [...updatedRelease.audit, auditEntry];
  
  mockReleases[releaseIndex] = updatedRelease;
  
  return createApiSuccessResponse(updatedRelease, "Release updated successfully");
};

// Change release status
export const updateReleaseStatus = async (
  id: string,
  status: ReleaseStatus,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const releaseIndex = mockReleases.findIndex(release => release.id === id);
  
  if (releaseIndex === -1) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  const updatedRelease = {
    ...mockReleases[releaseIndex],
    status,
    updatedAt: new Date()
  };
  
  // Add audit entry
  const auditEntry = createAuditEntry({
    entityId: id,
    entityType: 'release',
    message: `Release status changed to ${status}`,
    performedBy: userId
  });
  
  updatedRelease.audit = [...updatedRelease.audit, auditEntry];
  
  mockReleases[releaseIndex] = updatedRelease;
  
  return createApiSuccessResponse(updatedRelease, `Release status updated to ${status}`);
};

// Approve or reject a release
export const updateReleaseApproval = async (
  id: string,
  approved: boolean,
  userId: string
): Promise<ApiResponse<Release>> => {
  await delay();
  
  const releaseIndex = mockReleases.findIndex(release => release.id === id);
  
  if (releaseIndex === -1) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  const updatedRelease = {
    ...mockReleases[releaseIndex],
    approvalStatus: approved ? 'approved' as const : 'rejected' as const,
    approvedBy: approved ? userId : undefined,
    approvedAt: approved ? new Date() : undefined,
    updatedAt: new Date()
  };
  
  // Add audit entry
  const auditEntry = createAuditEntry({
    entityId: id,
    entityType: 'release',
    message: `Release ${approved ? 'approved' : 'rejected'}`,
    performedBy: userId
  });
  
  updatedRelease.audit = [...updatedRelease.audit, auditEntry];
  
  mockReleases[releaseIndex] = updatedRelease;
  
  return createApiSuccessResponse(updatedRelease, `Release ${approved ? 'approved' : 'rejected'} successfully`);
};

// Add an item to a release
export const addItemToRelease = async (
  releaseId: string,
  itemId: string,
  itemType: 'change' | 'incident' | 'asset',
  userId: string
): Promise<ApiResponse<ReleaseItem>> => {
  await delay();
  
  const release = mockReleases.find(release => release.id === releaseId);
  
  if (!release) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  // Check if item already exists in the release
  const existingItem = mockReleaseItems.find(
    item => item.releaseId === releaseId && item.itemId === itemId && item.itemType === itemType
  );
  
  if (existingItem) {
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
  
  mockReleaseItems.push(newItem);
  
  // Update the release's items
  const releaseIndex = mockReleases.findIndex(r => r.id === releaseId);
  mockReleases[releaseIndex].items.push(newItem);
  
  // Add audit entry
  const auditEntry = createAuditEntry({
    entityId: releaseId,
    entityType: 'release',
    message: `Added ${itemType} (${itemId}) to release`,
    performedBy: userId
  });
  
  mockReleases[releaseIndex].audit.push(auditEntry);
  
  return createApiSuccessResponse(newItem, `Item added to release successfully`);
};

// Remove an item from a release
export const removeItemFromRelease = async (
  releaseId: string,
  itemId: string,
  userId: string
): Promise<ApiResponse<void>> => {
  await delay();
  
  const release = mockReleases.find(release => release.id === releaseId);
  
  if (!release) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  // Find the item to remove
  const itemIndex = mockReleaseItems.findIndex(
    item => item.releaseId === releaseId && item.id === itemId
  );
  
  if (itemIndex === -1) {
    return createApiErrorResponse("Item not found in this release", 404);
  }
  
  const removedItem = mockReleaseItems[itemIndex];
  
  // Remove the item from mockReleaseItems
  mockReleaseItems.splice(itemIndex, 1);
  
  // Update the release's items
  const releaseIndex = mockReleases.findIndex(r => r.id === releaseId);
  mockReleases[releaseIndex].items = mockReleases[releaseIndex].items.filter(
    item => item.id !== itemId
  );
  
  // Add audit entry
  const auditEntry = createAuditEntry({
    entityId: releaseId,
    entityType: 'release',
    message: `Removed ${removedItem.itemType} (${removedItem.itemId}) from release`,
    performedBy: userId
  });
  
  mockReleases[releaseIndex].audit.push(auditEntry);
  
  return createApiSuccessResponse(undefined, `Item removed from release successfully`);
};

// Get release metrics
export const getReleaseMetrics = async (): Promise<ApiResponse<any>> => {
  await delay();
  
  const statusCounts = {
    Planned: mockReleases.filter(r => r.status === 'Planned').length,
    'In Progress': mockReleases.filter(r => r.status === 'In Progress').length,
    Deployed: mockReleases.filter(r => r.status === 'Deployed').length,
    Cancelled: mockReleases.filter(r => r.status === 'Cancelled').length
  };
  
  const typeCounts = {
    major: mockReleases.filter(r => r.type === 'major').length,
    minor: mockReleases.filter(r => r.type === 'minor').length,
    patch: mockReleases.filter(r => r.type === 'patch').length,
    emergency: mockReleases.filter(r => r.type === 'emergency').length
  };
  
  const metrics = {
    totalReleases: mockReleases.length,
    statusCounts,
    typeCounts,
    upcomingReleases: mockReleases
      .filter(r => r.status === 'Planned' && new Date(r.plannedDate) > new Date())
      .length,
    deployedThisMonth: mockReleases
      .filter(r => {
        const now = new Date();
        const releaseDate = new Date(r.plannedDate);
        return r.status === 'Deployed' && 
              releaseDate.getMonth() === now.getMonth() && 
              releaseDate.getFullYear() === now.getFullYear();
      })
      .length
  };
  
  return createApiSuccessResponse(metrics);
};

export default {
  getReleases,
  getReleaseById,
  createRelease,
  updateRelease,
  updateReleaseStatus,
  updateReleaseApproval,
  addItemToRelease,
  removeItemFromRelease,
  getReleaseMetrics
};
