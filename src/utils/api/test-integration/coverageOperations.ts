import { delay, createApiSuccessResponse } from './common';
import { ApiResponse } from '@/utils/types/api';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';

export const getTestCoverageForBacklogItem = async (backlogItemId: string): Promise<ApiResponse<BacklogTestCoverage>> => {
  await delay(500);
  
  // Generate test coverage data
  const coverage: BacklogTestCoverage = {
    totalTests: 10,
    passedTests: 7,
    failedTests: 2,
    skippedTests: 1,
    lastRun: new Date(),
    
    // Backward compatibility fields
    totalTestCases: 10,
    notExecutedTests: 1,
    coveragePercentage: 70,
    lastUpdated: new Date(),
    
    // For compatibility with TestCoverageIndicator
    total: 10,
    covered: 9,
    passed: 7,
    failed: 2
  };
  
  return createApiSuccessResponse(coverage);
};
