
// Define all possible test statuses
export type TestStatus = 
  | 'pass' | 'passed' 
  | 'fail' | 'failed' 
  | 'blocked' 
  | 'not-run' | 'draft' | 'ready'
  | 'in_progress' | 'in-progress';

// Test case priority levels
export type TestPriority = 'high' | 'medium' | 'low';

// Test case types
export type TestType = 'functional' | 'integration' | 'performance' | 'security' | 'usability' | 'regression';

// Bug severity levels
export type BugSeverity = 'critical' | 'high' | 'medium' | 'low';

// Bug priority levels
export type BugPriority = 'high' | 'medium' | 'low';

// Bug status types 
export type BugStatus = 'open' | 'in_progress' | 'fixed' | 'closed' | 'verified' | 'rejected' | 'reopened' | 'deferred';

// Function to map between different status representations
export const mapTestStatus = (status: string): TestStatus => {
  // Handle status format differences
  if (status === 'passed') return 'pass';
  if (status === 'failed') return 'fail';
  if (status === 'in-progress' || status === 'in_progress') return 'in_progress';
  if (status === 'draft' || status === 'ready') return 'not-run';
  
  return status as TestStatus;
};

// Function to normalize status for display
export const getNormalizedStatus = (status: string): string => {
  if (status === 'pass' || status === 'passed') return 'Passed';
  if (status === 'fail' || status === 'failed') return 'Failed';
  if (status === 'in-progress' || status === 'in_progress') return 'In Progress';
  if (status === 'not-run' || status === 'draft' || status === 'ready') return 'Not Run';
  if (status === 'blocked') return 'Blocked';
  
  return status.charAt(0).toUpperCase() + status.slice(1);
};
