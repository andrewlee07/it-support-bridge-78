
import { delay, createApiSuccessResponse } from '../../mockData/apiHelpers';
import { ApiResponse } from '../../types';
import { TestExecutionForRelease } from '../../types/test';
import { testCycles } from '../../mockData/testCycles';
import { testExecutions } from '../../mockData/testExecutions';

// Get test execution progress for a specific release
export const getTestExecutionProgressByReleaseId = async (releaseId: string): Promise<ApiResponse<TestExecutionForRelease[]>> => {
  await delay(500);
  
  // Get all test cycles for the release
  const releaseCycles = testCycles.filter(cycle => cycle.releaseId === releaseId);
  
  if (releaseCycles.length === 0) {
    return createApiSuccessResponse([]);
  }
  
  // Calculate execution progress for each test cycle
  const executionProgress: TestExecutionForRelease[] = [];
  
  for (const cycle of releaseCycles) {
    const cycleExecutions = testExecutions.filter(exec => exec.testCycleId === cycle.id);
    
    const totalTestCases = cycle.testCases.length;
    const totalExecuted = cycleExecutions.length;
    const passed = cycleExecutions.filter(exec => exec.status === 'pass' || exec.status === 'passed').length;
    const failed = cycleExecutions.filter(exec => exec.status === 'fail' || exec.status === 'failed').length;
    const blocked = cycleExecutions.filter(exec => exec.status === 'blocked').length;
    
    const progress = totalTestCases > 0 ? Math.round((totalExecuted / totalTestCases) * 100) : 0;
    
    executionProgress.push({
      releaseId,
      testCycleId: cycle.id,
      totalExecuted,
      passed,
      failed,
      blocked,
      progress
    });
  }
  
  return createApiSuccessResponse(executionProgress);
};
