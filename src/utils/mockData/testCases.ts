
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { TestCase, TestCaseStatus, TestPriority, TestType } from '../types/testTypes';

// Mock Test Cases data
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

// Test Case API functions
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
