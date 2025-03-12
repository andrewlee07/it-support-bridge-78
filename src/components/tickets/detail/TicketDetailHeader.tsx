
import React from 'react';
import { format } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { getUserNameById } from '@/utils/userUtils';
import WatchButton from '@/components/shared/WatchButton';
import { WatchableItemType } from '@/hooks/useWatchList';

interface TicketDetailHeaderProps {
  ticket: Ticket;
  isServiceRequest: boolean;
  onReopenClick?: () => void;
}

const TicketDetailHeader: React.FC<TicketDetailHeaderProps> = ({ 
  ticket, 
  isServiceRequest,
  onReopenClick
}) => {
  const isResolved = ['closed', 'resolved', 'fulfilled'].includes(ticket.status);
  
  // Create a watchable item - ensure type is correctly cast to WatchableItemType
  const itemType: WatchableItemType = isServiceRequest ? 'service' : 'incident';
  const watchableItem = {
    id: ticket.id,
    type: itemType,
    title: ticket.title,
    status: ticket.status,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">{ticket.id}</h1>
            <StatusBadge status={ticket.status} isServiceRequest={isServiceRequest} />
            <PriorityBadge priority={ticket.priority} isServiceRequest={isServiceRequest} />
            <WatchButton item={watchableItem} />
          </div>
          <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
          <div className="text-sm text-muted-foreground">
            <p>Created {format(new Date(ticket.createdAt), 'MMM d, yyyy')} by {getUserNameById(ticket.createdBy)}</p>
            {ticket.assignedTo && (
              <p>Assigned to {getUserNameById(ticket.assignedTo)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailHeader;
