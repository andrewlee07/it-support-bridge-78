
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
  plannedDate: Date | string;
  status: ReleaseStatus;
  owner: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  approvalStatus: ReleaseApprovalStatus;
  approvedAt?: Date | string;
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
  releasesByType: {
    major: number;
    minor: number;
    patch: number;
    emergency: number;
  };
  releasesByMonth: {
    month: string;
    count: number;
  }[];
  successRate: number;
}
