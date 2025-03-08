
import { useState, useEffect } from 'react';
import { getTicketById } from '@/utils/mockData/tickets';
import { Ticket, TicketWithNotes } from '@/utils/types/ticket';

export const useTicketFetch = (id: string | undefined) => {
  const [ticket, setTicket] = useState<TicketWithNotes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedTicket = getTicketById(id);
          if (fetchedTicket) {
            // Initialize notes array if it doesn't exist
            setTicket({
              ...fetchedTicket,
              notes: fetchedTicket.notes || [],
              // Add sample related items for testing
              relatedItems: fetchedTicket.relatedItems || [],
              // Make sure audit is initialized
              audit: fetchedTicket.audit || []
            });
          } else {
            setError('Ticket not found');
          }
        } else {
          setError('Invalid ticket ID');
        }
      } catch (err) {
        setError('Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  return { ticket, setTicket, loading, error };
};
