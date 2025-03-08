
// Re-export all functions from the test integration API files
import { linkTestCaseToBacklogItem, unlinkTestCaseFromBacklogItem } from './testCaseLinking';
import { getLinkedTestCases, getBacklogItemCoverage, getUnlinkedTestCases } from './testBacklogCoverage';

// Export all functions
export {
  // Test case linking functions
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  
  // Backlog item coverage functions
  getLinkedTestCases,
  getBacklogItemCoverage,
  getUnlinkedTestCases
};

// Default export with all functions
export default {
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  getLinkedTestCases,
  getBacklogItemCoverage,
  getUnlinkedTestCases
};
