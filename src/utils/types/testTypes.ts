
// Test Case Management Types

// Status types
export type TestStatus = 'not-run' | 'pass' | 'fail' | 'blocked' | 'passed' | 'failed' | 'draft' | 'ready' | 'in_progress' | 'in-progress';
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
  // Added for Release integration
  releaseId?: string;
  applicable?: boolean; // Whether this test case is applicable to the release
  // Legacy fields
  preConditions?: string;
  steps?: string[];
  expectedResult?: string;
  priority?: TestPriority;
  type?: TestType;
  createdBy?: string;
  // Backlog integration fields
  relatedBacklogItemIds?: string[]; // IDs of associated backlog items
  coverage?: TestCaseCoverage[];
}

export interface TestCaseCoverage {
  backlogItemId: string;
  testCaseId: string;
  status: TestStatus;
  lastExecutionDate?: Date;
}

// Test coverage interface for components that need it
export interface TestCoverage {
  releaseId: string;
  totalTestCases: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  coveragePercentage: number;
  riskLevel: 'high' | 'medium' | 'low';
  readiness: 'go' | 'no-go' | 'warning';
}

// Props interface for TestCoverageIndicator component
export interface TestCoverageIndicatorProps {
  coverage: {
    total: number;
    covered: number;
    passed: number;
    failed: number;
  };
  size?: 'sm' | 'md' | 'lg';
  indicatorClassName?: string;
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
  // Added for Release integration
  releaseId?: string;
  // Backlog integration fields
  relatedBacklogItemId?: string; // ID of associated backlog item
  generatedBacklogItem?: boolean; // Whether this bug has generated a backlog item
  backlogItemId?: string; // ID of the generated backlog item
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
  // Backlog integration fields
  affectedBacklogItems?: string[]; // IDs of affected backlog items
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

// New interfaces for Release test coverage - renamed to avoid conflicts
export interface TestExecutionForRelease {
  releaseId: string;
  testCycleId: string;
  totalExecuted: number;
  passed: number;
  failed: number;
  blocked: number;
  progress: number; // Percentage of tests executed
}

// Traceability Matrix data structure
export interface TraceabilityMatrix {
  backlogItems: {
    id: string;
    title: string;
    coverage: number;
    testCases: {
      id: string;
      title: string;
      status: TestStatus;
      lastExecuted?: Date;
    }[];
    bugs: {
      id: string;
      title: string;
      status: BugStatus;
    }[];
  }[];
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
