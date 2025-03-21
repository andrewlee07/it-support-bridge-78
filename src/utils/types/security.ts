
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
  assignedTo?: string;
  category?: string;
  lastUpdatedAt?: string;
  createdBy?: string;
  audit?: {
    timestamp: string;
    performedBy?: string;
    userName?: string;
    action?: string;
    message?: string;
  }[];
  notes?: {
    id: string;
    text: string;
    createdBy: string;
    createdAt: string;
  }[];
  relatedAssets?: string[];
  relatedTickets?: string[];
  attachments?: {
    id: string;
    name: string;
    size: number;
    uploadedBy: string;
    uploadedAt: string;
    url: string;
  }[];
}

export type SecurityCaseType = 'Data Breach' | 'SAR' | 'Compliance' | 'Threat';
export type SecurityCaseStatus = 'Active' | 'Pending' | 'Resolved';
export type SecurityCasePriority = 'High' | 'Medium' | 'Low';

// SLA types for security cases
export interface SecurityCaseSLA {
  responseTimeHours: number; // Target response time in hours
  resolutionTimeHours: number; // Target resolution time in hours
}

export type SecurityCaseTab = 'overview' | 'investigation' | 'affected-systems' | 'notes' | 'related-items';
