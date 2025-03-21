
import React from 'react';
import { Ticket } from '@/utils/types/ticket';

interface TicketDetailProps {
  ticket: Ticket;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{ticket.title}</h1>
      <div className="glass-panel p-6 rounded-lg">
        <p>{ticket.description}</p>
      </div>
    </div>
  );
};

export default TicketDetail;
