
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../../mockData/apiHelpers';
import { ApiResponse } from '../../types';
import { testCycles } from '../../mockData/testCycles';
import { testExecutions } from '../../mockData/testExecutions';
import { getTestCasesByReleaseId } from './testCaseMethods';
import { ReleaseCoverage } from './types';

// Get test coverage metrics for a specific release
export const getTestCoverageByReleaseId = async (releaseId: string): Promise<ApiResponse<ReleaseCoverage>> => {
  await delay(500);
  
  // Get all test cases for the release
  const testCasesResponse = await getTestCasesByReleaseId(releaseId);
  if (!testCasesResponse.success) {
    return createApiErrorResponse('Failed to get test cases for release', 500);
  }
  
  const testCasesForRelease = testCasesResponse.data;
  
  // Get all test executions for test cases in this release
  const releaseCycles = testCycles.filter(cycle => cycle.releaseId === releaseId);
  const releaseTestCaseIds = testCasesForRelease.map(tc => tc.id);
  
  // Filter executions for this release's test cases
  const releaseExecutions = testExecutions.filter(exec => 
    releaseTestCaseIds.includes(exec.testCaseId) &&
    releaseCycles.some(cycle => cycle.id === exec.testCycleId)
  );
  
  // Calculate metrics
  const totalTestCases = testCasesForRelease.length;
  const passedTests = releaseExecutions.filter(exec => exec.status === 'pass' || exec.status === 'passed').length;
  const failedTests = releaseExecutions.filter(exec => exec.status === 'fail' || exec.status === 'failed').length;
  const blockedTests = releaseExecutions.filter(exec => exec.status === 'blocked').length;
  const executedTests = passedTests + failedTests + blockedTests;
  const notRunTests = totalTestCases - executedTests;
  
  // Calculate coverage percentage
  const coveragePercentage = totalTestCases > 0 ? Math.round((executedTests / totalTestCases) * 100) : 0;
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'high';
  if (coveragePercentage >= 80 && failedTests === 0) {
    riskLevel = 'low';
  } else if (coveragePercentage >= 60 && failedTests <= Math.floor(totalTestCases * 0.1)) {
    riskLevel = 'medium';
  }
  
  // Determine readiness status
  let readiness: 'go' | 'no-go' | 'warning' = 'no-go';
  if (coveragePercentage >= 90 && failedTests === 0) {
    readiness = 'go';
  } else if (coveragePercentage >= 70 && failedTests <= Math.floor(totalTestCases * 0.05)) {
    readiness = 'warning';
  }
  
  const coverage: ReleaseCoverage = {
    releaseId,
    totalTestCases,
    passedTests,
    failedTests,
    blockedTests,
    notRunTests,
    coveragePercentage,
    riskLevel,
    readiness
  };
  
  return createApiSuccessResponse(coverage);
};
