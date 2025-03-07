
import { v4 as uuidv4 } from 'uuid';
import { TestExecution, TestStatus } from '../types/testTypes';
import { delay, simulateApiResponse } from './apiHelpers';
import { testCases } from './testCases';
import { bugs } from './bugs';

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
