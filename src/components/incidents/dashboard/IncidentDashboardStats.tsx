
import React from 'react';
import { BarChart2, Clock, AlertCircle, AlertTriangle } from 'lucide-react';
import StatCardGrid from '@/components/dashboard/StatCardGrid';

interface IncidentDashboardStatsProps {
  totalTickets: number;
  activeTicketsCount: number;
  criticalTicketsCount: number;
  pendingTicketsCount: number;
  cardFilters: string[];
  toggleCardFilter: (filter: string) => void;
}

const IncidentDashboardStats: React.FC<IncidentDashboardStatsProps> = ({
  totalTickets,
  activeTicketsCount,
  criticalTicketsCount,
  pendingTicketsCount,
  cardFilters,
  toggleCardFilter
}) => {
  const cards = [
    {
      id: 'all',
      title: 'Total Incidents',
      value: totalTickets,
      icon: BarChart2,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'active',
      title: 'Active Incidents',
      value: activeTicketsCount,
      icon: Clock,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'critical',
      title: 'Critical Incidents',
      value: criticalTicketsCount,
      icon: AlertCircle,
      iconColor: 'text-red-700 dark:text-red-300',
      iconBgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      id: 'pending',
      title: 'Pending Incidents',
      value: pendingTicketsCount,
      icon: AlertTriangle,
      iconColor: 'text-amber-700 dark:text-amber-300',
      iconBgColor: 'bg-amber-100 dark:bg-amber-900/20',
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

export default IncidentDashboardStats;
