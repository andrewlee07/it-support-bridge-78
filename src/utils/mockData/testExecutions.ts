
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { TestExecution } from '../types/testTypes';

// Mock Test Executions data
export let testExecutions: TestExecution[] = [];

// Test Execution API functions
export const executeTest = async (
  testCaseId: string, 
  testCycleId: string, 
  status: 'passed' | 'failed' | 'blocked', 
  notes?: string
): Promise<ApiResponse<TestExecution>> => {
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
