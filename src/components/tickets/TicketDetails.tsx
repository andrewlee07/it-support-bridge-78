
import React from 'react';
import { Ticket, RelatedItem } from '@/utils/types/ticket';
import PriorityBadge from './detail/PriorityBadge';
import StatusBadge from './detail/StatusBadge';
import TicketDetailsGrid from './detail/TicketDetailsGrid';
import RelatedItemsList from './detail/RelatedItemsList';
import DetailBreadcrumb from './detail/DetailBreadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getProblemById } from '@/utils/mockData/problems';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAssetById } from '@/utils/mockData/assets';
import WatchButton from '@/components/shared/WatchButton';

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
  
  // Create related problems items array if it exists
  const relatedProblems: RelatedItem[] = (ticket.relatedProblems || []).map(id => {
    const problem = getProblemById(id);
    return {
      id,
      type: 'problem',
      title: problem?.title || `Problem ${id}`,
      status: problem?.status || 'unknown',
      createdAt: new Date() // Add a default createdAt property
    };
  });
  
  // Get associated assets
  const associatedAssets = (ticket.associatedAssets || []).map(id => {
    const asset = getAssetById(id);
    return asset ? {
      id: asset.id,
      name: asset.name,
      model: asset.model,
      type: asset.type,
      status: asset.status
    } : { 
      id, 
      name: `Asset ${id}`,
      model: 'Unknown',
      type: 'unknown',
      status: 'unknown'
    };
  });
  
  // Create a watchable item
  const watchableItem = {
    id: ticket.id,
    type: isServiceRequest ? 'service' : 'incident',
    title: ticket.title,
    status: ticket.status,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt
  };
  
  return (
    <div className="space-y-6">
      <DetailBreadcrumb 
        entityName={isServiceRequest ? "Service Request" : "Incident"}
        entityId={ticket.id}
        parentRoute={isServiceRequest ? "/service-requests" : "/incidents"}
        parentName={isServiceRequest ? "Service Requests" : "Incidents"}
      />
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-foreground">{ticket.title}</h1>
          <StatusBadge status={ticket.status} isServiceRequest={isServiceRequest} />
          <PriorityBadge priority={ticket.priority} isServiceRequest={isServiceRequest} />
          <WatchButton item={watchableItem} />
        </div>
        
        <p className="text-muted-foreground">{ticket.description}</p>
      </div>
      
      <TicketDetailsGrid ticket={ticket} isServiceRequest={isServiceRequest} />
      
      {/* Show associated assets section */}
      {associatedAssets.length > 0 && (
        <div className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Associated Assets</h3>
          </div>
          
          <Card className="p-4">
            <div className="space-y-2">
              {associatedAssets.map(asset => (
                <div key={asset.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">{asset.model} - {asset.type}</p>
                  </div>
                  <Badge variant={asset.status === 'active' ? 'default' : 'secondary'}>
                    {asset.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      
      {/* Show related problems section if there are any */}
      {relatedProblems.length > 0 && (
        <div className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Related Problems</h3>
          </div>
          
          <RelatedItemsList items={relatedProblems} />
        </div>
      )}
      
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
          <RelatedItemsList items={ticket.relatedItems} />
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
