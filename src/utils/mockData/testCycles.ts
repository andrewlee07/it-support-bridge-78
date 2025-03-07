
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { TestCycle } from '../types/testTypes';

// Mock Test Cycles data
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

// Test Cycle API functions
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
