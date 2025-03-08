
// Test status and severity type definitions

// Status types
export type TestStatus = 'not-run' | 'pass' | 'fail' | 'blocked' | 'passed' | 'failed' | 'draft' | 'ready' | 'in_progress' | 'in-progress';
export type BugSeverity = 'critical' | 'major' | 'minor' | 'trivial' | 'high' | 'medium' | 'low'; // Updated with new values while keeping old ones for compatibility
export type BugPriority = 'urgent' | 'high' | 'medium' | 'low';
export type BugStatus = 
  'new' | 'in-progress' | 'fixed' | 'verified' | 'closed' | 
  'open' | 'in_progress' | 'resolved'; // Including all values used in the codebase

// For test cycles
export type TestCycleStatus = 'planned' | 'in_progress' | 'completed' | 'aborted';

// For backwards compatibility with testData.ts
export type TestCaseStatus = TestStatus;
export type TestPriority = BugPriority;
export type TestType = 'integration' | 'unit' | 'e2e' | 'performance' | 'security';

// Helper function to map between different status format versions
export const mapTestStatus = (status: string): TestStatus => {
  switch (status) {
    case 'passed': return 'pass';
    case 'failed': return 'fail';
    case 'draft': return 'not-run';
    case 'ready': return 'not-run';
    default: return status as TestStatus;
  }
};

export const mapBugStatus = (status: string): BugStatus => {
  return status as BugStatus;
};
