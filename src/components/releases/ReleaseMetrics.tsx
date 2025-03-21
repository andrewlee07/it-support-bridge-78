
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
          <Card key={i} className="bg-background border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="h-16 animate-pulse bg-gray-800/50 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { planned, inProgress, deployed, cancelled } = metrics;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-background border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <p className="text-sm font-medium text-muted-foreground">Planned Releases</p>
            <div className="text-4xl font-bold text-foreground">{planned}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-background border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <p className="text-sm font-medium text-muted-foreground">Releases In Progress</p>
            <div className="text-4xl font-bold text-foreground">{inProgress}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-background border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <p className="text-sm font-medium text-muted-foreground">Deployed Releases</p>
            <div className="text-4xl font-bold text-foreground">{deployed}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-background border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <p className="text-sm font-medium text-muted-foreground">Cancelled Releases</p>
            <div className="text-4xl font-bold text-foreground">{cancelled}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseMetrics;
