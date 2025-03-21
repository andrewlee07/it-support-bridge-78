
import { TestStatus, TestPriority, TestType } from './testStatus';

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
  lastExecutionDate?: Date; // Added to support TestCoverageTab
  // Add the missing properties used in TestCaseDetail
  executionHistory?: TestExecution[]; // History of test executions
  linkedIssues?: string[]; // IDs of linked issues/bugs
}

export interface TestCaseCoverage {
  backlogItemId: string;
  testCaseId: string;
  status: TestStatus;
  lastExecutionDate?: Date;
}

// For CSV Export
export interface ExportableTestCase extends Omit<TestCase, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

// Updated to match the interface in testExecution.ts by adding testCycleId
export interface TestExecution {
  id: string;
  testCaseId: string;
  testCycleId: string; // Added to match other TestExecution interface
  status: TestStatus;
  executedBy: string;
  executedAt: Date;
  comments?: string;
  linkedBugs?: string[]; // Added for consistency
  executionDate?: Date; // Added for consistency with testExecution.ts
}
