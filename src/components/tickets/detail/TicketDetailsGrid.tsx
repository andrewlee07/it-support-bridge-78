
import React from 'react';
import { format } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { getServiceById } from '@/utils/mockData/services';

interface TicketDetailsGridProps {
  ticket: Ticket;
  isServiceRequest: boolean;
}

const TicketDetailsGrid: React.FC<TicketDetailsGridProps> = ({ ticket, isServiceRequest }) => {
  // Get service details if a serviceId is present
  const service = ticket.serviceId ? getServiceById(ticket.serviceId) : null;
  
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium">Status</h3>
        <StatusBadge status={ticket.status} isServiceRequest={isServiceRequest} />
      </div>
      <div>
        <h3 className="text-sm font-medium">Priority</h3>
        <PriorityBadge priority={ticket.priority} isServiceRequest={isServiceRequest} />
      </div>
      <div>
        <h3 className="text-sm font-medium">Reported By</h3>
        <p className="text-sm">{ticket.createdBy}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Assigned To</h3>
        <p className="text-sm">{ticket.assignedTo || 'Unassigned'}</p>
      </div>
      
      {service && (
        <div>
          <h3 className="text-sm font-medium">Service</h3>
          <p className="text-sm">{service.name}</p>
        </div>
      )}
      
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

export default TicketDetailsGrid;
