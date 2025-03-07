
import { v4 as uuidv4 } from 'uuid';
import { TestCase } from '../types/testTypes';
import { delay, simulateApiResponse } from './apiHelpers';

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
    return simulateApiResponse(null, 'Test case not found');
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
    return simulateApiResponse(null, 'Test case not found');
  }
  
  testCases.splice(testCaseIndex, 1);
  return simulateApiResponse(true);
};
