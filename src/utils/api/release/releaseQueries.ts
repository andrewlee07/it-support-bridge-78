
import { ApiResponse, Release, ReleaseStatus } from '@/utils/types';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../../mockData/apiHelpers';
import { mockReleases } from './mockData';

// Get all releases
export const getReleases = async (): Promise<ApiResponse<Release[]>> => {
  await delay();
  return createApiSuccessResponse(mockReleases);
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

// Get release metrics (placeholder for actual metrics calculation)
export const getReleaseMetrics = async (): Promise<ApiResponse<any>> => {
  await delay();
  
  // Calculate some basic metrics
  const totalReleases = mockReleases.length;
  const deployedReleases = mockReleases.filter(r => r.status === 'Deployed').length;
  const pendingReleases = mockReleases.filter(r => r.status !== 'Deployed' && r.status !== 'Cancelled').length;
  const cancelledReleases = mockReleases.filter(r => r.status === 'Cancelled').length;
  
  const metrics = {
    totalReleases,
    deployedReleases,
    pendingReleases,
    cancelledReleases,
    releasesByMonth: [
      { month: 'Jan', count: 2 },
      { month: 'Feb', count: 3 },
      { month: 'Mar', count: 1 },
      { month: 'Apr', count: 4 },
      { month: 'May', count: 2 },
      { month: 'Jun', count: 3 }
    ],
    successRate: deployedReleases / (deployedReleases + cancelledReleases) * 100
  };
  
  return createApiSuccessResponse(metrics);
};

// Export mockReleases for usage in other modules
export { mockReleases };
