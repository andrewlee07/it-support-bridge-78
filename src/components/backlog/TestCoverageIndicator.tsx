
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';

export interface TestCoverageIndicatorProps {
  coverage: BacklogTestCoverage;
  size?: 'sm' | 'md' | 'lg';
}

const TestCoverageIndicator: React.FC<TestCoverageIndicatorProps> = ({
  coverage,
  size = 'md',
}) => {
  const getStatusColor = (coveragePercentage: number, background: boolean = false): string => {
    if (coveragePercentage >= 80) {
      return background ? 'bg-green-500' : 'text-green-500';
    } else if (coveragePercentage >= 50) {
      return background ? 'bg-yellow-500' : 'text-yellow-500';
    } else {
      return background ? 'bg-red-500' : 'text-red-500';
    }
  };

  return (
    <div className={`test-coverage-indicator ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">Test Coverage</span>
        <span className={`${getStatusColor(coverage.coveragePercentage)}`}>
          {coverage.coveragePercentage}%
        </span>
      </div>
      <Progress 
        value={coverage.coveragePercentage} 
        className={`h-${size === 'sm' ? '1' : '2'} ${getStatusColor(coverage.coveragePercentage, true)}`} 
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>Passed: {coverage.passedTests}</span>
        <span>Failed: {coverage.failedTests}</span>
      </div>
    </div>
  );
};

export default TestCoverageIndicator;
