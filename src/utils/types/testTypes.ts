
import { TestCoverage } from './test/testCoverage';
import { 
  TestStatus, 
  BugStatus, 
  TestCycleStatus, 
  BugSeverity, 
  BugPriority, 
  TestPriority,
  TestType,
  getNormalizedStatus
} from './test/testStatus';
import { TestCase } from './test/testCase';
import { Bug } from './test/bug';
import { TestExecution, TestCycle } from './test/testExecution';
import { TestManagementStats } from './test/testCoverage';

// Re-export test-related types for backward compatibility
export type { 
  TestStatus, 
  BugStatus, 
  TestCase, 
  Bug, 
  TestCoverage, 
  TestCycleStatus,
  BugSeverity,
  BugPriority,
  TestPriority,
  TestType,
  TestExecution,
  TestCycle,
  TestManagementStats
};

// Test execution for release
export interface TestExecutionForRelease {
  releaseId: string;
  testCycleId: string;
  totalExecuted: number;
  passed: number;
  failed: number;
  blocked: number;
  progress: number;
}

// Export the mapTestStatus function
export { mapTestStatus, getNormalizedStatus } from './test/testStatus';
