
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, AlertTriangle, Clock, BarChart2 } from 'lucide-react';

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
  const isFilterActive = (filter: string) => cardFilters.includes(filter);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('all') ? 'bg-blue-50 border-blue-200' : ''}`}
        onClick={() => toggleCardFilter('all')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Incidents</p>
            <p className="text-2xl font-bold">{totalTickets}</p>
          </div>
          <BarChart2 className="h-8 w-8 text-muted-foreground opacity-75" />
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('active') ? 'bg-blue-50 border-blue-200' : ''}`}
        onClick={() => toggleCardFilter('active')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Incidents</p>
            <p className="text-2xl font-bold">{activeTicketsCount}</p>
          </div>
          <Clock className="h-8 w-8 text-blue-500 opacity-75" />
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('critical') ? 'bg-red-50 border-red-200' : ''}`}
        onClick={() => toggleCardFilter('critical')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Critical Incidents</p>
            <p className="text-2xl font-bold">{criticalTicketsCount}</p>
          </div>
          <AlertCircle className="h-8 w-8 text-red-500 opacity-75" />
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-colors ${isFilterActive('pending') ? 'bg-amber-50 border-amber-200' : ''}`}
        onClick={() => toggleCardFilter('pending')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending Incidents</p>
            <p className="text-2xl font-bold">{pendingTicketsCount}</p>
          </div>
          <AlertTriangle className="h-8 w-8 text-amber-500 opacity-75" />
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentDashboardStats;
