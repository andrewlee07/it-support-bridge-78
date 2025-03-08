import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { TestCase, TestStatus } from '../types/testTypes';

// Mock Test Cases data
export let testCases: TestCase[] = [
  {
    id: 'tc-1',
    title: 'Verify user login with valid credentials',
    description: 'Test case to verify the login functionality with valid credentials',
    stepsToReproduce: [
      'Navigate to login page',
      'Enter valid username and password',
      'Click login button'
    ],
    expectedResults: 'User should be logged in successfully and redirected to the dashboard',
    status: 'pass',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'tc-2',
    title: 'Verify user login with invalid credentials',
    description: 'Test case to verify the login functionality with invalid credentials',
    stepsToReproduce: [
      'Navigate to login page',
      'Enter invalid username and password',
      'Click login button'
    ],
    expectedResults: 'Error message should be displayed indicating invalid credentials',
    status: 'fail',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Test Case API functions
export const fetchTestCases = async (statusFilter?: TestStatus | null): Promise<ApiResponse<TestCase[]>> => {
  await delay(500);
  
  // Apply status filter if provided
  let filteredTestCases = testCases;
  if (statusFilter) {
    // Handle compatibility between different status formats
    const compatibleStatuses = getCompatibleStatuses(statusFilter);
    filteredTestCases = testCases.filter(tc => 
      compatibleStatuses.includes(tc.status as TestStatus)
    );
  }
  
  return createApiSuccessResponse(filteredTestCases);
};

// Helper function to handle status format compatibility
const getCompatibleStatuses = (status: TestStatus): TestStatus[] => {
  switch (status) {
    case 'pass':
      return ['pass', 'passed'];
    case 'fail':
      return ['fail', 'failed'];
    case 'blocked':
      return ['blocked'];
    case 'not-run':
      return ['not-run', 'draft', 'ready'];
    default:
      return [status];
  }
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
  
  // Ensure the required fields are present
  const newTestCase: TestCase = {
    id: uuidv4(),
    ...testCase,
    stepsToReproduce: testCase.stepsToReproduce || testCase.steps || [],
    expectedResults: testCase.expectedResults || testCase.expectedResult || '',
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
  
  // Ensure backward compatibility with stepsToReproduce vs steps
  if (updates.steps && !updates.stepsToReproduce) {
    updates.stepsToReproduce = updates.steps;
  }
  if (updates.expectedResult && !updates.expectedResults) {
    updates.expectedResults = updates.expectedResult;
  }
  
  testCases[index] = { ...testCases[index], ...updates, updatedAt: new Date() };
  return createApiSuccessResponse(testCases[index]);
};

export const deleteTestCase = async (id: string): Promise<ApiResponse<boolean>> => {
  await delay(500);
  testCases = testCases.filter(tc => tc.id !== id);
  return createApiSuccessResponse(true);
};
