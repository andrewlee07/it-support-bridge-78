
import {
  delay,
  createApiSuccessResponse,
  testCases,
  bugs,
  backlogItems,
  testBacklogRelationships,
  ApiResponse
} from './common';
import { TraceabilityMatrix } from '../../types/test/testCoverage';

// Get traceability matrix
export const getTraceabilityMatrix = async (): Promise<ApiResponse<TraceabilityMatrix>> => {
  await delay(500);
  
  const matrix: TraceabilityMatrix = {
    backlogItems: []
  };
  
  // Process all backlog items
  for (const backlogItem of backlogItems) {
    // Get related test cases
    const testCaseIds = testBacklogRelationships
      .filter(rel => rel.backlogItemId === backlogItem.id)
      .map(rel => rel.testCaseId);
    
    const relatedTestCases = testCases
      .filter(tc => testCaseIds.includes(tc.id))
      .map(tc => ({
        id: tc.id,
        title: tc.title,
        status: tc.status,
        lastExecuted: new Date() // In a real app, this would be the actual last execution date
      }));
    
    // Get related bugs
    const relatedBugs = bugs
      .filter(bug => bug.backlogItemId === backlogItem.id || (backlogItem.relatedBugIds || []).includes(bug.id))
      .map(bug => ({
        id: bug.id,
        title: bug.title,
        status: bug.status
      }));
    
    // Calculate coverage
    const totalTests = relatedTestCases.length;
    const executedTests = relatedTestCases.filter(tc => 
      tc.status === 'pass' || tc.status === 'fail' || tc.status === 'passed' || tc.status === 'failed'
    ).length;
    
    const coverage = totalTests > 0 ? Math.round((executedTests / totalTests) * 100) : 0;
    
    matrix.backlogItems.push({
      id: backlogItem.id,
      title: backlogItem.title,
      coverage,
      testCases: relatedTestCases,
      bugs: relatedBugs
    });
  }
  
  return createApiSuccessResponse(matrix);
};
