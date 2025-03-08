
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
      stepsToReproduce: bugData.stepsToReproduce || [],
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

// Get traceability matrix between test cases and backlog items
const getTraceabilityMatrix = async () => {
  // Mock implementation
  return {
    success: true,
    data: [
      {
        backlogItemId: 'backlog-1',
        testCaseIds: ['test-1', 'test-2'],
        bugIds: ['bug-1'],
        coverage: 75
      },
      {
        backlogItemId: 'backlog-2',
        testCaseIds: ['test-3'],
        bugIds: [],
        coverage: 50
      }
    ]
  };
};

// Get unified test coverage metrics across all backlog items
const getAggregatedTestCoverage = async () => {
  // Mock implementation
  return {
    success: true,
    data: {
      totalBacklogItems: 10,
      itemsWithTests: 7,
      overallCoverage: 65,
      byStatus: {
        open: 60,
        'in-progress': 75,
        completed: 90
      },
      byPriority: {
        critical: 85,
        high: 70,
        medium: 50,
        low: 30
      }
    }
  };
};

// Link a bug to a backlog item
const linkBugToBacklogItem = async (bugId: string, backlogItemId: string) => {
  // Mock implementation
  console.log(`Linking bug ${bugId} to backlog item ${backlogItemId}`);
  return {
    success: true,
    data: {
      bugId,
      backlogItemId,
      linkedAt: new Date()
    }
  };
};

// Get all bugs linked to a backlog item
const getLinkedBugs = async (backlogItemId: string) => {
  // Mock implementation
  console.log(`Getting bugs linked to backlog item ${backlogItemId}`);
  return {
    success: true,
    data: [
      {
        id: 'bug-1',
        title: 'First bug for this backlog item',
        status: 'open',
        severity: 'high',
        createdAt: new Date(),
        createdBy: 'user-1'
      }
    ]
  };
};

// Get all backlog items affected by a bug
const getBacklogItemsAffectedByBug = async (bugId: string) => {
  // Mock implementation
  console.log(`Getting backlog items affected by bug ${bugId}`);
  return {
    success: true,
    data: [
      {
        id: 'backlog-1',
        title: 'First affected backlog item',
        status: 'in-progress'
      }
    ]
  };
};

// Export new integration functions
export {
  createBugFromTestExecution,
  createBacklogItemFromBug,
  getTraceabilityMatrix,
  getAggregatedTestCoverage,
  linkBugToBacklogItem,
  getLinkedBugs,
  getBacklogItemsAffectedByBug
};

// Default export for backward compatibility
export default {
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  getLinkedTestCases,
  getBacklogItemCoverage,
  getUnlinkedTestCases,
  createBugFromTestExecution,
  createBacklogItemFromBug,
  getTraceabilityMatrix,
  getAggregatedTestCoverage,
  linkBugToBacklogItem,
  getLinkedBugs,
  getBacklogItemsAffectedByBug
};
