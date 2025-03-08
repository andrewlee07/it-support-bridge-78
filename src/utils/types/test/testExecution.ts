
import { TestStatus, TestCycleStatus } from './testStatus';

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
  createdBy: string; // For compatibility with testData and consistency
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
