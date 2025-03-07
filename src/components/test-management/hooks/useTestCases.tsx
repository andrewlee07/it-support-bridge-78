
import { useQuery } from '@tanstack/react-query';
import { fetchTestCases } from '@/utils/mockData/testData';

export const useTestCases = () => {
  const { 
    data: testCasesData, 
    isLoading: isLoadingTestCases,
    isError,
    refetch
  } = useQuery({
    queryKey: ['testCases'],
    queryFn: fetchTestCases,
  });

  return {
    testCasesData,
    isLoadingTestCases,
    isError,
    refetch
  };
};
