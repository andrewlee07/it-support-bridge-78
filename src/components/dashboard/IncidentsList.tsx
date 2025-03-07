import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, User } from '@/utils/types';
import { getUserById } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface IncidentsListProps {
  tickets: Ticket[];
  compact?: boolean;
}

const IncidentsList: React.FC<IncidentsListProps> = ({ tickets, compact = false }) => {
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const getPriorityBadgeClass = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const getUserName = (userId: string): string => {
    const user = getUserById(userId);
    return user ? user.name : 'Unknown User';
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/40">
            <th className="text-left font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">
              ID
            </th>
            <th className="text-left font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">
              Title
            </th>
            {!compact && (
              <>
                <th className="text-left font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">
                  Created by
                </th>
                <th className="text-left font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">
                  Date
                </th>
              </>
            )}
            <th className="text-left font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">
              Status
            </th>
            <th className="text-left font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">
              Priority
            </th>
            {!compact && (
              <th className="text-left font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={compact ? 4 : 7} className="py-4 text-center text-muted-foreground">
                No tickets found
              </td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-muted/40 transition-colors">
                <td className="py-3 text-sm">
                  <span className="font-mono text-xs">{ticket.id}</span>
                </td>
                <td className="py-3 text-sm font-medium">
                  <Link to={`/tickets/${ticket.id}`} className="hover:text-primary">
                    {ticket.title}
                  </Link>
                </td>
                {!compact && (
                  <>
                    <td className="py-3 text-sm">
                      {getUserName(ticket.createdBy)}
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {formatDate(ticket.createdAt)}
                    </td>
                  </>
                )}
                <td className="py-3 text-sm">
                  <Badge variant="outline" className={cn("capitalize", getStatusBadgeClass(ticket.status))}>
                    {ticket.status.replace('-', ' ')}
                  </Badge>
                </td>
                <td className="py-3 text-sm">
                  <Badge variant="outline" className={cn("capitalize", getPriorityBadgeClass(ticket.priority))}>
                    {ticket.priority}
                  </Badge>
                </td>
                {!compact && (
                  <td className="py-3 text-sm">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/tickets/${ticket.id}`}>View</Link>
                    </Button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentsList;
