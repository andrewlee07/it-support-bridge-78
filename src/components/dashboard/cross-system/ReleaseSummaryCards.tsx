
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, AlertTriangle, CheckCircle2, GitBranch } from 'lucide-react';
import { ReleaseRiskScore } from '@/utils/types/dashboard';

interface ReleaseSummaryCardsProps {
  data: {
    totalReleases: number;
    upcomingReleases: number;
    releaseRiskScores: ReleaseRiskScore[];
    completionRate: number;
  };
}

const ReleaseSummaryCards: React.FC<ReleaseSummaryCardsProps> = ({ data }) => {
  // Calculate average risk score
  const averageRiskScore = data.releaseRiskScores.length > 0 
    ? Math.round(data.releaseRiskScores.reduce((acc, release) => acc + release.riskScore, 0) / data.releaseRiskScores.length) 
    : 0;

  // Find highest risk release
  const highestRiskRelease = data.releaseRiskScores.length > 0 
    ? data.releaseRiskScores.reduce((prev, current) => (prev.riskScore > current.riskScore) ? prev : current) 
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Releases</CardTitle>
          <GitBranch className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalReleases}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.upcomingReleases} upcoming
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRiskScore}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            {getRiskLabel(averageRiskScore)}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Highest Risk Release</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {highestRiskRelease ? (
            <>
              <div className="text-2xl font-bold">{highestRiskRelease.title}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Risk score: {highestRiskRelease.riskScore}%
              </p>
            </>
          ) : (
            <div className="text-muted-foreground">No releases found</div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.completionRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Backlog items completed on time
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to determine risk label based on score
const getRiskLabel = (score: number): string => {
  if (score < 25) return 'Low risk';
  if (score < 50) return 'Moderate risk';
  if (score < 75) return 'High risk';
  return 'Critical risk';
};

export default ReleaseSummaryCards;
