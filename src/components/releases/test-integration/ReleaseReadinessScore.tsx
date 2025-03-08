
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, AlertTriangle, ShieldAlert, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TestCoverage } from '@/utils/types/test/testCoverage';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReleaseReadinessScoreProps {
  testCoverage: TestCoverage;
}

const ReleaseReadinessScore: React.FC<ReleaseReadinessScoreProps> = ({ testCoverage }) => {
  // Calculate readiness score based on coverage, passed tests, and failed tests
  const coverageScore = testCoverage.coveragePercentage * 0.4; // 40% weight for coverage
  const passRateScore = testCoverage.totalTestCases > 0 
    ? (testCoverage.passedTests / testCoverage.totalTestCases) * 100 * 0.4 // 40% weight for pass rate
    : 0;
  const bugImpactScore = testCoverage.totalTestCases > 0 
    ? Math.max(0, 20 - (testCoverage.failedTests / testCoverage.totalTestCases) * 100) // 20% weight for bugs
    : 0;
  
  const readinessScore = Math.round(coverageScore + passRateScore + bugImpactScore);
  
  // Determine readiness indicator
  let readinessIcon;
  let readinessLabel;
  let readinessColor;

  if (readinessScore >= 90) {
    readinessIcon = <BadgeCheck className="h-5 w-5" />;
    readinessLabel = 'Go';
    readinessColor = 'bg-green-500';
  } else if (readinessScore >= 70) {
    readinessIcon = <AlertTriangle className="h-5 w-5" />;
    readinessLabel = 'Warning';
    readinessColor = 'bg-yellow-500';
  } else {
    readinessIcon = <ShieldAlert className="h-5 w-5" />;
    readinessLabel = 'No-Go';
    readinessColor = 'bg-red-500';
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Release Readiness</CardTitle>
          <Badge className={`${readinessColor} text-white`}>
            {readinessIcon}
            <span className="ml-1">{readinessLabel}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Readiness Score: {readinessScore}%</span>
            </div>
            <Progress 
              value={readinessScore} 
              className="h-2"
              indicatorClassName={
                readinessScore >= 90 ? 'bg-green-500' : 
                readinessScore >= 70 ? 'bg-yellow-500' : 
                'bg-red-500'
              }
            />
          </div>

          <div className="space-y-2 mt-4">
            <TooltipProvider>
              <div className="flex justify-between items-center">
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Test Coverage
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of requirements covered by tests (40% of score)</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm font-medium">{testCoverage.coveragePercentage}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-blue-500" />
                    Pass Rate
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of tests passing (40% of score)</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm font-medium">
                  {testCoverage.totalTestCases > 0 
                    ? Math.round((testCoverage.passedTests / testCoverage.totalTestCases) * 100)
                    : 0}%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Bug Impact
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Impact of failed tests and open bugs (20% of score)</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm font-medium">
                  {testCoverage.failedTests} failed tests
                </span>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseReadinessScore;
