
// Re-export all test-related mock data and functions from specialized files
export {
  testCases,
  fetchTestCases,
  fetchTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase
} from './testCases';

export {
  bugs,
  fetchBugs,
  fetchBugById,
  createBug,
  updateBug
} from './bugs';

export {
  testCycles,
  fetchTestCycles,
  createTestCycle
} from './testCycles';

export {
  testExecutions,
  executeTest
} from './testExecutions';

export {
  fetchTestStats
} from './testStats';

// Export types used in the APIs for backward compatibility
export type TestCaseStatus = 'draft' | 'ready' | 'in_progress' | 'passed' | 'failed' | 'blocked';
export type TestPriority = 'low' | 'medium' | 'high';
export type TestType = 'integration' | 'unit' | 'e2e' | 'performance' | 'security';

export interface TestCase {
  id: string;
  title: string;
  description: string;
  preConditions: string;
  steps: string[];
  expectedResult: string;
  status: TestCaseStatus;
  priority: TestPriority;
  type: TestType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  stepsToReproduce: string[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  priority: TestPriority;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'fixed' | 'verified';
  reportedBy: string;
  assignedTo?: string;
  relatedTestCase?: string;
  attachment?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestCycle {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  testCases: string[]; // Array of TestCase IDs
  status: 'planned' | 'in_progress' | 'completed' | 'aborted';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestExecution {
  id: string;
  testCycleId: string;
  testCaseId: string;
  status: 'passed' | 'failed' | 'blocked' | 'not_executed';
  notes?: string;
  executedBy: string;
  executedAt: Date;
}

export interface TestStats {
  totalTestCases: number;
  passed: number;
  failed: number;
  blocked: number;
  notExecuted: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  openBugs: number;
  testCycleProgress: {
    cycleId: string;
    cycleName: string;
    progress: number; // Percentage complete
  }[];
}
