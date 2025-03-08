
import { TestStatus } from '@/utils/types/testTypes';

export interface StatusCount {
  status: TestStatus;
  count: number;
  color: string;
  label: string;
}

// Define status colors that match the existing StatusBadge components
export const STATUS_COLORS = {
  'pass': '#10b981', // Green for pass
  'fail': '#ef4444', // Red for fail
  'blocked': '#f59e0b', // Yellow/Orange for blocked
  'not-run': '#6b7280', // Gray for not run
};

// Define status labels for better readability
export const STATUS_LABELS = {
  'pass': 'Passed',
  'fail': 'Failed',
  'blocked': 'Blocked',
  'not-run': 'Not Run',
};
