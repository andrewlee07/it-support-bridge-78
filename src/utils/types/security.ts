
// Define types for the security module

export interface SecurityCase {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  reportedBy: string;
  reportedAt: string;
  affectedSystems: string[];
  investigationSteps: {
    date: string;
    text: string;
  }[];
  impactedUsers: number;
  remediationPlan: string;
}

export type SecurityCaseType = 'Data Breach' | 'SAR' | 'Compliance' | 'Threat';
export type SecurityCaseStatus = 'Active' | 'Pending' | 'Resolved';
export type SecurityCasePriority = 'High' | 'Medium' | 'Low';
