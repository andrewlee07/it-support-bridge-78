
import { useState } from 'react';
import { toast } from 'sonner';
import { TicketWithNotes, TicketNote } from '@/utils/types/ticket';
import { CloseTicketValues } from '@/components/tickets/TicketCloseForm';
import { v4 as uuidv4 } from 'uuid';

export const useTicketClose = (ticket: TicketWithNotes, updateTicket: (ticket: TicketWithNotes) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeTicket = async (values: CloseTicketValues) => {
    setIsSubmitting(true);

    try {
      const now = new Date();
      
      // Create a note from the resolution
      const newNote: TicketNote = {
        id: uuidv4(),
        ticketId: ticket.id,
        content: values.resolutionNotes || 'Ticket closed',
        createdBy: 'current-user', // In a real app, this would be the authenticated user
        createdAt: now,
        isPrivate: false
      };
      
      // Create a copy of the ticket with updated status and resolution
      const updatedTicket = {
        ...ticket,
        status: 'closed',
        closedAt: now,
        closureCode: values.closureCode,
        closureNotes: values.resolutionNotes,
        notes: [...ticket.notes, newNote],
        audit: [
          ...(ticket.audit || []),
          {
            id: uuidv4(),
            entityId: ticket.id,
            entityType: 'ticket',
            message: `Ticket closed with code: ${values.closureCode}`,
            performedBy: 'current-user',
            timestamp: now,
          }
        ]
      };

      // Update the ticket in the state/backend
      updateTicket(updatedTicket);
      toast.success('Ticket closed successfully');
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast.error('Failed to close ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    closeTicket,
    isSubmitting
  };
};
