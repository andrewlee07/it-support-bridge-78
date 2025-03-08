
import { useQuery } from '@tanstack/react-query';
import { 
  getLinkedTestCases, 
  getBacklogItemCoverage, 
  getUnlinkedTestCases 
} from '@/utils/api/test-integration';
import type { TestCase } from '@/utils/types/test';
import type { BacklogTestCoverage } from '@/utils/types/backlogTypes';

/**
 * Custom hook to handle all test coverage related data fetching for backlog items
 */
export const useBacklogTestCoverage = (backlogItemId: string) => {
  // Fetch linked test cases
  const {
    data: linkedTestCasesData,
    isLoading: isLoadingLinkedTestCases,
    error: linkedTestCasesError,
    refetch: refetchLinkedTestCases
  } = useQuery({
    queryKey: ['linkedTestCases', backlogItemId],
    queryFn: () => getLinkedTestCases(backlogItemId),
    enabled: !!backlogItemId
  });

  // Fetch coverage statistics
  const {
    data: coverageData,
    isLoading: isLoadingCoverage,
    error: coverageError,
    refetch: refetchCoverage
  } = useQuery({
    queryKey: ['backlogCoverage', backlogItemId],
    queryFn: () => getBacklogItemCoverage(backlogItemId),
    enabled: !!backlogItemId
  });

  // Fetch unlinked test cases
  const {
    data: unlinkedTestCasesData,
    isLoading: isLoadingUnlinkedTestCases,
    error: unlinkedTestCasesError,
    refetch: refetchUnlinkedTestCases
  } = useQuery({
    queryKey: ['unlinkedTestCases', backlogItemId],
    queryFn: () => getUnlinkedTestCases(backlogItemId),
    enabled: !!backlogItemId
  });

  // Function to refetch all data
  const refetchAll = () => {
    refetchLinkedTestCases();
    refetchCoverage();
    refetchUnlinkedTestCases();
  };

  return {
    // Linked test cases
    linkedTestCases: linkedTestCasesData?.data || [],
    isLoadingLinkedTestCases,
    linkedTestCasesError,
    
    // Coverage data
    coverage: coverageData?.data,
    isLoadingCoverage,
    coverageError,
    
    // Unlinked test cases
    unlinkedTestCases: unlinkedTestCasesData?.data || [],
    isLoadingUnlinkedTestCases,
    unlinkedTestCasesError,
    
    // Refetch functions
    refetchLinkedTestCases,
    refetchCoverage,
    refetchUnlinkedTestCases,
    refetchAll,
    
    // Loading state for all data
    isLoading: isLoadingLinkedTestCases || isLoadingCoverage || isLoadingUnlinkedTestCases
  };
};

export default useBacklogTestCoverage;
