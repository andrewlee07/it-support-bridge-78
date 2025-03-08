import { toast } from 'sonner';
import { TicketStatus, TicketWithNotes, TicketNote } from '@/utils/types/ticket';
import { CloseTicketValues } from '@/components/tickets/TicketCloseForm';
import { createAuditEntry } from '@/utils/auditUtils';
import { AuditEntry } from '@/utils/types/audit';

export const useTicketClose = (
  ticket: TicketWithNotes | null,
  setTicket: (ticket: TicketWithNotes | null) => void
) => {
  const handleCloseTicket = (values: CloseTicketValues) => {
    if (ticket) {
      // Check if there are any unresolved related items
      const hasUnresolvedItems = (ticket.relatedItems || []).some(item => {
        if (item.type === 'bug') {
          return !['closed', 'resolved', 'fixed'].includes(item.status.toLowerCase());
        }
        return false;
      });

      if (hasUnresolvedItems) {
        toast.error('Cannot close ticket with unresolved bugs');
        return;
      }

      // Add a new note to the notes array with the close information
      const closeNote: TicketNote = {
        id: `note-close-${Date.now()}`,
        ticketId: ticket.id,
        text: values.notes,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      // Create an audit entry for closing the ticket
      const closeAuditEntry: AuditEntry = createAuditEntry(
        ticket.id,
        'ticket',
        `Ticket closed: ${values.closureReason || 'No reason provided'}`,
        'current-user'
      );
      
      const updatedTicket = {
        ...ticket,
        status: values.status as TicketStatus,
        updatedAt: new Date(),
        closedAt: new Date(),
        // Keep existing notes and append the new close note
        notes: [...(ticket.notes || []), closeNote],
        // Add the close audit entry
        audit: [...(ticket.audit || []), closeAuditEntry],
        // Store additional values in a way that doesn't conflict with the Ticket type
        _rootCause: values.rootCause,
        _closureReason: values.closureReason,
        resolution: values.resolution
      };
      setTicket(updatedTicket);
      
      toast.success('Ticket closed successfully');
    }
  };

  return { handleCloseTicket };
};
