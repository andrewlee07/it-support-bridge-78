
import React from 'react';
import { ShieldAlert, ShieldCheck, UserX, Lock } from 'lucide-react';
import StatCardGrid from '@/components/dashboard/StatCardGrid';

interface SecurityDashboardStatsProps {
  totalCases: number;
  activeCasesCount: number;
  dataBreachesCount: number;
  complianceIssuesCount: number;
  cardFilters: string[];
  toggleCardFilter: (filterName: string) => void;
}

const SecurityDashboardStats: React.FC<SecurityDashboardStatsProps> = ({
  totalCases,
  activeCasesCount,
  dataBreachesCount,
  complianceIssuesCount,
  cardFilters,
  toggleCardFilter
}) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Security Cases',
      value: totalCases,
      icon: ShieldAlert,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'activeCases',
      title: 'Active Cases',
      value: activeCasesCount,
      icon: ShieldCheck,
      iconColor: 'text-blue-700 dark:text-blue-300',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      id: 'dataBreaches',
      title: 'Data Breaches',
      value: dataBreachesCount,
      icon: UserX,
      iconColor: 'text-red-700 dark:text-red-300',
      iconBgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      id: 'complianceIssues',
      title: 'Compliance Issues',
      value: complianceIssuesCount,
      icon: Lock,
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

export default SecurityDashboardStats;
