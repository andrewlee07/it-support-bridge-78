
import { v4 as uuidv4 } from 'uuid';
import { delay, createApiSuccessResponse, createApiErrorResponse } from '../../mockData/apiHelpers';
import { ApiResponse } from '../../types';
import { TestCycle } from '../../types/test';
import { testCycles, createTestCycle } from '../../mockData/testCycles';
import { getReleaseById } from '../release/releaseQueries';

// Create a new test cycle for a specific release
export const createTestCycleForRelease = async (
  releaseId: string,
  testCycleData: Omit<TestCycle, 'id' | 'createdAt' | 'updatedAt' | 'releaseId'>
): Promise<ApiResponse<TestCycle>> => {
  await delay(500);
  
  // Check if release exists
  const releaseResponse = await getReleaseById(releaseId);
  if (!releaseResponse.success) {
    return createApiErrorResponse('Release not found', 404);
  }
  
  // Create the test cycle with the release ID
  const newTestCycle = {
    ...testCycleData,
    releaseId,
  };
  
  return createTestCycle(newTestCycle);
};

// Get all test cycles for a specific release
export const getTestCyclesByReleaseId = async (releaseId: string): Promise<ApiResponse<TestCycle[]>> => {
  await delay(500);
  
  const releaseCycles = testCycles.filter(cycle => cycle.releaseId === releaseId);
  return createApiSuccessResponse(releaseCycles);
};
