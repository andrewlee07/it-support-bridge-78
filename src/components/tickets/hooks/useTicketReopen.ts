
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { toast } from 'sonner';
import { addAuditEntry } from '@/utils/auditUtils';

interface UseTicketReopenProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
  type: 'incident' | 'service';
}

export const useTicketReopen = ({
  tickets,
  setTickets,
  selectedTicket,
  setSelectedTicket,
  type
}: UseTicketReopenProps) => {
  const handleReopenTicket = (reopenReason: string) => {
    if (!selectedTicket) return;
    
    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const isServiceRequest = type === 'service';
          const fromStatus = isServiceRequest ? 'fulfilled' : 'resolved';
          
          if (ticket.status !== fromStatus && ticket.status !== 'closed') {
            toast.error(`Can only reopen tickets in ${fromStatus} or closed status`);
            return ticket;
          }
          
          const reasonText = reopenReason ? ` Reason: ${reopenReason}` : '';
          const auditMessage = isServiceRequest
            ? `Service request reopened by customer.${reasonText}`
            : `Incident reopened by customer.${reasonText}`;
            
          const updatedTicket = {
            ...ticket,
            status: 'in-progress' as TicketStatus,
            updatedAt: new Date(),
            resolvedAt: undefined,
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
        ? 'Service request reopened successfully'
        : 'Incident reopened successfully';
        
      toast.success(successMessage);
    } catch (error) {
      console.error('Failed to reopen ticket:', error);
      toast.error(type === 'service' ? 'Failed to reopen service request' : 'Failed to reopen incident');
    }
  };

  return { handleReopenTicket };
};
