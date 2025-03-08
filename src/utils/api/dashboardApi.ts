
import { delay, createApiSuccessResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types/api';
import { CrossSystemDashboardData } from '../types/dashboard';
import { fetchTestStats } from '../mockData/testStats';
import { getBacklogStats } from '../mockData/backlog';
import { getReleaseMetrics } from './releaseApi';

// Fetch integrated dashboard data
export const fetchDashboardData = async (
  releaseId: string = 'all',
  timeRange: string = '30d'
): Promise<ApiResponse<CrossSystemDashboardData>> => {
  await delay(500);
  
  // Get data from individual domains
  const [testStats, backlogStats, releaseMetrics] = await Promise.all([
    fetchTestStats(),
    getBacklogStats(),
    getReleaseMetrics(),
  ]);
  
  // Calculate risk scores for each release
  const releaseRiskScores = [
    { releaseId: 'rel-001', title: 'Release 1.0', version: '1.0.0', riskScore: 25, status: 'In Progress' },
    { releaseId: 'rel-002', title: 'Release 1.1', version: '1.1.0', riskScore: 65, status: 'Planned' },
    { releaseId: 'rel-003', title: 'Release 2.0', version: '2.0.0', riskScore: 15, status: 'Deployed' },
  ];
  
  // Generate backlog progress data
  const backlogProgress = [
    { releaseId: 'rel-001', title: 'Release 1.0', completed: 45, inProgress: 35, notStarted: 20 },
    { releaseId: 'rel-002', title: 'Release 1.1', completed: 20, inProgress: 25, notStarted: 55 },
    { releaseId: 'rel-003', title: 'Release 2.0', completed: 85, inProgress: 10, notStarted: 5 },
  ];
  
  // Generate test metrics data
  const testMetrics = {
    testCoverage: [
      { releaseId: 'rel-001', title: 'Release 1.0', coverage: 75 },
      { releaseId: 'rel-002', title: 'Release 1.1', coverage: 45 },
      { releaseId: 'rel-003', title: 'Release 2.0', coverage: 90 },
    ],
    bugsByRelease: [
      { releaseId: 'rel-001', title: 'Release 1.0', open: 12, fixed: 8 },
      { releaseId: 'rel-002', title: 'Release 1.1', open: 5, fixed: 3 },
      { releaseId: 'rel-003', title: 'Release 2.0', open: 2, fixed: 15 },
    ],
    testEffectiveness: 0.85, // Bugs found per test case
    bugFixVelocity: 3.2, // Average days to fix a bug
  };
  
  // Generate relationships data
  const relationships = {
    nodes: [
      { id: 'releases', label: 'Releases', value: 3 },
      { id: 'backlog', label: 'Backlog Items', value: 45 },
      { id: 'testcases', label: 'Test Cases', value: 65 },
      { id: 'bugs', label: 'Bugs', value: 28 },
    ],
    links: [
      { source: 'releases', target: 'backlog', value: 45 },
      { source: 'backlog', target: 'testcases', value: 38 },
      { source: 'testcases', target: 'bugs', value: 28 },
      { source: 'bugs', target: 'backlog', value: 20 },
    ],
  };
  
  // Filter data based on releaseId if not 'all'
  if (releaseId !== 'all') {
    // Apply filtering logic here
  }
  
  const dashboardData: CrossSystemDashboardData = {
    releaseSummary: {
      totalReleases: releaseMetrics.data.totalReleases,
      upcomingReleases: releaseMetrics.data.upcomingReleases,
      releaseRiskScores: releaseRiskScores,
      completionRate: 78,
    },
    backlogProgress: backlogProgress,
    testMetrics: testMetrics,
    relationships: relationships,
  };
  
  return createApiSuccessResponse(dashboardData);
};
