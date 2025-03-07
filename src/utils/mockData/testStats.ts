
import { TestManagementStats } from '../types/testTypes';
import { delay, simulateApiResponse } from './apiHelpers';
import { testCases } from './testCases';
import { bugs } from './bugs';
import { testCycles } from './testCycles';

// Test stats calculation for dashboard
export const fetchTestStats = async () => {
  await delay(700);
  
  const totalTestCases = testCases.length;
  const passedTests = testCases.filter(tc => tc.status === 'pass').length;
  const failedTests = testCases.filter(tc => tc.status === 'fail').length;
  const blockedTests = testCases.filter(tc => tc.status === 'blocked').length;
  const notRunTests = testCases.filter(tc => tc.status === 'not-run').length;
  
  const totalBugs = bugs.length;
  const openBugs = bugs.filter(b => ['new', 'in-progress'].includes(b.status)).length;
  const fixedBugs = bugs.filter(b => ['fixed', 'verified', 'closed'].includes(b.status)).length;
  
  const testCycleProgress = testCycles.map(cycle => {
    const cycleTestCases = testCases.filter(tc => cycle.testCases.includes(tc.id));
    const completedTests = cycleTestCases.filter(tc => tc.status !== 'not-run').length;
    const progress = cycleTestCases.length > 0 
      ? Math.round((completedTests / cycleTestCases.length) * 100) 
      : 0;
    
    return {
      cycleId: cycle.id,
      cycleName: cycle.name,
      progress
    };
  });
  
  const stats: TestManagementStats = {
    totalTestCases,
    passedTests,
    failedTests,
    blockedTests,
    notRunTests,
    totalBugs,
    openBugs,
    fixedBugs,
    testCycleProgress
  };
  
  return simulateApiResponse(stats);
};
