
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket, TicketPriority, TicketStatus } from '@/utils/types/ticket';
import { CalendarDays, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import WatchButton from '@/components/shared/WatchButton';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'P1':
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'P2':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'P3':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'P4':
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open':
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'approved':
      case 'fulfilled':
      case 'on-hold':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const watchableItem = {
    id: ticket.id,
    type: ticket.type as any,
    title: ticket.title,
    status: ticket.status,
    createdAt: new Date(ticket.createdAt),
    updatedAt: new Date(ticket.updatedAt)
  };

  return (
    <Card 
      className="shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer relative" 
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <WatchButton item={watchableItem} />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="text-xs text-muted-foreground mb-1">{ticket.id}</div>
            <h3 className="text-base font-semibold leading-tight">{ticket.title}</h3>
          </div>
          <Badge className={getPriorityColor(ticket.priority)}>
            {ticket.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {ticket.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Badge className={getStatusColor(ticket.status)}>
            {ticket.status}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="h-3 w-3 mr-1" />
            {ticket.assignedTo ? ticket.assignedTo : 'Unassigned'}
          </div>
          <div className="flex items-center text-xs text-muted-foreground justify-end">
            <Clock className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
