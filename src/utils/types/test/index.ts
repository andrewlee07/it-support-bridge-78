
// Re-export all test-related types from specialized files
export * from './testStatus';
export type { 
  TestCase, 
  TestCaseCoverage, 
  ExportableTestCase 
} from './testCase';
export * from './bug';
export * from './testExecution';
export * from './testCoverage';

// Re-export TestExecution from testCase for backward compatibility
// This is needed because some components are still using the old import path
export type { TestExecution } from './testCase';
