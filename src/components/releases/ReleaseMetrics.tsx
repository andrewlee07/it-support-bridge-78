
import React from 'react';
import { Archive, Clock, CheckCircle, XCircle } from 'lucide-react';
import StatCardGrid from '@/components/dashboard/StatCardGrid';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-[104px] animate-pulse bg-secondary/50 border border-border/20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  const { planned, inProgress, deployed, cancelled } = metrics;

  const cards = [
    {
      id: 'planned',
      title: 'Planned Releases',
      value: planned,
      icon: Archive,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'in-progress',
      title: 'Releases In Progress',
      value: inProgress,
      icon: Clock,
      iconColor: 'text-purple-700 dark:text-purple-300',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      id: 'deployed',
      title: 'Deployed Releases',
      value: deployed,
      icon: CheckCircle,
      iconColor: 'text-green-700 dark:text-green-300',
      iconBgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      id: 'cancelled',
      title: 'Cancelled Releases',
      value: cancelled,
      icon: XCircle,
      iconColor: 'text-red-700 dark:text-red-300',
      iconBgColor: 'bg-red-100 dark:bg-red-900/20',
    },
  ];

  return (
    <StatCardGrid 
      cards={cards} 
      activeCardIds={cardFilters} 
      onCardClick={toggleCardFilter} 
    />
  );
};

export default ReleaseMetrics;
