
// Define types for the security module

export interface SecurityCase {
  id: string;
  title: string;
  description: string;
  type: SecurityCaseType;
  status: SecurityCaseStatus;
  priority: SecurityCasePriority;
  reportedBy: string;
  reportedAt: string;
  affectedSystems: string[];
  investigationSteps: {
    date: string;
    text: string;
  }[];
  impactedUsers: number;
  remediationPlan: string;
  firstResponseAt?: string; // Time when case was first responded to
  resolvedAt?: string; // Time when case was resolved
}

export type SecurityCaseType = 'Data Breach' | 'SAR' | 'Compliance' | 'Threat';
export type SecurityCaseStatus = 'Active' | 'Pending' | 'Resolved';
export type SecurityCasePriority = 'High' | 'Medium' | 'Low';

// SLA types for security cases
export interface SecurityCaseSLA {
  responseTimeHours: number; // Target response time in hours
  resolutionTimeHours: number; // Target resolution time in hours
}
