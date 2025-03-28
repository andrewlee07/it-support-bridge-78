
export type ReleaseStatus = 'Planned' | 'In Progress' | 'Deployed' | 'Cancelled';

export interface Release {
  id: string;
  name: string;
  version: string;
  description: string;
  status: ReleaseStatus;
  plannedDate: Date;
  deploymentDate?: Date;
  owner: string;
  assignedTeam?: string;
  createdAt: Date;
  updatedAt: Date;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  items: ReleaseItem[];
  audit: ReleaseAuditEntry[];
  
  // Backward compatibility fields
  releaseDate?: Date;
  releaseNotes?: string;
  changeLog?: string[];
}

export interface ReleaseItem {
  id: string;
  releaseId: string;
  itemId: string;
  itemType: 'backlog' | 'change' | 'bug' | 'incident';
  addedAt: Date;
  addedBy: string;
}

export interface ReleaseAuditEntry {
  id: string;
  entityId: string;
  entityType: 'release';
  message: string;
  performedBy: string;
  timestamp: Date;
}
