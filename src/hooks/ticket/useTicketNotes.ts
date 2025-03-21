
import { useState } from 'react';
import { toast } from 'sonner';
import { TicketWithNotes, TicketNote } from '@/utils/types/ticket';
import { v4 as uuidv4 } from 'uuid';

export const useTicketNotes = (ticket: TicketWithNotes, updateTicket: (ticket: TicketWithNotes) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNote = async (content: string, isPrivate: boolean = false) => {
    if (!content.trim()) {
      toast.error('Note content cannot be empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const newNote: TicketNote = {
        id: uuidv4(),
        ticketId: ticket.id,
        content: content,
        createdBy: 'current-user', // In a real app, this would be the authenticated user
        createdAt: new Date(),
        isPrivate: isPrivate
      };

      // Create a copy of the ticket with the new note added
      const updatedTicket = { 
        ...ticket,
        notes: [...ticket.notes, newNote],
        audit: [...(ticket.audit || []), {
          id: uuidv4(),
          entityId: ticket.id,
          entityType: 'ticket',
          message: `Added ${isPrivate ? 'private' : ''} note`,
          performedBy: 'current-user',
          timestamp: new Date(),
        }]
      };

      // Update the ticket in the state/backend
      updateTicket(updatedTicket);
      toast.success('Note added successfully');
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    addNote,
    isSubmitting
  };
};
