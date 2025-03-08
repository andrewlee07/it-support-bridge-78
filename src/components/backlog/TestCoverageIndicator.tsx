
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';

export interface TestCoverageIndicatorProps {
  coverage: BacklogTestCoverage;
  size?: 'sm' | 'md' | 'lg';
  // For backward compatibility with old implementations
  coveragePercentage?: number;
  coveragePct?: number;
}

const TestCoverageIndicator: React.FC<TestCoverageIndicatorProps> = ({
  coverage,
  size = 'md',
  coveragePercentage, // For backwards compatibility
  coveragePct, // For backwards compatibility
}) => {
  // Handle both new and old prop formats
  const getCoveragePercentage = () => {
    if (coverage && typeof coverage.coveragePercentage === 'number') {
      return coverage.coveragePercentage;
    }
    if (typeof coveragePercentage === 'number') {
      return coveragePercentage;
    }
    if (typeof coveragePct === 'number') {
      return coveragePct;
    }
    if (coverage && typeof coverage.covered === 'number' && typeof coverage.total === 'number' && coverage.total > 0) {
      return Math.round((coverage.covered / coverage.total) * 100);
    }
    return 0;
  };
  
  const coveragePctValue = getCoveragePercentage();

  const getStatusColor = (coveragePct: number, background: boolean = false): string => {
    if (coveragePct >= 80) {
      return background ? 'bg-green-500' : 'text-green-500';
    } else if (coveragePct >= 50) {
      return background ? 'bg-yellow-500' : 'text-yellow-500';
    } else {
      return background ? 'bg-red-500' : 'text-red-500';
    }
  };

  return (
    <div className={`test-coverage-indicator ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">Test Coverage</span>
        <span className={`${getStatusColor(coveragePctValue)}`}>
          {coveragePctValue}%
        </span>
      </div>
      <Progress 
        value={coveragePctValue}
        className={`h-${size === 'sm' ? '1' : '2'} ${getStatusColor(coveragePctValue, true)}`} 
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Passed: {coverage?.passedTests || coverage?.passed || 0}</span>
        <span>Failed: {coverage?.failedTests || coverage?.failed || 0}</span>
      </div>
    </div>
  );
};

export default TestCoverageIndicator;
