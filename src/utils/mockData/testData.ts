
import { v4 as uuidv4 } from 'uuid';
import { TestCase, Bug, TestCycle, TestExecution } from '../types/testTypes';
import { delay, simulateApiResponse } from './apiHelpers';
import { User } from '../types';

// Sample Test Cases
export const testCases: TestCase[] = [
  {
    id: uuidv4(),
    title: 'Verify user login with valid credentials',
    description: 'Test the login functionality with valid username and password',
    stepsToReproduce: [
      'Navigate to login page',
      'Enter valid username',
      'Enter valid password',
      'Click login button'
    ],
    expectedResults: 'User should be logged in and redirected to dashboard',
    status: 'pass',
    assignedTester: '2', // Jane Smith (IT Staff)
    relatedRequirement: 'USER-001',
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2023, 10, 15)
  },
  {
    id: uuidv4(),
    title: 'Verify error message with invalid credentials',
    description: 'Test the login error handling with invalid credentials',
    stepsToReproduce: [
      'Navigate to login page',
      'Enter invalid username',
      'Enter invalid password',
      'Click login button'
    ],
    expectedResults: 'Error message should be displayed',
    status: 'fail',
    assignedTester: '2', // Jane Smith (IT Staff)
    relatedRequirement: 'USER-001',
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2023, 11, 1)
  },
  {
    id: uuidv4(),
    title: 'Verify password reset functionality',
    description: 'Test the password reset workflow',
    stepsToReproduce: [
      'Navigate to login page',
      'Click on "Forgot password"',
      'Enter email address',
      'Click submit'
    ],
    expectedResults: 'Password reset email should be sent',
    status: 'not-run',
    assignedTester: '3', // Bob Johnson (End User)
    relatedRequirement: 'USER-002',
    createdAt: new Date(2023, 10, 20),
    updatedAt: new Date(2023, 10, 20)
  }
];

// Sample Bugs
export const bugs: Bug[] = [
  {
    id: uuidv4(),
    title: 'Login button unresponsive after multiple attempts',
    description: 'After 3 failed login attempts, the login button becomes unresponsive',
    stepsToReproduce: [
      'Navigate to login page',
      'Enter invalid credentials 3 times in a row',
      'Try to click the login button again'
    ],
    severity: 'high',
    priority: 'high',
    status: 'new',
    assignedDeveloper: '2', // Jane Smith (IT Staff)
    relatedTestCase: testCases[1].id,
    attachment: '/lovable-uploads/bf3633e2-5031-4a59-ab35-ffd5b863fbfc.png',
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2023, 11, 1),
    createdBy: '3' // Bob Johnson (End User)
  },
  {
    id: uuidv4(),
    title: 'Password reset email not received',
    description: 'Password reset email is not being received after clicking submit',
    stepsToReproduce: [
      'Navigate to login page',
      'Click on "Forgot password"',
      'Enter email address',
      'Click submit',
      'Check email inbox'
    ],
    severity: 'medium',
    priority: 'medium',
    status: 'in-progress',
    assignedDeveloper: '1', // John Doe (Admin)
    relatedTestCase: testCases[2].id,
    createdAt: new Date(2023, 11, 5),
    updatedAt: new Date(2023, 11, 7),
    createdBy: '2' // Jane Smith (IT Staff)
  }
];

// Sample Test Cycles
export const testCycles: TestCycle[] = [
  {
    id: uuidv4(),
    name: 'Authentication Testing - Q4 2023',
    description: 'Verify all authentication features for Q4 release',
    releaseId: 'rel-001',
    startDate: new Date(2023, 10, 15),
    endDate: new Date(2023, 11, 15),
    status: 'in-progress',
    testCases: testCases.map(tc => tc.id),
    createdAt: new Date(2023, 10, 10),
    updatedAt: new Date(2023, 10, 10)
  }
];

// Sample Test Executions
export const testExecutions: TestExecution[] = [
  {
    id: uuidv4(),
    testCaseId: testCases[0].id,
    executionDate: new Date(2023, 10, 20),
    status: 'pass',
    comments: 'Login worked as expected',
    executedBy: '2', // Jane Smith (IT Staff)
    linkedBugs: []
  },
  {
    id: uuidv4(),
    testCaseId: testCases[1].id,
    executionDate: new Date(2023, 11, 1),
    status: 'fail',
    comments: 'Login button became unresponsive after multiple attempts',
    executedBy: '2', // Jane Smith (IT Staff)
    linkedBugs: [bugs[0].id]
  }
];

// API mocks for fetching test cases
export const fetchTestCases = () => {
  return simulateApiResponse(testCases);
};

export const fetchTestCaseById = (id: string) => {
  const testCase = testCases.find(tc => tc.id === id);
  return simulateApiResponse(testCase);
};

// API mocks for managing test cases
export const createTestCase = async (
  testCase: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt'>
) => {
  await delay(500);
  const newTestCase: TestCase = {
    ...testCase,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  testCases.push(newTestCase);
  return simulateApiResponse(newTestCase);
};

export const updateTestCase = async (
  id: string,
  updates: Partial<Omit<TestCase, 'id' | 'createdAt' | 'updatedAt'>>
) => {
  await delay(500);
  const testCaseIndex = testCases.findIndex(tc => tc.id === id);
  if (testCaseIndex === -1) {
    return simulateApiResponse(null, 'Test case not found', false);
  }
  
  testCases[testCaseIndex] = {
    ...testCases[testCaseIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  return simulateApiResponse(testCases[testCaseIndex]);
};

export const deleteTestCase = async (id: string) => {
  await delay(500);
  const testCaseIndex = testCases.findIndex(tc => tc.id === id);
  if (testCaseIndex === -1) {
    return simulateApiResponse(null, 'Test case not found', false);
  }
  
  testCases.splice(testCaseIndex, 1);
  return simulateApiResponse(true);
};

// API mocks for bugs
export const fetchBugs = () => {
  return simulateApiResponse(bugs);
};

export const fetchBugById = (id: string) => {
  const bug = bugs.find(b => b.id === id);
  return simulateApiResponse(bug);
};

export const createBug = async (
  bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>,
  userId: string
) => {
  await delay(500);
  const newBug: Bug = {
    ...bug,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: userId
  };
  bugs.push(newBug);
  return simulateApiResponse(newBug);
};

export const updateBug = async (
  id: string,
  updates: Partial<Omit<Bug, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>
) => {
  await delay(500);
  const bugIndex = bugs.findIndex(b => b.id === id);
  if (bugIndex === -1) {
    return simulateApiResponse(null, 'Bug not found', false);
  }
  
  bugs[bugIndex] = {
    ...bugs[bugIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  return simulateApiResponse(bugs[bugIndex]);
};

// API mocks for test executions
export const executeTest = async (
  execution: Omit<TestExecution, 'id'>
) => {
  await delay(500);
  const newExecution: TestExecution = {
    ...execution,
    id: uuidv4()
  };
  
  // Update the test case status
  const testCaseIndex = testCases.findIndex(tc => tc.id === execution.testCaseId);
  if (testCaseIndex !== -1) {
    testCases[testCaseIndex].status = execution.status;
    testCases[testCaseIndex].updatedAt = new Date();
  }
  
  testExecutions.push(newExecution);
  return simulateApiResponse(newExecution);
};

// API mocks for test cycles
export const fetchTestCycles = () => {
  return simulateApiResponse(testCycles);
};

export const createTestCycle = async (
  testCycle: Omit<TestCycle, 'id' | 'createdAt' | 'updatedAt'>
) => {
  await delay(500);
  const newTestCycle: TestCycle = {
    ...testCycle,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  testCycles.push(newTestCycle);
  return simulateApiResponse(newTestCycle);
};

// Test stats calculation for dashboard
export const fetchTestStats = async () => {
  await delay(700);
  
  const totalTestCases = testCases.length;
  const passedTests = testCases.filter(tc => tc.status === 'pass').length;
  const failedTests = testCases.filter(tc => tc.status === 'fail').length;
  const blockedTests = testCases.filter(tc => tc.status === 'blocked').length;
  const notRunTests = testCases.filter(tc => tc.status === 'not-run').length;
  
  const totalBugs = bugs.length;
  const openBugs = bugs.filter(b => ['new', 'in-progress'].includes(b.status)).length;
  const fixedBugs = bugs.filter(b => ['fixed', 'verified', 'closed'].includes(b.status)).length;
  
  const testCycleProgress = testCycles.map(cycle => {
    const cycleTestCases = testCases.filter(tc => cycle.testCases.includes(tc.id));
    const completedTests = cycleTestCases.filter(tc => tc.status !== 'not-run').length;
    const progress = cycleTestCases.length > 0 
      ? Math.round((completedTests / cycleTestCases.length) * 100) 
      : 0;
    
    return {
      cycleId: cycle.id,
      cycleName: cycle.name,
      progress
    };
  });
  
  const stats: TestManagementStats = {
    totalTestCases,
    passedTests,
    failedTests,
    blockedTests,
    notRunTests,
    totalBugs,
    openBugs,
    fixedBugs,
    testCycleProgress
  };
  
  return simulateApiResponse(stats);
};
