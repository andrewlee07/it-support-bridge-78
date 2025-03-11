
import { delay, createApiSuccessResponse } from '@/utils/mockData/apiHelpers';
import { ApiResponse } from '@/utils/types/api';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';

// Get the test coverage for a backlog item
export const getBacklogItemTestCoverage = async (
  backlogItemId: string
): Promise<ApiResponse<BacklogTestCoverage>> => {
  // Mock implementation - generate random coverage data
  const totalTestCases = Math.floor(Math.random() * 10) + 5; // 5-15 test cases
  const passedTests = Math.floor(Math.random() * totalTestCases);
  const failedTests = Math.floor(Math.random() * (totalTestCases - passedTests));
  const notExecutedTests = totalTestCases - passedTests - failedTests;
  
  // Build the coverage object
  const coverage: BacklogTestCoverage = {
    totalTests: totalTestCases,
    passedTests,
    failedTests,
    skippedTests: notExecutedTests,
    lastRun: new Date(),
    
    // Backward compatibility fields
    totalTestCases,
    notExecutedTests, 
    coveragePercentage: Math.round((passedTests / totalTestCases) * 100),
    lastUpdated: new Date(),
    
    // For compatibility with TestCoverageIndicator
    total: totalTestCases,
    covered: passedTests + failedTests,
    passed: passedTests,
    failed: failedTests
  };
  
  return createApiSuccessResponse(coverage);
};
