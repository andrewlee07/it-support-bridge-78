
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getTestCoverageByReleaseId } from '@/utils/api/test-release';

interface ReleaseReadinessAssessmentProps {
  releaseId: string;
}

const ReleaseReadinessAssessment: React.FC<ReleaseReadinessAssessmentProps> = ({ releaseId }) => {
  // Fetch test coverage metrics
  const { data: coverageResponse, isLoading } = useQuery({
    queryKey: ['testCoverage', releaseId],
    queryFn: () => getTestCoverageByReleaseId(releaseId),
    enabled: !!releaseId
  });

  const coverage = coverageResponse?.data;
  
  // Mock readiness trend data
  const readinessTrend = [
    { date: '2023-10-01', score: 35 },
    { date: '2023-10-08', score: 48 },
    { date: '2023-10-15', score: 62 },
    { date: '2023-10-22', score: 75 },
    { date: '2023-10-29', score: coverage?.coveragePercentage || 0 }
  ];
  
  // Calculate readiness score (in a real app, this would use a more complex algorithm)
  const readinessScore = coverage ? Math.round(
    (coverage.coveragePercentage * 0.5) + 
    ((coverage.passedTests / Math.max(1, coverage.totalTestCases)) * 100 * 0.3) +
    ((1 - (coverage.failedTests / Math.max(1, coverage.totalTestCases))) * 100 * 0.2)
  ) : 0;
  
  // Determine readiness status
  const getReadinessStatus = () => {
    if (!coverage) return { label: 'Unknown', icon: HelpCircle, color: 'bg-gray-100 text-gray-800' };
    
    if (coverage.readiness === 'go') {
      return { 
        label: 'Ready', 
        icon: CheckCircle2, 
        color: 'bg-green-100 text-green-800 border-green-200' 
      };
    } else if (coverage.readiness === 'warning') {
      return { 
        label: 'Caution', 
        icon: AlertCircle, 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200' 
      };
    } else {
      return { 
        label: 'Not Ready', 
        icon: XCircle, 
        color: 'bg-red-100 text-red-800 border-red-200' 
      };
    }
  };
  
  // Get trend indicator
  const getTrendIndicator = () => {
    if (readinessTrend.length < 2) return { icon: Minus, label: 'Stable', color: 'text-gray-500' };
    
    const previousScore = readinessTrend[readinessTrend.length - 2].score;
    const currentScore = readinessTrend[readinessTrend.length - 1].score;
    
    if (currentScore > previousScore) {
      return { icon: TrendingUp, label: 'Improving', color: 'text-green-600' };
    } else if (currentScore < previousScore) {
      return { icon: TrendingDown, label: 'Declining', color: 'text-red-600' };
    } else {
      return { icon: Minus, label: 'Stable', color: 'text-gray-500' };
    }
  };
  
  const readinessStatus = getReadinessStatus();
  const trendIndicator = getTrendIndicator();
  const ReadinessIcon = readinessStatus.icon;
  const TrendIcon = trendIndicator.icon;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Release Readiness Assessment</span>
          {coverage && (
            <Badge variant="outline" className={readinessStatus.color}>
              <ReadinessIcon className="h-4 w-4 mr-2" />
              {readinessStatus.label}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading readiness data...</p>
          </div>
        ) : !coverage ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No readiness data available</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-lg font-semibold">Readiness Score: {readinessScore}%</span>
                <div className="flex items-center gap-1">
                  <TrendIcon className={`h-4 w-4 ${trendIndicator.color}`} />
                  <span className={`text-sm ${trendIndicator.color}`}>{trendIndicator.label}</span>
                </div>
              </div>
              <Progress value={readinessScore} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not Ready</span>
                <span>Caution</span>
                <span>Ready</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm text-muted-foreground mb-1">Test Coverage</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{coverage.coveragePercentage}%</span>
                      <Badge className={getCoverageBadgeColor(coverage.coveragePercentage)}>
                        {coverage.coveragePercentage >= 80 ? "Good" : coverage.coveragePercentage >= 50 ? "Partial" : "Poor"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm text-muted-foreground mb-1">Pass Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {coverage.totalTestCases === 0 ? 0 : Math.round((coverage.passedTests / coverage.totalTestCases) * 100)}%
                      </span>
                      <Badge className={getPassRateBadgeColor(coverage.passedTests, coverage.totalTestCases)}>
                        {getPassRateLabel(coverage.passedTests, coverage.totalTestCases)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Criteria Assessment</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md bg-muted/30">
                  <span>Test coverage above 80%</span>
                  {coverage.coveragePercentage >= 80 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex justify-between items-center p-2 rounded-md bg-muted/30">
                  <span>No critical test failures</span>
                  {coverage.failedTests === 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex justify-between items-center p-2 rounded-md bg-muted/30">
                  <span>All blocked tests resolved</span>
                  {coverage.blockedTests === 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex justify-between items-center p-2 rounded-md bg-muted/30">
                  <span>Risk level acceptable</span>
                  {coverage.riskLevel !== 'high' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper functions for badges
const getCoverageBadgeColor = (coverage: number) => {
  if (coverage >= 80) return 'bg-green-100 text-green-800 border-green-200';
  if (coverage >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

const getPassRateBadgeColor = (passed: number, total: number) => {
  const rate = total === 0 ? 0 : (passed / total) * 100;
  if (rate >= 90) return 'bg-green-100 text-green-800 border-green-200';
  if (rate >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

const getPassRateLabel = (passed: number, total: number) => {
  const rate = total === 0 ? 0 : (passed / total) * 100;
  if (rate >= 90) return 'Excellent';
  if (rate >= 70) return 'Good';
  if (rate >= 50) return 'Fair';
  return 'Poor';
};

export default ReleaseReadinessAssessment;
