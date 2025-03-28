
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, AlertTriangle, Clock, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('all') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''
        )}
        onClick={() => toggleCardFilter('all')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Incidents</p>
            <p className="text-2xl font-bold">{totalTickets}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <BarChart2 className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('active') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''
        )}
        onClick={() => toggleCardFilter('active')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Incidents</p>
            <p className="text-2xl font-bold">{activeTicketsCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <Clock className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('critical') ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''
        )}
        onClick={() => toggleCardFilter('critical')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Critical Incidents</p>
            <p className="text-2xl font-bold">{criticalTicketsCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
            <AlertCircle className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('pending') ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' : ''
        )}
        onClick={() => toggleCardFilter('pending')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending Incidents</p>
            <p className="text-2xl font-bold">{pendingTicketsCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900/20">
            <AlertTriangle className="h-6 w-6 text-amber-700 dark:text-amber-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentDashboardStats;
