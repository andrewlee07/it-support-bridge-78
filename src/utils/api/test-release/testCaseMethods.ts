
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../../mockData/apiHelpers';
import { ApiResponse } from '../../types';
import { TestCase } from '../../types/test';
import { testCases } from '../../mockData/testCases';
import { testCycles } from '../../mockData/testCycles';

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
