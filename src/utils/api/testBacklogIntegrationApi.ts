
import {
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  getLinkedTestCases,
  getBacklogItemCoverage,
  getUnlinkedTestCases
} from './test-integration';

export {
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  getLinkedTestCases,
  getBacklogItemCoverage,
  getUnlinkedTestCases
};

// Create a bug from a test execution
const createBugFromTestExecution = async (testCaseId: string, bugData: any) => {
  // This is a mock implementation until the real API is implemented
  console.log(`Creating bug for test case ${testCaseId}`, bugData);
  return {
    success: true,
    data: {
      id: `bug-${Date.now()}`,
      title: `Bug for test case ${testCaseId}`,
      ...bugData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user',
      status: 'new'
    }
  };
};

// Create a backlog item from a bug
const createBacklogItemFromBug = async (bugId: string) => {
  // This is a mock implementation until the real API is implemented
  console.log(`Creating backlog item for bug ${bugId}`);
  return {
    success: true,
    data: {
      id: `backlog-${Date.now()}`,
      title: `Fix bug ${bugId}`,
      description: `Implementing fix for bug ${bugId}`,
      priority: 'medium',
      type: 'bug',
      status: 'open',
      labels: ['bug'],
      creator: 'current-user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };
};

export {
  createBugFromTestExecution,
  createBacklogItemFromBug
};

// Default export for backward compatibility
export default {
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  getLinkedTestCases,
  getBacklogItemCoverage,
  getUnlinkedTestCases,
  createBugFromTestExecution,
  createBacklogItemFromBug
};
