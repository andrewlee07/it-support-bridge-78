import { v4 as uuidv4 } from 'uuid';
import { delay, simulateApiResponse, createApiErrorResponse, createApiSuccessResponse } from './apiHelpers';
import { ApiResponse } from '../types';

// Test Management Types
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

// Mock Data
export let testCases: TestCase[] = [
  {
    id: 'tc-1',
    title: 'Verify user login',
    description: 'Test user login functionality with valid credentials',
    preConditions: 'User must have an existing account',
    steps: ['Open login page', 'Enter username', 'Enter password', 'Click login button'],
    expectedResult: 'User should be logged in successfully',
    status: 'ready',
    priority: 'high',
    type: 'e2e',
    createdBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'tc-2',
    title: 'Check password reset',
    description: 'Test password reset process',
    preConditions: 'User must have an existing account',
    steps: ['Open password reset page', 'Enter email', 'Click reset button'],
    expectedResult: 'User should receive a password reset email',
    status: 'ready',
    priority: 'medium',
    type: 'e2e',
    createdBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export let bugs: Bug[] = [
  {
    id: 'bug-1',
    title: 'Login button not working',
    description: 'Login button is not responding when clicked',
    stepsToReproduce: 'Open login page, enter credentials, click login button',
    severity: 'critical',
    priority: 'high',
    status: 'open',
    reportedBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'bug-2',
    title: 'Incorrect error message',
    description: 'Error message is not clear',
    stepsToReproduce: 'Attempt login with invalid credentials',
    severity: 'medium',
    priority: 'medium',
    status: 'open',
    reportedBy: 'user-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export let testCycles: TestCycle[] = [
  {
    id: 'cycle-1',
    name: 'Regression Test Cycle',
    description: 'Full regression test cycle for the new release',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    testCases: ['tc-1', 'tc-2'],
    status: 'planned',
    createdBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export let testExecutions: TestExecution[] = [];

// Mock API Functions
export const fetchTestCases = async (): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  return createApiSuccessResponse(testCases);
};

export const fetchTestCaseById = async (id: string): Promise<ApiResponse<TestCase | null>> => {
  await delay(500);
  
  const testCase = testCases.find(tc => tc.id === id);
  
  if (!testCase) {
    return createApiErrorResponse<TestCase | null>('Test case not found', 404);
  }
  
  // Return a copy to avoid modification of the original
  return createApiSuccessResponse<TestCase | null>({...testCase});
};

export const createTestCase = async (testCase: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<TestCase>> => {
  await delay(500);
  const newTestCase: TestCase = {
    id: uuidv4(),
    ...testCase,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  testCases.push(newTestCase);
  return createApiSuccessResponse(newTestCase);
};

export const updateTestCase = async (id: string, updates: Partial<TestCase>): Promise<ApiResponse<TestCase | null>> => {
  await delay(500);
  const index = testCases.findIndex(tc => tc.id === id);
  if (index === -1) {
    return createApiErrorResponse<TestCase | null>('Test case not found', 404);
  }
  testCases[index] = { ...testCases[index], ...updates, updatedAt: new Date() };
  return createApiSuccessResponse(testCases[index]);
};

export const deleteTestCase = async (id: string): Promise<ApiResponse<boolean>> => {
  await delay(500);
  testCases = testCases.filter(tc => tc.id !== id);
  return createApiSuccessResponse(true);
};

export const fetchBugs = async (): Promise<ApiResponse<Bug[]>> => {
  await delay(500);
  return createApiSuccessResponse(bugs);
};

export const fetchBugById = async (id: string): Promise<ApiResponse<Bug | null>> => {
  await delay(500);
  const bug = bugs.find(b => b.id === id);
  if (!bug) {
    return createApiErrorResponse<Bug | null>('Bug not found', 404);
  }
  return createApiSuccessResponse(bug);
};

export const createBug = async (bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Bug>> => {
  await delay(500);
  const newBug: Bug = {
    id: uuidv4(),
    ...bug,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  bugs.push(newBug);
  return createApiSuccessResponse(newBug);
};

export const updateBug = async (id: string, updates: Partial<Bug>): Promise<ApiResponse<Bug | null>> => {
  await delay(500);
  const index = bugs.findIndex(b => b.id === id);
  if (index === -1) {
    return createApiErrorResponse<Bug | null>('Bug not found', 404);
  }
  bugs[index] = { ...bugs[index], ...updates, updatedAt: new Date() };
  return createApiSuccessResponse(bugs[index]);
};

export const fetchTestCycles = async (): Promise<ApiResponse<TestCycle[]>> => {
  await delay(500);
  return createApiSuccessResponse(testCycles);
};

export const createTestCycle = async (testCycle: Omit<TestCycle, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<TestCycle>> => {
  await delay(500);
  const newTestCycle: TestCycle = {
    id: uuidv4(),
    ...testCycle,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  testCycles.push(newTestCycle);
  return createApiSuccessResponse(newTestCycle);
};

export const executeTest = async (testCaseId: string, testCycleId: string, status: 'passed' | 'failed' | 'blocked', notes?: string): Promise<ApiResponse<TestExecution>> => {
  await delay(500);
  const newTestExecution: TestExecution = {
    id: uuidv4(),
    testCycleId: testCycleId,
    testCaseId: testCaseId,
    status: status,
    notes: notes,
    executedBy: 'user-1', // Mock user
    executedAt: new Date(),
  };
  testExecutions.push(newTestExecution);
  return createApiSuccessResponse(newTestExecution);
};

export const fetchTestStats = async (): Promise<ApiResponse<TestStats>> => {
  await delay(500);

  const totalTestCases = testCases.length;
  const passed = testExecutions.filter(te => te.status === 'passed').length;
  const failed = testExecutions.filter(te => te.status === 'failed').length;
  const blocked = testExecutions.filter(te => te.status === 'blocked').length;
  const notExecuted = totalTestCases - passed - failed - blocked;
  
  // Get open bugs count
  const openBugs = bugs.filter(b => b.status === 'open').length;
  
  // Mock test cycle progress
  const testCycleProgress = testCycles.map(cycle => ({
    cycleId: cycle.id,
    cycleName: cycle.name,
    progress: Math.floor(Math.random() * 100) // Randomly generate progress percentage
  }));

  const stats: TestStats = {
    totalTestCases,
    passed,
    failed,
    blocked,
    notExecuted,
    // Add additional properties needed by the dashboard
    passedTests: passed,
    failedTests: failed,
    blockedTests: blocked,
    notRunTests: notExecuted,
    openBugs,
    testCycleProgress
  };

  return createApiSuccessResponse(stats);
};
