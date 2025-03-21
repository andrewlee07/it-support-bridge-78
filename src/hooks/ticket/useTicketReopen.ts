
import { toast } from 'sonner';
import { TicketStatus, TicketWithNotes, TicketNote } from '@/utils/types/ticket';
import { createAuditEntry } from '@/utils/auditUtils';
import { AuditEntry } from '@/utils/types/audit';

export const useTicketReopen = (
  ticket: TicketWithNotes | null,
  setTicket: (ticket: TicketWithNotes | null) => void
) => {
  const handleReopenTicket = (reason: string) => {
    if (ticket) {
      const reopenNote: TicketNote = {
        id: `note-reopen-${Date.now()}`,
        ticketId: ticket.id,
        text: `Ticket reopened: ${reason}`,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      // Create an audit entry for reopening the ticket
      const reopenAuditEntry: AuditEntry = createAuditEntry(
        ticket.id,
        'ticket',
        `Ticket reopened: ${reason}`,
        'current-user'
      );
      
      const updatedTicket = {
        ...ticket,
        status: 'open' as TicketStatus,
        updatedAt: new Date(),
        reopenedAt: new Date(),
        notes: [...(ticket.notes || []), reopenNote],
        audit: [...(ticket.audit || []), reopenAuditEntry],
        _reopenReason: reason
      };
      setTicket(updatedTicket);
      
      toast.success('Ticket reopened successfully');
    }
  };

  return { handleReopenTicket };
};
