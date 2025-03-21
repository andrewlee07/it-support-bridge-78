
import { useState } from 'react';
import { toast } from 'sonner';
import { TicketWithNotes, TicketNote } from '@/utils/types/ticket';
import { v4 as uuidv4 } from 'uuid';

export const useTicketReopen = (ticket: TicketWithNotes, updateTicket: (ticket: TicketWithNotes) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reopenTicket = async (reason: string) => {
    if (!reason.trim()) {
      toast.error('Reopen reason cannot be empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      
      // Create a note for the reopen reason
      const newNote: TicketNote = {
        id: uuidv4(),
        ticketId: ticket.id,
        content: `Ticket reopened: ${reason}`,
        createdBy: 'current-user', // In a real app, this would be the authenticated user
        createdAt: now,
        isPrivate: false
      };
      
      // Determine the appropriate status for reopening
      // For most tickets, we'll set it back to "in-progress"
      let newStatus = 'in-progress';
      
      // But if it's a service request, we might set it back to "open"
      if (ticket.type === 'service') {
        newStatus = 'open';
      }
      
      // Create a copy of the ticket with updated status
      const updatedTicket = {
        ...ticket,
        status: newStatus,
        closedAt: undefined, // Clear the closed date
        resolvedAt: undefined, // Clear the resolved date if it exists
        notes: [...ticket.notes, newNote],
        audit: [
          ...(ticket.audit || []),
          {
            id: uuidv4(),
            entityId: ticket.id,
            entityType: 'ticket',
            message: `Ticket reopened: ${reason}`,
            performedBy: 'current-user',
            timestamp: now,
          }
        ]
      };

      // Update the ticket in the state/backend
      updateTicket(updatedTicket);
      toast.success('Ticket reopened successfully');
    } catch (error) {
      console.error('Error reopening ticket:', error);
      toast.error('Failed to reopen ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    reopenTicket,
    isSubmitting
  };
};
