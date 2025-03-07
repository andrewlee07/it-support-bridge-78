
// Release management types
import { AuditEntry } from './audit';

export type ReleaseStatus = 'Planned' | 'In Progress' | 'Deployed' | 'Cancelled';
export type ReleaseType = 'major' | 'minor' | 'patch' | 'emergency';
export type ReleaseApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Release {
  id: string;
  title: string;
  version: string;
  type: ReleaseType;
  description: string;
  plannedDate: Date;
  status: ReleaseStatus;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  approvalStatus: ReleaseApprovalStatus;
  approvedBy?: string;
  approvedAt?: Date;
  items: ReleaseItem[];
  audit: AuditEntry[];
}

export interface ReleaseItem {
  id: string;
  releaseId: string;
  itemId: string;
  itemType: 'change' | 'incident' | 'asset';
  addedAt: Date;
  addedBy: string;
}
