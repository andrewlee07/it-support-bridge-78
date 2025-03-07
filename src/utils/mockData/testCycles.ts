
import { v4 as uuidv4 } from 'uuid';
import { TestCycle } from '../types/testTypes';
import { delay, simulateApiResponse } from './apiHelpers';
import { testCases } from './testCases';

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
