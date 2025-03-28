
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, ShieldCheck, UserX, Lock } from 'lucide-react';
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="cursor-default">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Security Cases</p>
            <p className="text-2xl font-bold">{totalCases}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <ShieldAlert className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.activeCases ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''
        )}
        onClick={() => toggleCardFilter('activeCases')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Cases</p>
            <p className="text-2xl font-bold">{activeCasesCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <ShieldCheck className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.dataBreaches ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''
        )}
        onClick={() => toggleCardFilter('dataBreaches')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Data Breaches</p>
            <p className="text-2xl font-bold">{dataBreachesCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
            <UserX className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.complianceIssues ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' : ''
        )}
        onClick={() => toggleCardFilter('complianceIssues')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Compliance Issues</p>
            <p className="text-2xl font-bold">{complianceIssuesCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900/20">
            <Lock className="h-6 w-6 text-amber-700 dark:text-amber-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboardStats;
