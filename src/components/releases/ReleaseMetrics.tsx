
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReleaseMetricsProps {
  metrics: {
    planned: number;
    inProgress: number;
    deployed: number;
    cancelled: number;
  };
  isLoading: boolean;
}

const ReleaseMetrics: React.FC<ReleaseMetricsProps> = ({ metrics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="h-16 animate-pulse bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { planned, inProgress, deployed, cancelled } = metrics;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Planned Releases</p>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold">{planned}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Releases In Progress</p>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold">{inProgress}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Deployed Releases</p>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold">{deployed}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Cancelled Releases</p>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold">{cancelled}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseMetrics;
