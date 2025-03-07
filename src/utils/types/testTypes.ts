
// Test Case Management Types
export type TestStatus = 'not-run' | 'pass' | 'fail' | 'blocked' | 'passed' | 'failed';
export type BugSeverity = 'critical' | 'high' | 'medium' | 'low';
export type BugPriority = 'urgent' | 'high' | 'medium' | 'low';
export type BugStatus = 'new' | 'in-progress' | 'fixed' | 'verified' | 'closed' | 'open' | 'in_progress' | 'resolved';

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
}

export interface TestExecution {
  id: string;
  testCaseId: string;
  executionDate: Date;
  status: TestStatus;
  comments: string;
  executedBy: string; // User ID
  linkedBugs: string[]; // Bug IDs
  testCycleId?: string; // For compatibility with testData
  notes?: string; // For compatibility with testData
  executedAt?: Date; // For compatibility with testData
}

export interface TestCycle {
  id: string;
  name: string;
  description: string;
  releaseId?: string;
  startDate: Date;
  endDate: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'aborted' | 'in-progress';
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
