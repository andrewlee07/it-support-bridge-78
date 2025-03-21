
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket } from '@/utils/types/ticket';
import { UpdateTicketValues } from '../TicketUpdateForm';
import { CloseTicketValues } from '../TicketCloseForm';

interface DetailsTabProps {
  ticket: Ticket;
  type: 'incident' | 'service' | 'security';
  onUpdate?: (data: UpdateTicketValues) => void;
  onClose?: (data: CloseTicketValues) => void;
  onDetailsTabReopen?: () => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  ticket,
  type,
  onUpdate,
  onClose,
  onDetailsTabReopen
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {type === 'service' ? 'Request Details' : 
           type === 'security' ? 'Security Case Details' : 'Incident Details'}
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
            <p>{ticket.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p>{ticket.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p>{ticket.status}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
              <p>{ticket.priority}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
              <p>{ticket.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created By</h3>
              <p>{ticket.createdBy}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsTab;
