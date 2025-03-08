
import { Ticket } from '@/utils/types/ticket';
import { toast } from 'sonner';
import { addAuditEntry } from '@/utils/auditUtils';

interface UseTicketNotesProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
}

export const useTicketNotes = ({
  tickets,
  setTickets,
  selectedTicket,
  setSelectedTicket
}: UseTicketNotesProps) => {
  const handleAddNote = (note: string) => {
    if (!selectedTicket || !note.trim()) return;
    
    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const updatedTicket = {
            ...ticket,
            updatedAt: new Date(),
            audit: addAuditEntry(
              ticket.audit,
              ticket.id,
              'ticket',
              note,
              'current-user'
            ),
          };
          return updatedTicket;
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      
      const updatedTicket = updatedTickets.find(t => t.id === selectedTicket.id) || null;
      setSelectedTicket(updatedTicket);
      
      toast.success('Note added successfully');
    } catch (error) {
      console.error('Failed to add note:', error);
      toast.error('Failed to add note');
    }
  };

  return { handleAddNote };
};
