
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';

interface TicketDetailsProps {
  ticket: Ticket;
  type?: 'incident' | 'service';
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, type = 'incident' }) => {
  const isServiceRequest = type === 'service';
  
  // Custom status classes for service requests vs incidents
  const getStatusBadgeClass = (status: string) => {
    if (isServiceRequest) {
      switch(status) {
        case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'in-progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        case 'fulfilled': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      }
    } else {
      // Original incident status styling
      return status === 'open' 
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        : status === 'in-progress'
        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        : status === 'resolved' || status === 'fulfilled'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatPriority = (priority: string) => {
    // For service requests, show Low/Medium/High rather than P1-P4
    if (isServiceRequest) {
      switch(priority) {
        case 'P1': return 'High';
        case 'P2': return 'High';
        case 'P3': return 'Medium';
        case 'P4': return 'Low';
        default: return priority;
      }
    }
    return priority;
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium">Status</h3>
        <Badge className={getStatusBadgeClass(ticket.status)}>
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
          {formatPriority(ticket.priority)}
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
        <h3 className="text-sm font-medium">{isServiceRequest ? 'Request Type' : 'Category'}</h3>
        <p className="text-sm">{ticket.category}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Created</h3>
        <p className="text-sm">{format(new Date(ticket.createdAt), 'MMM d, yyyy HH:mm')}</p>
      </div>
      {ticket.resolvedAt && (
        <div>
          <h3 className="text-sm font-medium">{isServiceRequest ? 'Fulfilled' : 'Resolved'}</h3>
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
