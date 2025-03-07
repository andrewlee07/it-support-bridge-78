
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types';
import { TestCycle, TestCase, TestCoverage, TestExecutionForRelease } from '../types/testTypes';
import { testCycles, createTestCycle } from '../mockData/testCycles';
import { testCases } from '../mockData/testCases';
import { testExecutions } from '../mockData/testExecutions';
import { getReleaseById } from './release/releaseQueries';

// Create a new test cycle for a specific release
export const createTestCycleForRelease = async (
  releaseId: string,
  testCycleData: Omit<TestCycle, 'id' | 'createdAt' | 'updatedAt' | 'releaseId'>
): Promise<ApiResponse<TestCycle>> => {
  await delay(500);
  
  // Check if release exists
  const releaseResponse = await getReleaseById(releaseId);
  if (!releaseResponse.success) {
    return createApiErrorResponse('Release not found', 404);
  }
  
  // Create the test cycle with the release ID
  const newTestCycle = {
    ...testCycleData,
    releaseId,
  };
  
  return createTestCycle(newTestCycle);
};

// Get all test cycles for a specific release
export const getTestCyclesByReleaseId = async (releaseId: string): Promise<ApiResponse<TestCycle[]>> => {
  await delay(500);
  
  const releaseCycles = testCycles.filter(cycle => cycle.releaseId === releaseId);
  return createApiSuccessResponse(releaseCycles);
};

// Get all test cases applicable to a specific release
export const getTestCasesByReleaseId = async (releaseId: string): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  
  // Get test cases directly linked to the release
  const releaseCases = testCases.filter(testCase => testCase.releaseId === releaseId);
  
  // Also get test cases that are part of test cycles linked to the release
  const releaseCycles = testCycles.filter(cycle => cycle.releaseId === releaseId);
  const cycleTestCaseIds = releaseCycles.flatMap(cycle => cycle.testCases);
  
  // Combine and deduplicate
  const allTestCases = [...releaseCases];
  
  for (const testCaseId of cycleTestCaseIds) {
    const testCase = testCases.find(tc => tc.id === testCaseId);
    if (testCase && !allTestCases.some(tc => tc.id === testCaseId)) {
      allTestCases.push(testCase);
    }
  }
  
  return createApiSuccessResponse(allTestCases);
};

// Get test coverage metrics for a specific release
export const getTestCoverageByReleaseId = async (releaseId: string): Promise<ApiResponse<TestCoverage>> => {
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
  
  const coverage: TestCoverage = {
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

// Set a test case as applicable to a specific release
export const setTestCaseApplicableToRelease = async (
  testCaseId: string,
  releaseId: string,
  applicable: boolean
): Promise<ApiResponse<boolean>> => {
  await delay(500);
  
  const testCaseIndex = testCases.findIndex(tc => tc.id === testCaseId);
  if (testCaseIndex === -1) {
    return createApiErrorResponse('Test case not found', 404);
  }
  
  // Update the test case
  testCases[testCaseIndex] = {
    ...testCases[testCaseIndex],
    releaseId: applicable ? releaseId : undefined,
    applicable: applicable
  };
  
  return createApiSuccessResponse(true);
};
