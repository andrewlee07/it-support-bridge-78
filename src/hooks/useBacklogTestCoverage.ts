
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getLinkedTestCases, 
  getBacklogItemCoverage, 
  getUnlinkedTestCases,
  unlinkTestCaseFromBacklogItem
} from '@/utils/api/test-integration';
import type { TestCase } from '@/utils/types/test';
import type { BacklogTestCoverage } from '@/utils/types/backlogTypes';

/**
 * Custom hook to handle all test coverage related data fetching for backlog items
 */
export const useBacklogTestCoverage = (backlogItemId: string) => {
  const queryClient = useQueryClient();
  
  // Fetch linked test cases
  const {
    data: linkedTestCasesData,
    isLoading: isLoadingLinkedTestCases,
    error: linkedTestCasesError,
    refetch: refetchLinkedTestCases,
    isFetching: isFetchingLinkedTestCases
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
    refetch: refetchCoverage,
    isFetching: isFetchingCoverage
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
    refetch: refetchUnlinkedTestCases,
    isFetching: isFetchingUnlinkedTestCases
  } = useQuery({
    queryKey: ['unlinkedTestCases', backlogItemId],
    queryFn: () => getUnlinkedTestCases(backlogItemId),
    enabled: !!backlogItemId
  });

  // Function to unlink a test case from a backlog item
  const unlinkTestCase = async (testCaseId: string) => {
    const result = await unlinkTestCaseFromBacklogItem(backlogItemId, testCaseId);
    if (result.success) {
      await queryClient.invalidateQueries({ queryKey: ['linkedTestCases', backlogItemId] });
      await queryClient.invalidateQueries({ queryKey: ['unlinkedTestCases', backlogItemId] });
      await queryClient.invalidateQueries({ queryKey: ['backlogCoverage', backlogItemId] });
    }
    return result;
  };

  // Function to refetch all data
  const refreshTestCases = async () => {
    await Promise.all([
      refetchLinkedTestCases(),
      refetchCoverage(),
      refetchUnlinkedTestCases()
    ]);
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
    refreshTestCases,
    
    // Loading state for all data
    isLoading: isLoadingLinkedTestCases || isLoadingCoverage || isLoadingUnlinkedTestCases,
    isFetching: isFetchingLinkedTestCases || isFetchingCoverage || isFetchingUnlinkedTestCases,
    
    // Unlink function
    unlinkTestCase
  };
};

export default useBacklogTestCoverage;
