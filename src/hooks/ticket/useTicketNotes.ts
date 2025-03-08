
import { toast } from 'sonner';
import { TicketWithNotes, TicketNote } from '@/utils/types/ticket';
import { createAuditEntry } from '@/utils/auditUtils';
import { AuditEntry } from '@/utils/types/audit';

export const useTicketNotes = (
  ticket: TicketWithNotes | null,
  setTicket: (ticket: TicketWithNotes | null) => void
) => {
  const handleAddNote = (note: string) => {
    if (ticket && note.trim()) {
      const noteItem: TicketNote = {
        id: `note-${Date.now()}`,
        ticketId: ticket.id,
        text: note,
        createdAt: new Date(),
        createdBy: 'current-user',
        isInternal: false
      };
      
      // Create an audit entry for adding a note
      const noteAuditEntry: AuditEntry = createAuditEntry(
        ticket.id,
        'ticket',
        `Note added: ${note.substring(0, 30)}${note.length > 30 ? '...' : ''}`,
        'current-user'
      );
      
      const updatedTicket = {
        ...ticket,
        notes: [...(ticket.notes || []), noteItem],
        audit: [...(ticket.audit || []), noteAuditEntry],
        updatedAt: new Date()
      };
      setTicket(updatedTicket);
      toast.success("Note added successfully");
    }
  };

  return { handleAddNote };
};
