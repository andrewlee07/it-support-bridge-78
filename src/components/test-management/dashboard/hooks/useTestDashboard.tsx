
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestStats, fetchBugs, fetchTestCases } from '@/utils/mockData/testData';
import { TestStatus } from '@/utils/types/test/testStatus';
import { ApiResponse } from '@/utils/types/api';
import { TestManagementStats } from '@/utils/types/test/testCoverage';
import { Bug } from '@/utils/types/test/bug';
import { TestCase } from '@/utils/types/test/testCase';

interface TestDashboardResult {
  // Filters
  statusFilter: TestStatus | null;
  handleStatusFilter: (status: TestStatus | null) => void;
  
  // Test stats data
  testStatsData: ApiResponse<TestManagementStats> | undefined;
  isLoadingTestStats: boolean;
  
  // Bugs data
  bugsData: ApiResponse<Bug[]> | undefined;
  isLoadingBugs: boolean;
  
  // Test cases data
  testCasesData: ApiResponse<TestCase[]> | undefined;
  isLoadingTestCases: boolean;
}

/**
 * Hook for managing test dashboard data and filters
 * Fetches test statistics, bugs, and filtered test cases
 */
export const useTestDashboard = (): TestDashboardResult => {
  const [statusFilter, setStatusFilter] = useState<TestStatus | null>(null);

  // Fetch test stats
  const { 
    data: testStatsData, 
    isLoading: isLoadingTestStats 
  } = useQuery({
    queryKey: ['testStats'],
    queryFn: fetchTestStats,
  });

  // Fetch bugs for recent bugs section
  const { 
    data: bugsData, 
    isLoading: isLoadingBugs 
  } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  // Fetch test cases with optional status filter
  const { 
    data: testCasesData, 
    isLoading: isLoadingTestCases 
  } = useQuery({
    queryKey: ['testCases', statusFilter],
    queryFn: () => fetchTestCases(statusFilter),
  });

  // Handler for applying status filter from the chart
  const handleStatusFilter = (status: TestStatus | null) => {
    setStatusFilter(status);
  };

  return {
    statusFilter,
    handleStatusFilter,
    testStatsData,
    isLoadingTestStats,
    bugsData,
    isLoadingBugs,
    testCasesData,
    isLoadingTestCases,
  };
};
