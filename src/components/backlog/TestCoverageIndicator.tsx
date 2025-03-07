
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BacklogTestCoverage } from '@/utils/types/backlogTypes';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestCoverageIndicatorProps {
  coverage?: BacklogTestCoverage;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const TestCoverageIndicator: React.FC<TestCoverageIndicatorProps> = ({
  coverage,
  size = 'md',
  showDetails = false
}) => {
  if (!coverage || coverage.totalTestCases === 0) {
    return (
      <div className="flex items-center text-muted-foreground">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span className="text-xs">No test coverage</span>
      </div>
    );
  }

  const { totalTestCases, passedTests, failedTests, coveragePercentage } = coverage;

  // Determine color based on coverage and failed tests
  const getProgressColor = () => {
    if (failedTests > 0) return 'bg-red-500';
    if (coveragePercentage < 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Icon based on status
  const getStatusIcon = () => {
    if (failedTests > 0) {
      return <XCircle className={cn("text-red-500", size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')} />;
    }
    if (coveragePercentage < 50) {
      return <AlertCircle className={cn("text-yellow-500", size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')} />;
    }
    return <CheckCircle2 className={cn("text-green-500", size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')} />;
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getStatusIcon()}
          <span className={cn(
            "ml-1.5",
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm font-medium' : 'text-xs'
          )}>
            Test Coverage: {coveragePercentage}%
          </span>
        </div>
        {showDetails && (
          <span className="text-xs text-muted-foreground">
            {passedTests}/{totalTestCases} passing
          </span>
        )}
      </div>
      <Progress 
        value={coveragePercentage} 
        className={cn(
          "h-1.5", 
          size === 'sm' ? 'h-1' : size === 'lg' ? 'h-2' : 'h-1.5'
        )} 
        indicatorClassName={getProgressColor()}
      />
      {showDetails && (
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span className="text-green-600">Passed: {passedTests}</span>
          <span className="text-red-600">Failed: {failedTests}</span>
          <span>Not Run: {coverage.notExecutedTests}</span>
        </div>
      )}
    </div>
  );
};

export default TestCoverageIndicator;
