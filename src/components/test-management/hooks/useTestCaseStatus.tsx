
import { useMemo } from 'react';

export const useTestCaseStatus = () => {
  const testStatuses = useMemo(() => [
    { value: 'not-run', label: 'Not Run' },
    { value: 'passed', label: 'Passed' },
    { value: 'failed', label: 'Failed' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'in-progress', label: 'In Progress' },
  ], []);

  return { testStatuses };
};
