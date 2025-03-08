
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { addAuditEntry } from '@/utils/auditUtils';
import { addDays, isAfter } from 'date-fns';
import { getConfigurationValue } from '@/hooks/useModuleConfigurations';

/**
 * Apply auto-close logic to tickets
 * Closes tickets that have been resolved/fulfilled based on configured timeframe
 */
export const applyAutoCloseLogic = (tickets: Ticket[], type: 'incident' | 'service'): Ticket[] => {
  // Get the configured auto-close timeframe
  const moduleType = type === 'incident' ? 'incident' : 'service-request';
  const autoCloseDays = parseInt(
    getConfigurationValue(moduleType, 'autoCloseTimeframeInDays', '5')
  );
  
  return tickets.map(ticket => {
    // Auto-close logic: if resolved/fulfilled for configured days, change to closed
    if (
      (ticket.status === 'resolved' || ticket.status === 'fulfilled') && 
      ticket.resolvedAt
    ) {
      const autoCloseDate = addDays(new Date(ticket.resolvedAt), autoCloseDays);
      if (isAfter(new Date(), autoCloseDate)) {
        const status: TicketStatus = 'closed';
        const auditMessage = type === 'service' 
          ? `Service request automatically closed after ${autoCloseDays} days of being fulfilled` 
          : `Incident automatically closed after ${autoCloseDays} days of being resolved`;
          
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
