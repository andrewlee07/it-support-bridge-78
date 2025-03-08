
import { TestCycle, TestCycleStatus } from '@/utils/types/testTypes';
import { ApiResponse } from '@/utils/types/api';
import { createApiSuccessResponse, createApiErrorResponse, delay } from '@/utils/mockData/apiHelpers';
import { v4 as uuidv4 } from 'uuid';
import { testCycles, createTestCycle } from '@/utils/mockData/testCycles';

// Fetch test cycles for a release
export const fetchTestCyclesForRelease = async (releaseId: string): Promise<ApiResponse<TestCycle[]>> => {
  await delay(500);
  const filteredCycles = testCycles.filter(cycle => cycle.releaseId === releaseId);
  return createApiSuccessResponse(filteredCycles);
};

// Create a test cycle for a release
export const createTestCycleForRelease = async (
  releaseId: string,
  testCycleData: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: TestCycleStatus;
    testCases: string[];
    createdBy: string; // Now required to match type definition
  }
): Promise<ApiResponse<TestCycle>> => {
  try {
    await delay(500);
    
    // Add release ID to test cycle data
    const testCycleWithRelease = {
      ...testCycleData,
      releaseId
    };
    
    // Create the test cycle using the mock function
    const response = await createTestCycle(testCycleWithRelease);
    
    return response;
  } catch (error) {
    return createApiErrorResponse(
      error instanceof Error ? error.message : 'Failed to create test cycle'
    );
  }
};

// Update a test cycle
export const updateTestCycle = async (
  testCycleId: string,
  updates: Partial<TestCycle>
): Promise<ApiResponse<TestCycle>> => {
  await delay(500);
  
  const index = testCycles.findIndex(cycle => cycle.id === testCycleId);
  
  if (index === -1) {
    return createApiErrorResponse('Test cycle not found');
  }
  
  const updatedCycle = {
    ...testCycles[index],
    ...updates,
    updatedAt: new Date()
  };
  
  testCycles[index] = updatedCycle;
  
  return createApiSuccessResponse(updatedCycle);
};
