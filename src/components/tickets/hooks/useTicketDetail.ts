
import { useState, useEffect } from 'react';
import { Ticket } from '@/utils/types/ticket';

interface UseTicketDetailProps {
  tickets: Ticket[];
  initialId?: string;
}

export const useTicketDetail = ({ tickets, initialId }: UseTicketDetailProps) => {
  const [isViewingTicket, setIsViewingTicket] = useState<boolean>(!!initialId);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (initialId) {
      setIsViewingTicket(true);
      const ticket = tickets.find(t => t.id === initialId);
      if (ticket) {
        setSelectedTicket(ticket);
      }
    } else {
      setIsViewingTicket(false);
      setSelectedTicket(null);
    }
  }, [initialId, tickets]);

  return {
    isViewingTicket,
    selectedTicket,
    setIsViewingTicket,
    setSelectedTicket
  };
};
