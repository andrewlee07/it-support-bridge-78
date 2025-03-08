
import {
  delay,
  createApiSuccessResponse,
  createApiErrorResponse,
  testCases,
  backlogItems,
  testBacklogRelationships,
  ApiResponse
} from './common';
import { TestCase } from '../../types/test';
import { BacklogTestCoverage } from '../../types/backlogTypes';

// Get all test cases linked to a backlog item
export const getLinkedTestCases = async (backlogItemId: string): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  
  // Find all relationships for this backlog item
  const relationships = testBacklogRelationships.filter(rel => rel.backlogItemId === backlogItemId);
  
  if (relationships.length === 0) {
    return createApiSuccessResponse([]);
  }
  
  // Get test case IDs from relationships
  const testCaseIds = relationships.map(rel => rel.testCaseId);
  
  // Find the test cases
  const linkedTestCases = testCases.filter(tc => testCaseIds.includes(tc.id));
  
  return createApiSuccessResponse(linkedTestCases);
};

// Get coverage statistics for a backlog item
export const getBacklogItemCoverage = async (backlogItemId: string): Promise<ApiResponse<BacklogTestCoverage>> => {
  await delay(500);
  
  // Find all relationships for this backlog item
  const relationships = testBacklogRelationships.filter(rel => rel.backlogItemId === backlogItemId);
  
  // Get total number of test cases linked to this backlog item
  const totalTestCases = relationships.length;
  
  // Mock data for test execution status (in a real system, this would be fetched from test runs)
  const passedTests = Math.floor(totalTestCases * 0.7); // 70% of tests are passed
  const failedTests = Math.floor(totalTestCases * 0.2); // 20% are failed
  const notExecutedTests = totalTestCases - passedTests - failedTests; // Remaining are not executed
  
  // Calculate coverage percentage
  const coveragePercentage = totalTestCases > 0 ? Math.round((passedTests + failedTests) * 100 / totalTestCases) : 0;
  
  // Create coverage object
  const coverage: BacklogTestCoverage = {
    totalTestCases,
    passedTests,
    failedTests,
    notExecutedTests,
    coveragePercentage,
    lastUpdated: new Date()
  };
  
  return createApiSuccessResponse(coverage);
};

// Mock data for unlinked test cases
export const getUnlinkedTestCases = async (backlogItemId: string): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  
  // Find all relationships for this backlog item
  const relationships = testBacklogRelationships.filter(rel => rel.backlogItemId === backlogItemId);
  
  // Get test case IDs from relationships
  const linkedTestCaseIds = relationships.map(rel => rel.testCaseId);
  
  // Find test cases not linked to this backlog item
  const unlinkedTestCases = testCases.filter(tc => !linkedTestCaseIds.includes(tc.id));
  
  return createApiSuccessResponse(unlinkedTestCases);
};
