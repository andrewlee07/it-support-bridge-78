
import React from 'react';
import { Bug } from '@/utils/types/test/bug';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BugDashboardStatsProps {
  bugs: Bug[];
  onStatusClick?: (status: string | null) => void;
  onSeverityClick?: (severity: string | null) => void;
  activeStatusFilter: string | null;
  activeSeverityFilter: string | null;
}

const BugDashboardStats: React.FC<BugDashboardStatsProps> = ({
  bugs,
  onStatusClick,
  onSeverityClick,
  activeStatusFilter,
  activeSeverityFilter
}) => {
  const openBugs = bugs.filter(bug => bug.status === 'open').length;
  const inProgressBugs = bugs.filter(bug => bug.status === 'in-progress').length;
  const criticalBugs = bugs.filter(bug => bug.severity === 'critical').length;
  const highBugs = bugs.filter(bug => bug.severity === 'high').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card 
        className={cn(
          "cursor-pointer hover:shadow-md transition-shadow",
          activeStatusFilter === 'open' ? "ring-2 ring-primary" : ""
        )}
        onClick={() => onStatusClick?.(activeStatusFilter === 'open' ? null : 'open')}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Open Bugs</p>
              <h3 className="text-3xl font-bold mt-1">{openBugs}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl">📝</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer hover:shadow-md transition-shadow",
          activeStatusFilter === 'in-progress' ? "ring-2 ring-primary" : ""
        )}
        onClick={() => onStatusClick?.(activeStatusFilter === 'in-progress' ? null : 'in-progress')}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <h3 className="text-3xl font-bold mt-1">{inProgressBugs}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⚙️</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer hover:shadow-md transition-shadow",
          activeSeverityFilter === 'critical' ? "ring-2 ring-primary" : ""
        )}
        onClick={() => onSeverityClick?.(activeSeverityFilter === 'critical' ? null : 'critical')}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Bugs</p>
              <h3 className="text-3xl font-bold mt-1">{criticalBugs}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-xl">🔥</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer hover:shadow-md transition-shadow",
          activeSeverityFilter === 'high' ? "ring-2 ring-primary" : ""
        )}
        onClick={() => onSeverityClick?.(activeSeverityFilter === 'high' ? null : 'high')}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">High Priority</p>
              <h3 className="text-3xl font-bold mt-1">{highBugs}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 text-xl">⚠️</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BugDashboardStats;
