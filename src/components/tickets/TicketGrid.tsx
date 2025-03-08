
import React from 'react';
import { Ticket } from '@/utils/types/ticket';
import TicketCard from './TicketCard';

interface TicketGridProps {
  tickets: Ticket[];
  onTicketClick: (ticketId: string) => void;
}

const TicketGrid: React.FC<TicketGridProps> = ({ tickets, onTicketClick }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <TicketCard 
            ticket={ticket} 
            onClick={() => onTicketClick(ticket.id)} 
          />
        </div>
      ))}
    </div>
  );
};

export default TicketGrid;
