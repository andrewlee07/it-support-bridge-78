
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getUserNameById } from '@/utils/userUtils';
import { format } from 'date-fns';
import DetailBreadcrumb from './DetailBreadcrumb';
import WatchButton from '@/components/shared/WatchButton';

interface TicketDetailHeaderProps {
  ticket: Ticket;
  isServiceRequest?: boolean;
  canReopen?: boolean;
  isResolved?: boolean;
  onReopen?: () => void;
  onResolve?: () => void;
  onReopenClick?: () => void; // Add this prop to support both naming conventions
  children?: React.ReactNode;
}

const TicketDetailHeader: React.FC<TicketDetailHeaderProps> = ({
  ticket,
  isServiceRequest = false,
  canReopen = false,
  isResolved = false,
  onReopen,
  onResolve,
  onReopenClick,
  children
}) => {
  // Use onReopenClick if provided, otherwise use onReopen
  const handleReopen = onReopenClick || onReopen;
  
  const typeLabel = isServiceRequest ? 'Service Request' : 'Incident';
  const parentPath = isServiceRequest ? '/service-requests' : '/incidents';
  
  const badgeColor = ticket.priority === 'P1' || ticket.priority === 'high'
    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    : ticket.priority === 'P2'
    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    : ticket.priority === 'P3' || ticket.priority === 'medium'
    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  
  const statusColor = 
    ticket.status === 'open' || ticket.status === 'new'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : ticket.status === 'in-progress'
      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      : ticket.status === 'pending' || ticket.status === 'on-hold'
      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      : ticket.status === 'resolved' || ticket.status === 'fulfilled'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : ticket.status === 'closed'
      ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  
  const watchableItem = {
    id: ticket.id,
    type: ticket.type as any,
    title: ticket.title,
    status: ticket.status,
    createdAt: new Date(ticket.createdAt),
    updatedAt: new Date(ticket.updatedAt)
  };

  return (
    <div className="space-y-4">
      <DetailBreadcrumb
        entityName={typeLabel}
        entityId={ticket.id}
        parentRoute={parentPath}
        parentName={isServiceRequest ? 'Service Requests' : 'Incidents'}
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{ticket.title}</h1>
          <WatchButton item={watchableItem} />
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {!isResolved ? (
            <Button variant="default" size="sm" onClick={onResolve}>
              {isServiceRequest ? 'Fulfill Request' : 'Resolve Incident'}
            </Button>
          ) : canReopen ? (
            <Button variant="outline" size="sm" onClick={handleReopen}>
              Reopen
            </Button>
          ) : null}
          
          {children}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-1">
        <Badge variant="outline">{ticket.id}</Badge>
        <Badge className={badgeColor}>{ticket.priority}</Badge>
        <Badge className={statusColor}>{ticket.status}</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Assigned To</p>
          <p>{ticket.assignedTo ? getUserNameById(ticket.assignedTo) : 'Unassigned'}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Created By</p>
          <p>{getUserNameById(ticket.createdBy)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Created At</p>
          <p>{format(new Date(ticket.createdAt), 'PPP')}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailHeader;
