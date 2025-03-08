
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, User } from 'lucide-react';
import { Ticket } from '@/utils/types';
import { getUserById } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const navigate = useNavigate();
  
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
      case 'P1':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'P2':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'P3':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'P4':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
    }
  };

  const creator = getUserById(ticket.createdBy);
  const assignee = ticket.assignedTo ? getUserById(ticket.assignedTo) : null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getRouteForTicket = (ticketType: string): string => {
    if (ticketType === 'service') {
      return '/service-requests';
    } else if (ticketType === 'change') {
      return '/changes';
    } 
    return '/incidents';
  };
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const baseRoute = getRouteForTicket(ticket.type);
    navigate(`${baseRoute}/${ticket.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={cn("mb-2 capitalize", getStatusBadgeClass(ticket.status))}>
            {ticket.status.replace('-', ' ')}
          </Badge>
          <Badge variant="outline" className={cn("capitalize", getPriorityBadgeClass(ticket.priority))}>
            {ticket.priority}
          </Badge>
        </div>
        <CardTitle className="text-lg font-medium line-clamp-1">{ticket.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <User className="h-3 w-3" /> 
          {creator?.name || 'Unknown User'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
          <CalendarClock className="h-3 w-3" /> 
          Created on {formatDate(ticket.createdAt)}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="text-xs">
          {assignee ? (
            <span className="text-muted-foreground">
              Assigned to <span className="font-medium text-foreground">{assignee.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Unassigned</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
