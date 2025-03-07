
import {
  delay,
  createApiSuccessResponse,
  testCases,
  backlogItems,
  testBacklogRelationships,
  ApiResponse,
  TestCase,
  BacklogItem
} from './common';

// Get test cases for a backlog item
export const getTestCasesForBacklogItem = async (
  backlogItemId: string
): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  
  const relationshipIds = testBacklogRelationships
    .filter(rel => rel.backlogItemId === backlogItemId)
    .map(rel => rel.testCaseId);
    
  const relatedTestCases = testCases.filter(tc => relationshipIds.includes(tc.id));
  
  return createApiSuccessResponse(relatedTestCases);
};

// Get backlog items for a test case
export const getBacklogItemsForTestCase = async (
  testCaseId: string
): Promise<ApiResponse<BacklogItem[]>> => {
  await delay(500);
  
  const relationshipIds = testBacklogRelationships
    .filter(rel => rel.testCaseId === testCaseId)
    .map(rel => rel.backlogItemId);
    
  const relatedBacklogItems = backlogItems.filter(bi => relationshipIds.includes(bi.id));
  
  return createApiSuccessResponse(relatedBacklogItems);
};
