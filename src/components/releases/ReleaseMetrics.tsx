
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReleaseMetricsProps {
  metrics: {
    totalReleases: number;
    statusCounts: {
      Planned: number;
      'In Progress': number;
      Deployed: number;
      Cancelled: number;
    };
    typeCounts: {
      major: number;
      minor: number;
      patch: number;
      emergency: number;
    };
    upcomingReleases: number;
    deployedThisMonth: number;
  };
  isLoading: boolean;
}

const ReleaseMetrics: React.FC<ReleaseMetricsProps> = ({ metrics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-muted rounded w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Total Releases
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalReleases}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Upcoming Releases
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.upcomingReleases}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Deployed This Month
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.deployedThisMonth}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Releases
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.typeCounts.emergency}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseMetrics;
