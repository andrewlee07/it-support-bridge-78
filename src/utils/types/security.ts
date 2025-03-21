
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
  slaConfig?: SecurityCaseSLAConfig; // Added SLA configuration
}

export type SecurityCaseType = 'Data Breach' | 'SAR' | 'Compliance' | 'Threat';
export type SecurityCaseStatus = 'Active' | 'Pending' | 'Resolved';
export type SecurityCasePriority = 'High' | 'Medium' | 'Low';

// SLA types for security cases
export interface SecurityCaseSLA {
  responseTimeHours: number; // Target response time in hours
  resolutionTimeHours: number; // Target resolution time in hours
}

// Added new SLA config type with more details
export interface SecurityCaseSLAConfig {
  responseTarget: {
    hours: number;
    breached: boolean;
  };
  resolutionTarget: {
    hours: number;
    breached: boolean;
  };
  businessHoursOnly: boolean;
}

// Default SLA settings based on priority
export const DEFAULT_SECURITY_SLA_SETTINGS = {
  High: {
    responseTimeHours: 1,
    resolutionTimeHours: 24,
    businessHoursOnly: false
  },
  Medium: {
    responseTimeHours: 4,
    resolutionTimeHours: 48,
    businessHoursOnly: true
  },
  Low: {
    responseTimeHours: 8,
    resolutionTimeHours: 72,
    businessHoursOnly: true
  }
};
