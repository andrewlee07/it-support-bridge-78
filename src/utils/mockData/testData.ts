
// Re-export all test management related mock data from individual files
import { 
  testCases, 
  fetchTestCases, 
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
