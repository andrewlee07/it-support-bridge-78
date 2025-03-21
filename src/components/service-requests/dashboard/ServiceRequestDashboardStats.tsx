
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card 
        className={cn(
          "cursor-pointer transition-colors hover:bg-muted/50",
          cardFilters.includes('all') ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/20" : ""
        )} 
        onClick={() => toggleCardFilter('all')}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
            <p className="text-3xl font-bold">{totalTickets}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/20">
            <Inbox className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors hover:bg-muted/50",
          cardFilters.includes('active') ? "border-purple-400 bg-purple-50/50 dark:bg-purple-900/20" : ""
        )} 
        onClick={() => toggleCardFilter('active')}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Active Requests</p>
            <p className="text-3xl font-bold">{activeTicketsCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/20">
            <Clock className="h-6 w-6 text-purple-700 dark:text-purple-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors hover:bg-muted/50",
          cardFilters.includes('high-priority') ? "border-red-400 bg-red-50/50 dark:bg-red-900/20" : ""
        )} 
        onClick={() => toggleCardFilter('high-priority')}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">High Priority</p>
            <p className="text-3xl font-bold">{highPriorityCount}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/20">
            <Bell className="h-6 w-6 text-red-700 dark:text-red-300" />
          </div>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "cursor-pointer transition-colors hover:bg-muted/50",
          cardFilters.includes('pending-approval') ? "border-amber-400 bg-amber-50/50 dark:bg-amber-900/20" : ""
        )} 
        onClick={() => toggleCardFilter('pending-approval')}
      >
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
            <p className="text-3xl font-bold">{pendingApprovalCount}</p>
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
