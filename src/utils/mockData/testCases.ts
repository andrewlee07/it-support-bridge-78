
import { v4 as uuidv4 } from 'uuid';
import { TestCase } from '../types/testTypes';
import { delay, simulateApiResponse } from './apiHelpers';
import { ApiResponse } from '../types';

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
export const fetchTestCases = (): Promise<ApiResponse<TestCase[]>> => {
  return Promise.resolve({
    success: true,
    message: 'Test cases retrieved successfully',
    statusCode: 200,
    data: testCases
  });
};

export const fetchTestCaseById = (id: string): Promise<ApiResponse<TestCase | null>> => {
  const testCase = testCases.find(tc => tc.id === id);
  if (!testCase) {
    return Promise.resolve({
      success: false,
      message: 'Test case not found',
      statusCode: 404,
      data: null
    });
  }
  return Promise.resolve({
    success: true,
    message: 'Test case retrieved successfully',
    statusCode: 200,
    data: testCase
  });
};

// API mocks for managing test cases
export const createTestCase = async (
  testCase: Omit<TestCase, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<TestCase>> => {
  await delay(500);
  const newTestCase: TestCase = {
    ...testCase,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  testCases.push(newTestCase);
  return Promise.resolve({
    success: true,
    message: 'Test case created successfully',
    statusCode: 201,
    data: newTestCase
  });
};

export const updateTestCase = async (
  id: string,
  updates: Partial<Omit<TestCase, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<TestCase>> => {
  await delay(500);
  const testCaseIndex = testCases.findIndex(tc => tc.id === id);
  if (testCaseIndex === -1) {
    return Promise.resolve({
      success: false,
      message: 'Test case not found',
      statusCode: 404,
      data: null
    });
  }
  
  testCases[testCaseIndex] = {
    ...testCases[testCaseIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  return Promise.resolve({
    success: true,
    message: 'Test case updated successfully',
    statusCode: 200,
    data: testCases[testCaseIndex]
  });
};

export const deleteTestCase = async (id: string): Promise<ApiResponse<boolean>> => {
  await delay(500);
  const testCaseIndex = testCases.findIndex(tc => tc.id === id);
  if (testCaseIndex === -1) {
    return Promise.resolve({
      success: false,
      message: 'Test case not found',
      statusCode: 404,
      data: null
    });
  }
  
  testCases.splice(testCaseIndex, 1);
  return Promise.resolve({
    success: true,
    message: 'Test case deleted successfully',
    statusCode: 200,
    data: true
  });
};
