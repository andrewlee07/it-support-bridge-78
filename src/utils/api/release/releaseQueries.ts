

import { ApiResponse, Release, ReleaseStatus, ReleaseMetrics, ReleaseType } from '@/utils/types';
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
export const getReleaseMetrics = async (): Promise<ApiResponse<ReleaseMetrics>> => {
  await delay();
  
  // Calculate some basic metrics
  const totalReleases = mockReleases.length;
  const deployedReleases = mockReleases.filter(r => r.status === 'Deployed').length;
  const pendingReleases = mockReleases.filter(r => r.status !== 'Deployed' && r.status !== 'Cancelled').length;
  const cancelledReleases = mockReleases.filter(r => r.status === 'Cancelled').length;
  
  // Calculate type-based counts
  const releasesByType = {
    major: mockReleases.filter(r => r.type === 'major').length,
    minor: mockReleases.filter(r => r.type === 'minor').length,
    patch: mockReleases.filter(r => r.type === 'patch').length,
    emergency: mockReleases.filter(r => r.type === 'emergency').length,
  };

  // Calculate status counts
  const statusCounts = {
    'Planned': mockReleases.filter(r => r.status === 'Planned').length,
    'In Progress': mockReleases.filter(r => r.status === 'In Progress').length,
    'Deployed': deployedReleases,
    'Cancelled': cancelledReleases
  };

  // Get current date for calculating deployedThisMonth
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Calculate deployed this month
  const deployedThisMonth = mockReleases.filter(r => {
    const deployDate = new Date(r.updatedAt);
    return r.status === 'Deployed' && 
           deployDate.getMonth() === currentMonth && 
           deployDate.getFullYear() === currentYear;
  }).length;

  // Calculate upcoming releases (planned for future date)
  const upcomingReleases = mockReleases.filter(r => {
    if (r.status === 'Deployed' || r.status === 'Cancelled') return false;
    const plannedDate = new Date(r.plannedDate);
    return plannedDate > now;
  }).length;
  
  const metrics: ReleaseMetrics = {
    totalReleases,
    deployedReleases,
    pendingReleases,
    cancelledReleases,
    releasesByType,
    releasesByMonth: [
      { month: 'Jan', count: 2 },
      { month: 'Feb', count: 3 },
      { month: 'Mar', count: 1 },
      { month: 'Apr', count: 4 },
      { month: 'May', count: 2 },
      { month: 'Jun', count: 3 }
    ],
    successRate: deployedReleases / (deployedReleases + cancelledReleases) * 100,
    // Add the new required properties
    statusCounts,
    typeCounts: releasesByType,
    upcomingReleases,
    deployedThisMonth
  };
  
  return createApiSuccessResponse(metrics);
};

// Export mockReleases for usage in other modules
export { mockReleases };

