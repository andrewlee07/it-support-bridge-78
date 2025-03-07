
import { Release, ReleaseStatus, ApiResponse } from '../../types';
import { delay, createApiErrorResponse, createApiSuccessResponse } from '../../mockData/apiHelpers';
import { initializedReleases } from './mockData';

// Reference to the mock data
let mockReleases = [...initializedReleases];

/**
 * Get all releases with optional filtering
 */
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

/**
 * Get a single release by ID
 */
export const getReleaseById = async (id: string): Promise<ApiResponse<Release>> => {
  await delay();
  
  const release = mockReleases.find(release => release.id === id);
  
  if (!release) {
    return createApiErrorResponse("Release not found", 404);
  }
  
  return createApiSuccessResponse(release);
};

/**
 * Get release metrics
 */
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

// Export mockReleases for use in other modules
export { mockReleases };

// Set mockReleases for testing/mocking
export const setMockReleases = (releases: Release[]) => {
  mockReleases = releases;
};
