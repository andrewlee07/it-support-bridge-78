
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface TicketDetailsProps {
  ticket: Ticket;
  type?: 'incident' | 'service';
  onReopen?: () => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ 
  ticket, 
  type = 'incident',
  onReopen
}) => {
  const isServiceRequest = type === 'service';
  
  // Check if ticket can be reopened
  const canReopen = ticket.status === (isServiceRequest ? 'fulfilled' : 'resolved');
  
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
    <div className="space-y-4">
      {canReopen && onReopen && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={onReopen}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Re-open {isServiceRequest ? 'Request' : 'Incident'}
          </Button>
        </div>
      )}
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
    </div>
  );
};

export default TicketDetails;
