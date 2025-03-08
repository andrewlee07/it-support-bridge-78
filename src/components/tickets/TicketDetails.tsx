
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import ReopenButton from './detail/ReopenButton';
import TicketDetailsGrid from './detail/TicketDetailsGrid';

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
  
  return (
    <div className="space-y-4">
      {canReopen && onReopen && (
        <div className="flex justify-end">
          <ReopenButton isServiceRequest={isServiceRequest} onReopen={onReopen} />
        </div>
      )}
      <TicketDetailsGrid ticket={ticket} isServiceRequest={isServiceRequest} />
    </div>
  );
};

export default TicketDetails;
