
// Test Case Management Types

// Status types
export type TestStatus = 'not-run' | 'pass' | 'fail' | 'blocked' | 'passed' | 'failed' | 'draft' | 'ready' | 'in_progress';
export type BugSeverity = 'critical' | 'high' | 'medium' | 'low';
export type BugPriority = 'urgent' | 'high' | 'medium' | 'low';
export type BugStatus = 
  'new' | 'in-progress' | 'fixed' | 'verified' | 'closed' | 
  'open' | 'in_progress' | 'resolved'; // Including all values used in the codebase
export type TestCycleStatus = 'planned' | 'in-progress' | 'in_progress' | 'completed' | 'aborted';

// For backwards compatibility with testData.ts
export type TestCaseStatus = TestStatus;
export type TestPriority = BugPriority;
export type TestType = 'integration' | 'unit' | 'e2e' | 'performance' | 'security';

export interface TestCase {
  id: string;
  title: string;
  description: string;
  stepsToReproduce: string[];
  expectedResults: string;
  status: TestStatus;
  assignedTester?: string; // User ID
  relatedRequirement?: string;
  createdAt: Date;
  updatedAt: Date;
  // Legacy fields
  preConditions?: string;
  steps?: string[];
  expectedResult?: string;
  priority?: TestPriority;
  type?: TestType;
  createdBy?: string;
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  stepsToReproduce: string[];
  severity: BugSeverity;
  priority: BugPriority;
  status: BugStatus;
  assignedDeveloper?: string; // User ID
  relatedTestCase?: string; // Test Case ID
  attachment?: string; // URL to attachment
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID
  reportedBy?: string; // Backward compatibility
  // For compatibility with testData
  assignedTo?: string;
}

export interface TestExecution {
  id: string;
  testCaseId: string;
  testCycleId: string;
  status: TestStatus;
  comments?: string;
  executedBy: string; // User ID
  linkedBugs?: string[]; // Bug IDs
  executionDate?: Date; // Either executionDate or executedAt must be present
  executedAt?: Date; // For compatibility with testData
  notes?: string; // For compatibility with testData
}

export interface TestCycle {
  id: string;
  name: string;
  description: string;
  releaseId?: string;
  startDate: Date;
  endDate: Date;
  status: TestCycleStatus;
  testCases: string[]; // Test Case IDs
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // For compatibility with testData
}

// API response types for Test Management
export interface TestManagementStats {
  totalTestCases: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  totalBugs: number;
  openBugs: number;
  fixedBugs: number;
  testCycleProgress: {
    cycleId: string;
    cycleName: string;
    progress: number; // Percentage complete
  }[];
  passed?: number; // For compatibility with testData
  failed?: number; // For compatibility with testData
  blocked?: number; // For compatibility with testData
  notExecuted?: number; // For compatibility with testData
}

// For CSV Export
export interface ExportableTestCase extends Omit<TestCase, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface ExportableBug extends Omit<Bug, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

// Helper function to map between different status format versions
export const mapTestStatus = (status: string): TestStatus => {
  switch (status) {
    case 'passed': return 'pass';
    case 'failed': return 'fail';
    case 'draft': return 'not-run';
    case 'ready': return 'not-run';
    default: return status as TestStatus;
  }
};

export const mapBugStatus = (status: string): BugStatus => {
  return status as BugStatus;
};
