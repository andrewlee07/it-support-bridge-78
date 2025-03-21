
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bug } from '@/utils/types/test/bug';

interface BugDashboardStatsProps {
  bugs: Bug[];
}

const BugDashboardStats: React.FC<BugDashboardStatsProps> = ({ bugs }) => {
  // Calculate stats
  const totalBugs = bugs.length;
  const openBugs = bugs.filter(bug => bug.status === 'open').length;
  const criticalBugs = bugs.filter(bug => 
    (bug.priority === 'high' || bug.severity === 'critical') && 
    bug.status !== 'closed'
  ).length;
  const inProgressBugs = bugs.filter(bug => bug.status === 'in-progress').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-secondary/50 border border-border/20 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <p className="text-sm font-medium text-muted-foreground">Total Bugs</p>
            <div className="text-4xl font-bold">{totalBugs}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/50 border border-border/20 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <p className="text-sm font-medium text-muted-foreground">Open Bugs</p>
            <div className="text-4xl font-bold">{openBugs}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/50 border border-border/20 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <p className="text-sm font-medium text-muted-foreground">Critical Bugs</p>
            <div className="text-4xl font-bold">{criticalBugs}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/50 border border-border/20 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
            <div className="text-4xl font-bold">{inProgressBugs}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BugDashboardStats;
