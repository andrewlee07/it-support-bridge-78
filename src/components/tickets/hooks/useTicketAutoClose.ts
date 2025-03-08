
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { addAuditEntry } from '@/utils/auditUtils';
import { addDays, isAfter } from 'date-fns';

/**
 * Apply auto-close logic to tickets
 * Closes tickets that have been resolved/fulfilled for more than 5 days
 */
export const applyAutoCloseLogic = (tickets: Ticket[], type: 'incident' | 'service'): Ticket[] => {
  return tickets.map(ticket => {
    // Auto-close logic: if resolved/fulfilled for 5+ days, change to closed
    if (
      (ticket.status === 'resolved' || ticket.status === 'fulfilled') && 
      ticket.resolvedAt
    ) {
      const autoCloseDate = addDays(new Date(ticket.resolvedAt), 5);
      if (isAfter(new Date(), autoCloseDate)) {
        const status: TicketStatus = 'closed';
        const auditMessage = type === 'service' 
          ? 'Service request automatically closed after 5 days of being fulfilled' 
          : 'Incident automatically closed after 5 days of being resolved';
          
        return {
          ...ticket,
          status,
          updatedAt: new Date(),
          audit: addAuditEntry(
            ticket.audit,
            ticket.id,
            'ticket',
            auditMessage,
            'system'
          ),
        };
      }
    }
    return ticket;
  });
};
