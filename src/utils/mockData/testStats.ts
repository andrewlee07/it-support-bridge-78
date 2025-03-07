
import { delay, createApiSuccessResponse } from './apiHelpers';
import { ApiResponse } from '../types';
import { TestManagementStats } from '../types/testTypes';
import { testCases } from './testCases';
import { bugs } from './bugs';
import { testExecutions } from './testExecutions';
import { testCycles } from './testCycles';

export const fetchTestStats = async (): Promise<ApiResponse<TestManagementStats>> => {
  await delay(500);

  const totalTestCases = testCases.length;
  const passed = testExecutions.filter(te => te.status === 'passed').length;
  const failed = testExecutions.filter(te => te.status === 'failed').length;
  const blocked = testExecutions.filter(te => te.status === 'blocked').length;
  const notExecuted = totalTestCases - passed - failed - blocked;
  
  // Get open bugs count
  const openBugs = bugs.filter(b => b.status === 'open').length;
  
  // Mock test cycle progress
  const testCycleProgress = testCycles.map(cycle => ({
    cycleId: cycle.id,
    cycleName: cycle.name,
    progress: Math.floor(Math.random() * 100) // Randomly generate progress percentage
  }));

  const stats: TestManagementStats = {
    totalTestCases,
    passedTests: passed,
    failedTests: failed,
    blockedTests: blocked,
    notRunTests: notExecuted,
    totalBugs: bugs.length,
    openBugs,
    fixedBugs: bugs.filter(b => b.status === 'fixed').length,
    testCycleProgress,
    // Legacy fields for compatibility
    passed,
    failed,
    blocked,
    notExecuted,
  };

  return createApiSuccessResponse(stats);
};
