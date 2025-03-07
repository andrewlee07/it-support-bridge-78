
// Test Case Management Types
export type TestStatus = 'not-run' | 'pass' | 'fail' | 'blocked';
export type BugSeverity = 'critical' | 'high' | 'medium' | 'low';
export type BugPriority = 'urgent' | 'high' | 'medium' | 'low';
export type BugStatus = 'new' | 'in-progress' | 'fixed' | 'verified' | 'closed';

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
}

export interface TestExecution {
  id: string;
  testCaseId: string;
  executionDate: Date;
  status: TestStatus;
  comments: string;
  executedBy: string; // User ID
  linkedBugs: string[]; // Bug IDs
}

export interface TestCycle {
  id: string;
  name: string;
  description: string;
  releaseId?: string;
  startDate: Date;
  endDate: Date;
  status: 'planned' | 'in-progress' | 'completed';
  testCases: string[]; // Test Case IDs
  createdAt: Date;
  updatedAt: Date;
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
