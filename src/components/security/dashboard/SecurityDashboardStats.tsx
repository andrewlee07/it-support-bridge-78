
import React from 'react';
import { ShieldAlert, ShieldCheck, UserX, Lock } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { cn } from '@/lib/utils';

interface SecurityDashboardStatsProps {
  totalCases: number;
  activeCasesCount: number;
  dataBreachesCount: number;
  complianceIssuesCount: number;
  cardFilters: {
    activeCases: boolean;
    dataBreaches: boolean;
    complianceIssues: boolean;
  };
  toggleCardFilter: (filterName: 'activeCases' | 'dataBreaches' | 'complianceIssues') => void;
}

const SecurityDashboardStats: React.FC<SecurityDashboardStatsProps> = ({
  totalCases,
  activeCasesCount,
  dataBreachesCount,
  complianceIssuesCount,
  cardFilters,
  toggleCardFilter
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Security Cases" 
        value={totalCases.toString()} 
        icon={ShieldAlert}
        description="All time security incidents"
        className="cursor-default"
      />
      <StatCard 
        title="Active Cases" 
        value={activeCasesCount.toString()} 
        icon={ShieldCheck}
        trend={{ value: 5, isPositive: false }}
        description="Currently open cases"
        className={cn(
          "cursor-pointer transition-all border-2", 
          cardFilters.activeCases ? "border-primary bg-primary/5" : "border-transparent"
        )}
        onClick={() => toggleCardFilter('activeCases')}
      />
      <StatCard 
        title="Data Breaches" 
        value={dataBreachesCount.toString()} 
        icon={UserX}
        trend={{ value: 2, isPositive: false }}
        description="In current quarter"
        className={cn(
          "cursor-pointer transition-all border-2", 
          cardFilters.dataBreaches ? "border-primary bg-primary/5" : "border-transparent"
        )}
        onClick={() => toggleCardFilter('dataBreaches')}
      />
      <StatCard 
        title="Compliance Issues" 
        value={complianceIssuesCount.toString()} 
        icon={Lock}
        trend={{ value: 10, isPositive: true }}
        description="Pending resolution"
        className={cn(
          "cursor-pointer transition-all border-2", 
          cardFilters.complianceIssues ? "border-primary bg-primary/5" : "border-transparent"
        )}
        onClick={() => toggleCardFilter('complianceIssues')}
      />
    </div>
  );
};

export default SecurityDashboardStats;
