
import React from 'react';
import { Bug } from '@/utils/types/test/bug';
import { BarChart2, AlertCircle, Clock, Flame } from 'lucide-react';
import StatCardGrid from '@/components/dashboard/StatCardGrid';

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

  const handleClick = (id: string) => {
    if (id === 'all') {
      onStatusClick?.(null);
    } else if (id === 'open') {
      onStatusClick?.('open');
    } else if (id === 'in-progress') {
      onStatusClick?.('in-progress');
    } else if (id === 'critical') {
      onSeverityClick?.('critical');
    }
  };

  const activeCardIds = [];
  if (activeStatusFilter === null && activeSeverityFilter === null) activeCardIds.push('all');
  if (activeStatusFilter === 'open') activeCardIds.push('open');
  if (activeStatusFilter === 'in-progress') activeCardIds.push('in-progress');
  if (activeSeverityFilter === 'critical') activeCardIds.push('critical');

  const cards = [
    {
      id: 'all',
      title: 'Total Bugs',
      value: totalBugs,
      icon: BarChart2,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'open',
      title: 'Open Bugs',
      value: openBugs,
      icon: AlertCircle,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      value: inProgressBugs,
      icon: Clock,
      iconColor: 'text-yellow-700 dark:text-yellow-300',
      iconBgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      id: 'critical',
      title: 'Critical Bugs',
      value: criticalBugs,
      icon: Flame,
      iconColor: 'text-red-700 dark:text-red-300',
      iconBgColor: 'bg-red-100 dark:bg-red-900/20',
    },
  ];

  return (
    <StatCardGrid 
      cards={cards} 
      activeCardIds={activeCardIds} 
      onCardClick={handleClick} 
    />
  );
};

export default BugDashboardStats;
