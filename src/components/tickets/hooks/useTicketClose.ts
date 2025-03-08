
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { toast } from 'sonner';
import { addAuditEntry } from '@/utils/auditUtils';
import { CloseTicketValues } from '../TicketCloseForm';

interface UseTicketCloseProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
  type: 'incident' | 'service';
}

export const useTicketClose = ({
  tickets,
  setTickets,
  selectedTicket,
  setSelectedTicket,
  type
}: UseTicketCloseProps) => {
  const handleCloseTicket = (data: CloseTicketValues) => {
    if (!selectedTicket) return;
    
    try {
      const status = data.status as TicketStatus;
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const auditMessage = type === 'service'
            ? `Request ${status}: ${data.rootCause}\nResolution: ${data.resolution}`
            : `Ticket ${status}: ${data.closureReason}\nRoot cause: ${data.rootCause}\nResolution: ${data.resolution}`;
            
          const updatedTicket = {
            ...ticket,
            status,
            updatedAt: new Date(),
            resolvedAt: new Date(),
            resolution: data.resolution,
            rootCause: data.rootCause,
            closureReason: data.closureReason,
            audit: addAuditEntry(
              ticket.audit,
              ticket.id,
              'ticket',
              auditMessage,
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
      
      const successMessage = type === 'service' 
        ? 'Request fulfilled successfully'
        : `Ticket ${status} successfully`;
        
      toast.success(successMessage);
    } catch (error) {
      console.error('Failed to close ticket:', error);
      toast.error(type === 'service' ? 'Failed to fulfill request' : 'Failed to close ticket');
    }
  };

  return { handleCloseTicket };
};
