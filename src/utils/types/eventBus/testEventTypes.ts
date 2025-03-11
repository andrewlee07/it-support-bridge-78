
/**
 * Test management event data types
 */

import { TestStatus } from '../test/testStatus';

// Test Case event data
export interface TestCaseEventData {
  testCaseId: string;
  id: string; // Added for publisher compatibility
  title: string;
  description?: string;
  createdBy: string;
  assignedTo?: string;
  relatedRequirements?: string[];
  testType?: string;
  priority?: string;
  status?: TestStatus;
  changes?: string[];       // For testCase.updated
  impactedTestPlans?: string[];  // For testCase.updated
  tenantId?: string; // Added for publisher compatibility
}

// Test Execution event data
export interface TestExecutionEventData {
  executionId: string;
  id: string; // Added for publisher compatibility
  testCycleId: string;
  testCaseIds: string[];
  title: string;
  description?: string;
  scheduledBy?: string;
  executedBy?: string;
  scheduledTime?: string;   // For testExecution.scheduled
  startTime?: string;       // For testExecution.started
  expectedDuration?: string; // For testExecution.started
  coverage?: string;        // For testExecution.started
  failedTests?: {           // For testExecution.failed
    testCaseId: string;
    title: string;
    stepsToReproduce?: string[];
    severity: string;
  }[];
  results?: {               // For testExecution.completed
    passed: number;
    failed: number;
    blocked: number;
    notExecuted: number;
  };
  blockerDetails?: string;  // For testExecution.blocked
  blockerImpact?: string;   // For testExecution.blocked
  requiredActions?: string; // For testExecution.blocked
  tenantId?: string; // Added for publisher compatibility
}
