
import { useQuery } from '@tanstack/react-query';
import { getTestCoverageByReleaseId, getTestExecutionProgressByReleaseId, getTestCyclesByReleaseId } from '@/utils/api/testReleaseApi';

export const useTestReleaseCoverage = (releaseId: string | undefined) => {
  // Get test coverage metrics
  const {
    data: coverageResponse,
    isLoading: isLoadingCoverage,
    error: coverageError,
    refetch: refetchCoverage
  } = useQuery({
    queryKey: ['testCoverage', releaseId],
    queryFn: () => getTestCoverageByReleaseId(releaseId || ''),
    enabled: !!releaseId
  });

  // Get test execution progress
  const {
    data: progressResponse,
    isLoading: isLoadingProgress,
    error: progressError,
    refetch: refetchProgress
  } = useQuery({
    queryKey: ['testExecutionProgress', releaseId],
    queryFn: () => getTestExecutionProgressByReleaseId(releaseId || ''),
    enabled: !!releaseId
  });

  // Get test cycles for this release
  const {
    data: cyclesResponse,
    isLoading: isLoadingCycles,
    error: cyclesError,
    refetch: refetchCycles
  } = useQuery({
    queryKey: ['testCycles', releaseId],
    queryFn: () => getTestCyclesByReleaseId(releaseId || ''),
    enabled: !!releaseId
  });

  const refetchAll = () => {
    refetchCoverage();
    refetchProgress();
    refetchCycles();
  };

  return {
    testCoverage: coverageResponse?.data,
    testProgress: progressResponse?.data || [],
    testCycles: cyclesResponse?.data || [],
    isLoading: isLoadingCoverage || isLoadingProgress || isLoadingCycles,
    error: coverageError || progressError || cyclesError,
    refetchAll
  };
};

export default useTestReleaseCoverage;
