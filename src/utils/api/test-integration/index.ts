
// Re-export all test-backlog integration API functions
import { linkTestCaseToBacklogItem, unlinkTestCaseFromBacklogItem } from './testCaseLinking';
import { getTestCasesForBacklogItem, getBacklogItemsForTestCase } from './testCaseQueries';
import { createBugFromTestExecution, createBacklogItemFromBug } from './bugOperations';
import { getTestCoverageForBacklogItem, updateAllBacklogTestCoverage } from './coverageOperations';
import { getTraceabilityMatrix } from './traceabilityMatrix';

export {
  // Test Case Linking
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  
  // Test Case Queries
  getTestCasesForBacklogItem,
  getBacklogItemsForTestCase,
  
  // Bug Operations
  createBugFromTestExecution,
  createBacklogItemFromBug,
  
  // Coverage Operations
  getTestCoverageForBacklogItem,
  updateAllBacklogTestCoverage,
  
  // Traceability
  getTraceabilityMatrix,
};

// Export default object with all functions
export default {
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  getTestCasesForBacklogItem,
  getBacklogItemsForTestCase,
  createBugFromTestExecution,
  createBacklogItemFromBug,
  getTestCoverageForBacklogItem,
  updateAllBacklogTestCoverage,
  getTraceabilityMatrix,
};
