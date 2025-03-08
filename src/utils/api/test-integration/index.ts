
import { TestCase } from '@/utils/types/test/testCase';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';
import { TraceabilityMatrix } from '@/utils/types/test/testCoverage';
import { ApiResponse } from '@/utils/types/api';
import {
  delay,
  createApiSuccessResponse,
  createApiErrorResponse,
  testCases,
  backlogItems,
  testBacklogRelationships
} from './common';

// Get all test cases linked to a backlog item
export const getLinkedTestCases = async (
  backlogItemId: string
): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  
  // Find all relationships for this backlog item
  const relationships = testBacklogRelationships.filter(
    rel => rel.backlogItemId === backlogItemId
  );
  
  // Get the test cases for these relationships
  const linkedTestCases = relationships.map(rel => {
    const testCase = testCases.find(tc => tc.id === rel.testCaseId);
    return testCase;
  }).filter(tc => tc !== undefined) as TestCase[];
  
  return createApiSuccessResponse(linkedTestCases);
};

// Get test coverage metrics for a backlog item
export const getBacklogItemCoverage = async (
  backlogItemId: string
): Promise<ApiResponse<BacklogTestCoverage>> => {
  await delay(500);
  
  // Find all linked test cases
  const linkedTestCasesResponse = await getLinkedTestCases(backlogItemId);
  const linkedTestCases = linkedTestCasesResponse.data;
  
  // Calculate coverage metrics
  const totalTestCases = linkedTestCases.length;
  const passedTests = linkedTestCases.filter(tc => 
    tc.status === 'pass' || tc.status === 'passed'
  ).length;
  const failedTests = linkedTestCases.filter(tc => 
    tc.status === 'fail' || tc.status === 'failed'
  ).length;
  const notExecutedTests = totalTestCases - passedTests - failedTests;
  
  // Calculate coverage percentage - for simplicity, we're just using the
  // number of test cases as a proxy for coverage
  const coveragePercentage = totalTestCases > 0 ? 
    Math.min(100, Math.round((totalTestCases / 5) * 100)) : 0;
  
  const coverage: BacklogTestCoverage = {
    totalTestCases,
    passedTests,
    failedTests,
    notExecutedTests,
    coveragePercentage,
    lastUpdated: new Date(),
    // For compatibility with TestCoverageIndicator
    total: totalTestCases > 0 ? 5 : 0, // Assuming 5 test cases would be 100% coverage
    covered: totalTestCases,
    passed: passedTests,
    failed: failedTests
  };
  
  return createApiSuccessResponse(coverage);
};

// Get all test cases not linked to a backlog item
export const getUnlinkedTestCases = async (
  backlogItemId: string
): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  
  // Get all test cases linked to this backlog item
  const linkedTestCasesResponse = await getLinkedTestCases(backlogItemId);
  const linkedTestCaseIds = linkedTestCasesResponse.data.map(tc => tc.id);
  
  // Filter out the linked test cases
  const unlinkedTestCases = testCases.filter(tc => 
    !linkedTestCaseIds.includes(tc.id)
  );
  
  return createApiSuccessResponse(unlinkedTestCases);
};

// Get traceability matrix
export const getTraceabilityMatrix = async (): Promise<ApiResponse<TraceabilityMatrix>> => {
  await delay(500);
  
  // Build the traceability matrix
  const matrix: TraceabilityMatrix = {
    backlogItems: []
  };
  
  // Group by backlog item
  for (const backlogItem of backlogItems) {
    // Get all relationships for this backlog item
    const relationships = testBacklogRelationships.filter(
      rel => rel.backlogItemId === backlogItem.id
    );
    
    // Skip if no relationships
    if (relationships.length === 0) continue;
    
    // Get the test cases for these relationships
    const testCasesForItem = relationships.map(rel => {
      const testCase = testCases.find(tc => tc.id === rel.testCaseId);
      return testCase ? {
        id: testCase.id,
        title: testCase.title,
        status: testCase.status,
        lastExecuted: testCase.lastExecutionDate
      } : undefined;
    }).filter(tc => tc !== undefined) as TraceabilityMatrix['backlogItems'][0]['testCases'];
    
    // Get linked bugs
    const linkedBugs = backlogItem.relatedBugIds?.map(bugId => ({
      id: bugId,
      title: `Bug ${bugId}`,
      status: 'open' as const
    })) || [];
    
    // Calculate coverage
    const coverage = testCasesForItem.length > 0 ? 
      Math.min(100, Math.round((testCasesForItem.length / 5) * 100)) : 0;
    
    // Add to matrix
    matrix.backlogItems.push({
      id: backlogItem.id,
      title: backlogItem.title,
      coverage,
      testCases: testCasesForItem,
      bugs: linkedBugs
    });
  }
  
  return createApiSuccessResponse(matrix);
};

// Export all functions
export { linkTestCaseToBacklogItem, unlinkTestCaseFromBacklogItem } from './testCaseLinking';
