
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, CheckCircle, Clock, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Requests</p>
            <p className="text-2xl font-bold">{totalTickets}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <Inbox className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('active') ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' : ''
        )}
        onClick={() => toggleCardFilter('active')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Requests</p>
            <p className="text-2xl font-bold">{activeTicketsCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/20">
            <Clock className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('high-priority') ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : ''
        )}
        onClick={() => toggleCardFilter('high-priority')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">High Priority</p>
            <p className="text-2xl font-bold">{highPriorityCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
            <Bell className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors",
          cardFilters.includes('pending-approval') ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' : ''
        )}
        onClick={() => toggleCardFilter('pending-approval')}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending Approval</p>
            <p className="text-2xl font-bold">{pendingApprovalCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900/20">
            <CheckCircle className="h-6 w-6 text-amber-700 dark:text-amber-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequestDashboardStats;
