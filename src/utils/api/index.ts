
// Re-export API functions from various modules for convenient importing
export * from './assetApi';
export * from './backlogApi';
export * from './bugApi';
export * from './changeApi';
export * from './dashboardApi';
export * from './emailApi';
export * from './dropdownConfigurationApi';
export * from './releaseApi';
export * from './slaApi';
export * from './ticketApi';
export * from './userApi';

// Test Integration APIs
// Explicitly re-export to avoid ambiguity with duplicate exports
export {
  linkTestCaseToBacklogItem,
  unlinkTestCaseFromBacklogItem,
  getLinkedTestCases,
  getBacklogItemCoverage,
  getUnlinkedTestCases,
  // Avoid re-exporting getTraceabilityMatrix from here since it's also exported from testBacklogIntegrationApi
} from './test-integration';

export * from './testBacklogIntegrationApi';
export * from './testReleaseApi';

// Email notification API
export * from './emailNotificationApi';
