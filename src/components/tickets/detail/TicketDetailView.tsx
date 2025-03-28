
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket } from '@/utils/types';

export interface TicketDetailViewProps {
  ticket: Ticket;
  onClose: () => void;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({ ticket, onClose }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">{ticket.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p>{ticket.status}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Priority</p>
            <p>{ticket.priority}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p>{ticket.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketDetailView;
