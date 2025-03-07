
import { TestStatus } from './testStatus';
import { Bug } from './bug';

// Test coverage interface for components that need it
export interface TestCoverage {
  releaseId: string;
  totalTestCases: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  coveragePercentage: number;
  riskLevel: 'high' | 'medium' | 'low';
  readiness: 'go' | 'no-go' | 'warning';
}

// Props interface for TestCoverageIndicator component
export interface TestCoverageIndicatorProps {
  coveragePercentage?: number; // Added for backward compatibility
  coverage?: {
    total: number;
    covered: number;
    passed: number;
    failed: number;
  };
  size?: 'sm' | 'md' | 'lg';
  indicatorClassName?: string;
}

// API response types for Test Management
export interface TestManagementStats {
  totalTestCases: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  notRunTests: number;
  totalBugs: number;
  openBugs: number;
  fixedBugs: number;
  testCycleProgress: {
    cycleId: string;
    cycleName: string;
    progress: number; // Percentage complete
  }[];
  passed?: number; // For compatibility with testData
  failed?: number; // For compatibility with testData
  blocked?: number; // For compatibility with testData
  notExecuted?: number; // For compatibility with testData
}

// Traceability Matrix data structure
export interface TraceabilityMatrix {
  backlogItems: {
    id: string;
    title: string;
    coverage: number;
    testCases: {
      id: string;
      title: string;
      status: TestStatus;
      lastExecuted?: Date;
    }[];
    bugs: {
      id: string;
      title: string;
      status: Bug['status'];
    }[];
  }[];
}
