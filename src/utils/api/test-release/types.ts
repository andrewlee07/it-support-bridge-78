
// Define a release-specific test coverage interface
export interface ReleaseCoverage {
  releaseId: string;
  totalTestCases: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  coveragePercentage: number;
  riskLevel: 'low' | 'medium' | 'high';
  readiness: 'go' | 'no-go' | 'warning';
}
