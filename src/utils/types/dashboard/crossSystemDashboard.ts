
// Cross-system dashboard types
export interface CrossSystemDashboardData {
  releaseSummary: {
    totalReleases: number;
    upcomingReleases: number;
    releaseRiskScores: ReleaseRiskScore[];
    completionRate: number;
  };
  backlogProgress: BacklogProgressItem[];
  testMetrics: TestMetricsData;
  relationships: RelationshipData;
}

export interface ReleaseRiskScore {
  releaseId: string;
  title: string;
  version: string;
  riskScore: number;
  status: string;
}

export interface BacklogProgressItem {
  releaseId: string;
  title: string;
  completed: number;
  inProgress: number;
  notStarted: number;
}

export interface TestMetricsData {
  testCoverage: {
    releaseId: string;
    title: string;
    coverage: number;
  }[];
  bugsByRelease: {
    releaseId: string;
    title: string;
    open: number;
    fixed: number;
  }[];
  testEffectiveness: number;
  bugFixVelocity: number;
}

export interface RelationshipData {
  nodes: {
    id: string;
    label: string;
    value: number;
  }[];
  links: {
    source: string;
    target: string;
    value: number;
  }[];
}
