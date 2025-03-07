
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, ShieldCheck, ShieldX, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TestCoverage } from '@/utils/types/testTypes';

interface ReleaseTestCoverageProps {
  coverage: TestCoverage;
}

const ReleaseTestCoverage: React.FC<ReleaseTestCoverageProps> = ({ coverage }) => {
  // Get the risk level color
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get the readiness badge
  const getReadinessBadge = (readiness: string) => {
    switch (readiness) {
      case 'go':
        return (
          <Badge className="bg-green-500 text-white">
            <ShieldCheck className="h-4 w-4 mr-1" />
            Go
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-yellow-500 text-white">
            <Shield className="h-4 w-4 mr-1" />
            Warning
          </Badge>
        );
      case 'no-go':
        return (
          <Badge className="bg-red-500 text-white">
            <ShieldX className="h-4 w-4 mr-1" />
            No-Go
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Test Coverage</CardTitle>
          {getReadinessBadge(coverage.readiness)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall Coverage: {coverage.coveragePercentage}%</span>
              <span className="text-sm font-medium">
                Risk Level: 
                <span className={`ml-1 px-2 py-0.5 rounded-full text-white ${getRiskLevelColor(coverage.riskLevel)}`}>
                  {coverage.riskLevel.charAt(0).toUpperCase() + coverage.riskLevel.slice(1)}
                </span>
              </span>
            </div>
            <Progress value={coverage.coveragePercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <div className="flex items-center text-green-700 mb-1">
                <Check className="h-4 w-4 mr-1" />
                <span className="font-medium">Passed Tests</span>
              </div>
              <div className="text-2xl font-bold text-green-800">{coverage.passedTests}</div>
            </div>
            <div className="bg-red-50 p-3 rounded-md border border-red-100">
              <div className="flex items-center text-red-700 mb-1">
                <X className="h-4 w-4 mr-1" />
                <span className="font-medium">Failed Tests</span>
              </div>
              <div className="text-2xl font-bold text-red-800">{coverage.failedTests}</div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Total Test Cases: {coverage.totalTestCases}</span>
            <span>Not Run: {coverage.notRunTests}</span>
            <span>Blocked: {coverage.blockedTests}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseTestCoverage;
