
import React from 'react';
import { Inbox, Clock, Bell, CheckCircle } from 'lucide-react';
import StatCardGrid from '@/components/dashboard/StatCardGrid';

interface ServiceRequestStatsProps {
  totalTickets: number;
  activeTicketsCount: number;
  highPriorityCount: number;
  pendingApprovalCount: number;
  cardFilters: string[];
  toggleCardFilter: (filter: string) => void;
}

const ServiceRequestDashboardStats: React.FC<ServiceRequestStatsProps> = ({
  totalTickets,
  activeTicketsCount,
  highPriorityCount,
  pendingApprovalCount,
  cardFilters,
  toggleCardFilter
}) => {
  const cards = [
    {
      id: 'all',
      title: 'Total Requests',
      value: totalTickets,
      icon: Inbox,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'active',
      title: 'Active Requests',
      value: activeTicketsCount,
      icon: Clock,
      iconColor: 'text-purple-700 dark:text-purple-300',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      id: 'high-priority',
      title: 'High Priority',
      value: highPriorityCount,
      icon: Bell,
      iconColor: 'text-red-700 dark:text-red-300',
      iconBgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      id: 'pending-approval',
      title: 'Pending Approval',
      value: pendingApprovalCount,
      icon: CheckCircle,
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

export default ServiceRequestDashboardStats;
