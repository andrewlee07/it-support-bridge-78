
import React from 'react';
import { Bug } from '@/utils/types/test/bug';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Clock, Flame, AlertTriangle, BarChart2 } from 'lucide-react';

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
  const totalBugs = bugs.length;
  const openBugs = bugs.filter(bug => bug.status === 'open').length;
  const inProgressBugs = bugs.filter(bug => bug.status === 'in-progress').length;
  const criticalBugs = bugs.filter(bug => bug.severity === 'critical').length;
  const highPriorityBugs = bugs.filter(bug => bug.priority === 'high').length;

  const isFilterActive = (type: 'status' | 'severity', value: string) => {
    return (type === 'status' && activeStatusFilter === value) || 
           (type === 'severity' && activeSeverityFilter === value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('status', 'all') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''}`}
        onClick={() => onStatusClick?.(null)}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Bugs</p>
            <p className="text-2xl font-bold">{totalBugs}</p>
          </div>
          <BarChart2 className="h-8 w-8 text-muted-foreground opacity-75" />
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('status', 'open') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''}`}
        onClick={() => onStatusClick?.('open')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Open Bugs</p>
            <p className="text-2xl font-bold">{openBugs}</p>
          </div>
          <AlertCircle className="h-8 w-8 text-blue-500 opacity-75" />
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('status', 'in-progress') ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' : ''}`}
        onClick={() => onStatusClick?.('in-progress')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">In Progress</p>
            <p className="text-2xl font-bold">{inProgressBugs}</p>
          </div>
          <Clock className="h-8 w-8 text-yellow-500 opacity-75" />
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('severity', 'critical') ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''}`}
        onClick={() => onSeverityClick?.('critical')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Critical Bugs</p>
            <p className="text-2xl font-bold">{criticalBugs}</p>
          </div>
          <Flame className="h-8 w-8 text-red-500 opacity-75" />
        </CardContent>
      </Card>
    </div>
  );
};

export default BugDashboardStats;
