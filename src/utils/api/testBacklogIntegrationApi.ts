
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../mockData/apiHelpers';
import { ApiResponse } from '../types';
import { TestCase, Bug, TestStatus, BugStatus, TraceabilityMatrix } from '../types/testTypes';
import { BacklogItem, BacklogTestCoverage, TraceabilityMapping } from '../types/backlogTypes';
import { testCases } from '../mockData/testCases';
import { bugs } from '../mockData/bugs';
import { backlogItems } from '../mockData/backlogItems';
import { TestCoverageRelationship } from '../types/ticket';

// Mock storage for relationships
let testBacklogRelationships: TestCoverageRelationship[] = [
  {
    backlogItemId: 'BLGI-1001',
    testCaseId: 'tc-1',
    coverageType: 'direct',
    createdAt: new Date('2023-11-01'),
  },
  {
    backlogItemId: 'BLGI-1002',
    testCaseId: 'tc-2',
    coverageType: 'direct',
    createdAt: new Date('2023-11-02'),
  },
];

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

// Create a bug from a failed test execution
export const createBugFromTestExecution = async (
  testCaseId: string,
  failureDetails: {
    description: string;
    severity: Bug['severity'];
    priority: Bug['priority'];
  }
): Promise<ApiResponse<Bug>> => {
  await delay(500);
  
  // Check if test case exists
  const testCase = testCases.find(tc => tc.id === testCaseId);
  if (!testCase) {
    return createApiErrorResponse('Test case not found', 404);
  }
  
  // Create a new bug
  const newBug: Bug = {
    id: `bug-${uuidv4().slice(0, 8)}`,
    title: `Bug from test: ${testCase.title}`,
    description: failureDetails.description,
    stepsToReproduce: testCase.stepsToReproduce,
    severity: failureDetails.severity,
    priority: failureDetails.priority,
    status: 'new',
    relatedTestCase: testCaseId,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user-1', // Could be replaced with the current user
  };
  
  bugs.push(newBug);
  
  return createApiSuccessResponse(newBug);
};

// Create a backlog item from a bug
export const createBacklogItemFromBug = async (
  bugId: string,
  additionalDetails?: {
    priority?: BacklogItem['priority'];
    storyPoints?: number;
    releaseId?: string;
  }
): Promise<ApiResponse<BacklogItem>> => {
  await delay(500);
  
  // Check if bug exists
  const bug = bugs.find(b => b.id === bugId);
  if (!bug) {
    return createApiErrorResponse('Bug not found', 404);
  }
  
  // Check if this bug already has a backlog item
  if (bug.backlogItemId) {
    return createApiErrorResponse('Bug already has a backlog item', 400);
  }
  
  // Map bug severity to backlog item priority if not provided
  let priority = additionalDetails?.priority;
  if (!priority) {
    switch (bug.severity) {
      case 'critical':
        priority = 'critical';
        break;
      case 'high':
        priority = 'high';
        break;
      case 'medium':
        priority = 'medium';
        break;
      default:
        priority = 'low';
    }
  }
  
  // Create a new backlog item
  const newBacklogItem: BacklogItem = {
    id: `BLGI-${uuidv4().slice(0, 8)}`,
    title: `Fix: ${bug.title}`,
    description: bug.description,
    status: 'open',
    priority,
    type: 'bug',
    creator: bug.createdBy,
    relatedItemId: bugId,
    relatedItemType: 'bug',
    storyPoints: additionalDetails?.storyPoints || 3, // Default story points
    releaseId: additionalDetails?.releaseId,
    labels: ['bug', 'test-generated'],
    createdAt: new Date(),
    updatedAt: new Date(),
    relatedBugIds: [bugId]
  };
  
  backlogItems.push(newBacklogItem);
  
  // Update the bug with the backlog item reference
  const bugIndex = bugs.findIndex(b => b.id === bugId);
  if (bugIndex >= 0) {
    bugs[bugIndex] = {
      ...bugs[bugIndex],
      backlogItemId: newBacklogItem.id,
      generatedBacklogItem: true
    };
  }
  
  return createApiSuccessResponse(newBacklogItem);
};

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
