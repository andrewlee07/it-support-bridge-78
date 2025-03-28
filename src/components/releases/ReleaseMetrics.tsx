
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Archive, Clock, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReleaseMetricsProps {
  metrics: {
    planned: number;
    inProgress: number;
    deployed: number;
    cancelled: number;
  };
  isLoading: boolean;
  cardFilters?: string[];
  toggleCardFilter?: (filter: string) => void;
}

const ReleaseMetrics: React.FC<ReleaseMetricsProps> = ({ 
  metrics, 
  isLoading, 
  cardFilters = [], 
  toggleCardFilter = () => {} 
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="bg-secondary/50 border border-border/20 shadow-sm">
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
      <Card 
        className={cn(
          "cursor-pointer transition-colors bg-secondary/50 border border-border/20 shadow-sm",
          cardFilters.includes('planned') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''
        )}
        onClick={() => toggleCardFilter('planned')}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Planned Releases</p>
              <p className="text-2xl font-bold">{planned}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
              <Archive className="h-6 w-6 text-blue-700 dark:text-blue-300" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={cn(
          "cursor-pointer transition-colors bg-secondary/50 border border-border/20 shadow-sm",
          cardFilters.includes('in-progress') ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' : ''
        )}
        onClick={() => toggleCardFilter('in-progress')}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Releases In Progress</p>
              <p className="text-2xl font-bold">{inProgress}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/20">
              <Clock className="h-6 w-6 text-purple-700 dark:text-purple-300" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={cn(
          "cursor-pointer transition-colors bg-secondary/50 border border-border/20 shadow-sm",
          cardFilters.includes('deployed') ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : ''
        )}
        onClick={() => toggleCardFilter('deployed')}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Deployed Releases</p>
              <p className="text-2xl font-bold">{deployed}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/20">
              <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={cn(
          "cursor-pointer transition-colors bg-secondary/50 border border-border/20 shadow-sm",
          cardFilters.includes('cancelled') ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''
        )}
        onClick={() => toggleCardFilter('cancelled')}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Cancelled Releases</p>
              <p className="text-2xl font-bold">{cancelled}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
              <XCircle className="h-6 w-6 text-red-700 dark:text-red-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseMetrics;
