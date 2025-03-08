
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases } from '@/utils/mockData/testData';
import { TestCase } from '@/utils/types/test/testCase';

export interface UseTestCasesOptions {
  enabled?: boolean;
  testCycleId?: string;
}

/**
 * Hook for fetching and processing test cases data
 * @param options Optional configuration including enabled flag and test cycle ID for filtering
 * @returns Processed test cases data and query state
 */
export const useTestCases = (options?: UseTestCasesOptions) => {
  const { 
    data, 
    isLoading: isLoadingTestCases,
    isError,
    refetch
  } = useQuery({
    queryKey: ['testCases', options?.testCycleId],
    queryFn: async () => {
      return fetchTestCases();
    },
    enabled: options?.enabled !== false,
  });

  // Ensure we return an array of TestCase objects with proper date handling
  const testCasesData: TestCase[] = data?.data 
    ? data.data.map((tc: any) => ({
        ...tc,
        stepsToReproduce: tc.stepsToReproduce || tc.steps || [],
        expectedResults: tc.expectedResults || tc.expectedResult || '',
        createdAt: tc.createdAt instanceof Date ? tc.createdAt : new Date(tc.createdAt),
        updatedAt: tc.updatedAt instanceof Date ? tc.updatedAt : new Date(tc.updatedAt)
      }))
    : [];

  return {
    testCasesData,
    isLoadingTestCases,
    isError,
    refetch
  };
};
