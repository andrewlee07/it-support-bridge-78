
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestStats, fetchBugs, fetchTestCases } from '@/utils/mockData/testData';
import { TestStatus } from '@/utils/types/testTypes';

export const useTestDashboard = () => {
  const [statusFilter, setStatusFilter] = useState<TestStatus | null>(null);

  // Fetch test stats
  const { data: testStatsData, isLoading: isLoadingTestStats } = useQuery({
    queryKey: ['testStats'],
    queryFn: fetchTestStats,
  });

  // Fetch bugs for recent bugs section
  const { data: bugsData, isLoading: isLoadingBugs } = useQuery({
    queryKey: ['bugs'],
    queryFn: fetchBugs,
  });

  // Fetch test cases (we'll use this for filtered test cases by status)
  const { data: testCasesData, isLoading: isLoadingTestCases } = useQuery({
    queryKey: ['testCases', statusFilter],
    queryFn: () => fetchTestCases(),
  });

  // Filter handler for the status chart
  const handleStatusFilter = (status: TestStatus | null) => {
    setStatusFilter(status);
  };

  return {
    statusFilter,
    testStatsData,
    isLoadingTestStats,
    bugsData,
    isLoadingBugs,
    testCasesData,
    isLoadingTestCases,
    handleStatusFilter,
  };
};
