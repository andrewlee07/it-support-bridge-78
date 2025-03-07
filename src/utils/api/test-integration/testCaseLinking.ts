
import {
  delay,
  createApiSuccessResponse,
  createApiErrorResponse,
  testCases,
  backlogItems,
  testBacklogRelationships,
  ApiResponse,
  TestCoverageRelationship
} from './common';

// Link a test case to a backlog item
export const linkTestCaseToBacklogItem = async (
  testCaseId: string,
  backlogItemId: string,
  coverageType: 'direct' | 'indirect' = 'direct'
): Promise<ApiResponse<TestCoverageRelationship>> => {
  await delay(500);
  
  // Check if test case exists
  const testCase = testCases.find(tc => tc.id === testCaseId);
  if (!testCase) {
    return createApiErrorResponse('Test case not found', 404);
  }
  
  // Check if backlog item exists
  const backlogItem = backlogItems.find(bi => bi.id === backlogItemId);
  if (!backlogItem) {
    return createApiErrorResponse('Backlog item not found', 404);
  }
  
  // Check if relationship already exists
  const existingRelationship = testBacklogRelationships.find(
    rel => rel.testCaseId === testCaseId && rel.backlogItemId === backlogItemId
  );
  
  if (existingRelationship) {
    return createApiErrorResponse('Relationship already exists', 400);
  }
  
  // Create new relationship
  const newRelationship: TestCoverageRelationship = {
    backlogItemId,
    testCaseId,
    coverageType,
    createdAt: new Date(),
  };
  
  testBacklogRelationships.push(newRelationship);
  
  // Update test case
  const testCaseIndex = testCases.findIndex(tc => tc.id === testCaseId);
  if (testCaseIndex >= 0) {
    testCases[testCaseIndex] = {
      ...testCases[testCaseIndex],
      relatedBacklogItemIds: [
        ...(testCases[testCaseIndex].relatedBacklogItemIds || []),
        backlogItemId
      ]
    };
  }
  
  // Update backlog item
  const backlogItemIndex = backlogItems.findIndex(bi => bi.id === backlogItemId);
  if (backlogItemIndex >= 0) {
    backlogItems[backlogItemIndex] = {
      ...backlogItems[backlogItemIndex],
      relatedTestCaseIds: [
        ...(backlogItems[backlogItemIndex].relatedTestCaseIds || []),
        testCaseId
      ]
    };
  }
  
  return createApiSuccessResponse(newRelationship);
};

// Unlink a test case from a backlog item
export const unlinkTestCaseFromBacklogItem = async (
  testCaseId: string,
  backlogItemId: string
): Promise<ApiResponse<boolean>> => {
  await delay(500);
  
  // Remove relationship
  const initialLength = testBacklogRelationships.length;
  testBacklogRelationships = testBacklogRelationships.filter(
    rel => !(rel.testCaseId === testCaseId && rel.backlogItemId === backlogItemId)
  );
  
  const removed = initialLength > testBacklogRelationships.length;
  
  if (!removed) {
    return createApiErrorResponse('Relationship not found', 404);
  }
  
  // Update test case
  const testCaseIndex = testCases.findIndex(tc => tc.id === testCaseId);
  if (testCaseIndex >= 0 && testCases[testCaseIndex].relatedBacklogItemIds) {
    testCases[testCaseIndex] = {
      ...testCases[testCaseIndex],
      relatedBacklogItemIds: testCases[testCaseIndex].relatedBacklogItemIds?.filter(
        id => id !== backlogItemId
      )
    };
  }
  
  // Update backlog item
  const backlogItemIndex = backlogItems.findIndex(bi => bi.id === backlogItemId);
  if (backlogItemIndex >= 0 && backlogItems[backlogItemIndex].relatedTestCaseIds) {
    backlogItems[backlogItemIndex] = {
      ...backlogItems[backlogItemIndex],
      relatedTestCaseIds: backlogItems[backlogItemIndex].relatedTestCaseIds?.filter(
        id => id !== testCaseId
      )
    };
  }
  
  return createApiSuccessResponse(true);
};
