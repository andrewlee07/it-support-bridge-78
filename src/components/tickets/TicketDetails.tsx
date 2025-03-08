
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import PriorityBadge from './detail/PriorityBadge';
import StatusBadge from './detail/StatusBadge';
import TicketDetailsGrid from './detail/TicketDetailsGrid';
import RelatedItemsList from './detail/RelatedItemsList';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface TicketDetailsProps {
  ticket: Ticket;
  type: 'incident' | 'service';
  onReopen?: () => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ 
  ticket, 
  type,
  onReopen
}) => {
  const isServiceRequest = type === 'service';
  const isResolved = ['closed', 'resolved', 'fulfilled'].includes(ticket.status);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">{ticket.title}</h1>
          <StatusBadge status={ticket.status} isServiceRequest={isServiceRequest} />
          <PriorityBadge priority={ticket.priority} isServiceRequest={isServiceRequest} />
        </div>
        
        <p className="text-muted-foreground">{ticket.description}</p>
      </div>
      
      <TicketDetailsGrid ticket={ticket} isServiceRequest={isServiceRequest} />
      
      {/* Show related items section */}
      <div className="space-y-4 mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-medium">
            {isServiceRequest 
              ? 'Related Backlog Items' 
              : 'Related Bugs'}
          </h3>
        </div>
        
        {ticket.relatedItems && ticket.relatedItems.length > 0 ? (
          <RelatedItemsList 
            items={ticket.relatedItems} 
            type={type}
          />
        ) : (
          <div className="text-muted-foreground italic text-sm">
            No {isServiceRequest ? 'backlog items' : 'bugs'} have been created from this {isServiceRequest ? 'service request' : 'incident'}.
          </div>
        )}
      </div>
      
      {isResolved && onReopen && (
        <div className="mt-4">
          <Button
            onClick={onReopen}
            variant="outline"
            size="sm"
          >
            Reopen {isServiceRequest ? 'Request' : 'Incident'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
