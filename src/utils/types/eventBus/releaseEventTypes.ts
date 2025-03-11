
/**
 * Release-specific event data types
 */

// Release-specific event data
export interface ReleaseEventData {
  releaseId: string;
  title: string;
  version: string;
  description?: string;
  status: string;
  type?: string;
  plannedDate?: string;
  deploymentDate?: string;
  owner?: string;
  affectedServices?: string[];
  testResults?: {
    passRate?: number;
    totalTests?: number;
    failedTests?: number;
    criticalIssues?: number;
  };
  deploymentDetails?: {
    expectedDowntime?: string;
    startTime?: string;
    endTime?: string;
    environment?: string;
    rollbackPlan?: string;
  };
  rollbackReason?: string;
  updatedFields?: string[];
}
