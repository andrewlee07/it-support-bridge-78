
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases } from '@/utils/mockData/testData';

export const useTestCases = (options?: { enabled?: boolean, testCycleId?: string }) => {
  const { 
    data: testCasesData, 
    isLoading: isLoadingTestCases,
    isError,
    refetch
  } = useQuery({
    queryKey: ['testCases', options?.testCycleId],
    queryFn: fetchTestCases,
    enabled: options?.enabled !== false,
  });

  return {
    testCasesData: testCasesData?.data || [],
    isLoadingTestCases,
    isError,
    refetch
  };
};
