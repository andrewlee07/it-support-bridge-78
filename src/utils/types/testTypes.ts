
import { TestCoverage } from './test/testCoverage';
import { TestStatus, BugStatus, TestCycleStatus } from './test/testStatus';
import { TestCase } from './test/testCase';
import { Bug } from './test/bug';

// Re-export test-related types for backward compatibility
export type { TestStatus, BugStatus, TestCase, Bug, TestCoverage, TestCycleStatus };

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

// Test cycle
export interface TestCycle {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  testCases: string[];
  status: TestCycleStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  releaseId?: string;
}

// Test execution
export interface TestExecution {
  id: string;
  testCycleId: string;
  testCaseId: string;
  status: TestStatus;
  comments?: string;
  executedBy: string;
  executedAt: Date;
  linkedBugs?: string[];
  executionDate?: Date;
}

// Export the mapTestStatus function
export { mapTestStatus } from './test/testStatus';
