
import {
  delay,
  createApiSuccessResponse,
  testCases,
  backlogItems,
  testBacklogRelationships,
  ApiResponse,
  BacklogTestCoverage
} from './common';

// Get test coverage for a backlog item
export const getTestCoverageForBacklogItem = async (
  backlogItemId: string
): Promise<ApiResponse<BacklogTestCoverage>> => {
  await delay(500);
  
  // Get related test cases
  const testCaseIds = testBacklogRelationships
    .filter(rel => rel.backlogItemId === backlogItemId)
    .map(rel => rel.testCaseId);
  
  if (testCaseIds.length === 0) {
    return createApiSuccessResponse({
      totalTestCases: 0,
      passedTests: 0,
      failedTests: 0,
      notExecutedTests: 0,
      coveragePercentage: 0,
      lastUpdated: new Date()
    });
  }
  
  const relatedTestCases = testCases.filter(tc => testCaseIds.includes(tc.id));
  
  // Calculate coverage metrics
  const totalTestCases = relatedTestCases.length;
  const passedTests = relatedTestCases.filter(tc => 
    tc.status === 'pass' || tc.status === 'passed'
  ).length;
  const failedTests = relatedTestCases.filter(tc => 
    tc.status === 'fail' || tc.status === 'failed'
  ).length;
  const notExecutedTests = totalTestCases - passedTests - failedTests;
  
  // Coverage percentage - based on how many tests have been executed
  const executedTests = passedTests + failedTests;
  const coveragePercentage = totalTestCases > 0 
    ? Math.round((executedTests / totalTestCases) * 100) 
    : 0;
  
  const coverage: BacklogTestCoverage = {
    totalTestCases,
    passedTests,
    failedTests,
    notExecutedTests,
    coveragePercentage,
    lastUpdated: new Date()
  };
  
  // Update backlog item with coverage
  const backlogItemIndex = backlogItems.findIndex(bi => bi.id === backlogItemId);
  if (backlogItemIndex >= 0) {
    backlogItems[backlogItemIndex] = {
      ...backlogItems[backlogItemIndex],
      testCoverage: coverage
    };
  }
  
  return createApiSuccessResponse(coverage);
};

// Update all backlog test coverage metrics
export const updateAllBacklogTestCoverage = async (): Promise<ApiResponse<boolean>> => {
  await delay(500);
  
  // Get all backlog items with test relationships
  const backlogItemIds = [...new Set(testBacklogRelationships.map(rel => rel.backlogItemId))];
  
  // Update each backlog item's test coverage
  for (const backlogItemId of backlogItemIds) {
    await getTestCoverageForBacklogItem(backlogItemId);
  }
  
  return createApiSuccessResponse(true);
};
