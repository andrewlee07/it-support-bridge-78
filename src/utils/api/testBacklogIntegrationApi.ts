
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

// For backward compatibility with existing imports
const createBugFromTestExecution = async () => {
  // Implementation to be added when needed
  return { success: false, error: 'Not implemented' };
};

const createBacklogItemFromBug = async () => {
  // Implementation to be added when needed
  return { success: false, error: 'Not implemented' };
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
