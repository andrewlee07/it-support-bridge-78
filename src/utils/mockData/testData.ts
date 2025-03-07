// Re-export all test management related mock data from individual files
import { 
  testCases, 
  fetchTestCases as originalFetchTestCases, 
  fetchTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase 
} from './testCases';

import {
  bugs,
  fetchBugs,
  fetchBugById,
  createBug,
  updateBug
} from './bugs';

import {
  testCycles,
  fetchTestCycles,
  createTestCycle
} from './testCycles';

import {
  testExecutions,
  executeTest
} from './testExecutions';

import {
  fetchTestStats
} from './testStats';

// Export the original function and add a new one that supports filtering
const fetchTestCases = (statusFilter = null) => {
  if (statusFilter) {
    // If a status filter is provided, filter the test cases
    const filtered = testCases.filter(tc => tc.status === statusFilter);
    return Promise.resolve({
      success: true,
      message: 'Test cases retrieved successfully',
      statusCode: 200,
      data: filtered
    });
  }
  
  // Otherwise, use the original function which we need to ensure returns the same shape
  return originalFetchTestCases().then(response => {
    // If originalFetchTestCases doesn't include statusCode, add it
    if (!('statusCode' in response)) {
      return {
        ...response,
        statusCode: 200 // Assume success status code
      };
    }
    return response;
  });
};

// Export everything
export {
  // Test Cases
  testCases,
  fetchTestCases,
  fetchTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase,
  
  // Bugs
  bugs,
  fetchBugs,
  fetchBugById,
  createBug,
  updateBug,
  
  // Test Cycles
  testCycles,
  fetchTestCycles,
  createTestCycle,
  
  // Test Executions
  testExecutions,
  executeTest,
  
  // Test Stats
  fetchTestStats
};
