
import { BugSeverity, BugPriority, BugStatus } from './testStatus';

export interface Bug {
  id: string;
  title: string;
  description: string;
  stepsToReproduce: string[];
  severity: BugSeverity;
  priority: BugPriority;
  status: BugStatus;
  assignedDeveloper?: string; // User ID
  relatedTestCase?: string; // Test Case ID
  attachment?: string; // URL to attachment
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID
  reportedBy?: string; // Backward compatibility
  // For compatibility with testData
  assignedTo?: string;
  // Added for Release integration
  releaseId?: string;
  // Backlog integration fields
  relatedBacklogItemId?: string; // ID of associated backlog item
  generatedBacklogItem?: boolean; // Whether this bug has generated a backlog item
  backlogItemId?: string; // ID of the generated backlog item
}

// For CSV Export
export interface ExportableBug extends Omit<Bug, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
