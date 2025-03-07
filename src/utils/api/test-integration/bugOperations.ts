
import {
  delay,
  createApiSuccessResponse,
  createApiErrorResponse,
  uuidv4,
  testCases,
  bugs,
  backlogItems,
  ApiResponse,
  Bug,
  BacklogItem
} from './common';

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
