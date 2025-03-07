
// Release management
export type ReleaseType = 'major' | 'minor' | 'patch' | 'emergency';

export type ReleaseStatus = 'Planned' | 'In Progress' | 'Deployed' | 'Cancelled';

export type ReleaseApprovalStatus = 'pending' | 'approved' | 'rejected';

// Release item can link to other entities
export interface ReleaseItem {
  id: string;
  releaseId: string;
  itemId: string;
  itemType: 'change' | 'incident' | 'asset';
  addedAt: Date;
  addedBy: string;
}

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
  approvedAt?: Date;
  approvedBy?: string;
  items: ReleaseItem[];
  audit: any[];
}

// Release metrics
export interface ReleaseMetrics {
  totalReleases: number;
  deployedReleases: number;
  pendingReleases: number;
  cancelledReleases: number;
  releasesByMonth: {
    month: string;
    count: number;
  }[];
  successRate: number;
}
