
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';

interface TicketDetailsProps {
  ticket: Ticket;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium">Status</h3>
        <Badge className={ticket.status === 'open' 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          : ticket.status === 'in-progress'
          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
          : ticket.status === 'resolved' || ticket.status === 'fulfilled'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }>
          {ticket.status}
        </Badge>
      </div>
      <div>
        <h3 className="text-sm font-medium">Priority</h3>
        <Badge className={ticket.priority === 'P1' 
          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          : ticket.priority === 'P2'
          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
          : ticket.priority === 'P3'
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }>
          {ticket.priority}
        </Badge>
      </div>
      <div>
        <h3 className="text-sm font-medium">Reported By</h3>
        <p className="text-sm">{ticket.createdBy}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Assigned To</h3>
        <p className="text-sm">{ticket.assignedTo || 'Unassigned'}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Created</h3>
        <p className="text-sm">{format(new Date(ticket.createdAt), 'MMM d, yyyy HH:mm')}</p>
      </div>
      {ticket.resolvedAt && (
        <div>
          <h3 className="text-sm font-medium">Resolved</h3>
          <p className="text-sm">{format(new Date(ticket.resolvedAt), 'MMM d, yyyy HH:mm')}</p>
        </div>
      )}
      <div className="md:col-span-2">
        <h3 className="text-sm font-medium">Description</h3>
        <p className="text-sm mt-1">{ticket.description}</p>
      </div>
    </div>
  );
};

export default TicketDetails;
