
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases } from '@/utils/mockData/testData';

export const useTestCases = (options?: { enabled?: boolean, testCycleId?: string }) => {
  const { 
    data, 
    isLoading: isLoadingTestCases,
    isError,
    refetch
  } = useQuery({
    queryKey: ['testCases', options?.testCycleId],
    queryFn: fetchTestCases,
    enabled: options?.enabled !== false,
  });

  return {
    testCasesData: data?.data || [],
    isLoadingTestCases,
    isError,
    refetch
  };
};
