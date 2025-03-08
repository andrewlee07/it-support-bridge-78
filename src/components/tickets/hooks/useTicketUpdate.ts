
import { useState } from 'react';
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { toast } from 'sonner';
import { addAuditEntry } from '@/utils/auditUtils';
import { UpdateTicketValues } from '../TicketUpdateForm';

interface UseTicketUpdateProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
  type: 'incident' | 'service';
}

export const useTicketUpdate = ({
  tickets,
  setTickets,
  selectedTicket,
  setSelectedTicket,
  type
}: UseTicketUpdateProps) => {
  const handleUpdateTicket = (data: UpdateTicketValues) => {
    if (!selectedTicket) return;
    
    try {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const isServiceRequestBeingAssigned = 
            type === 'service' && 
            !ticket.assignedTo && 
            data.assignedTo && 
            ticket.status === 'open' && 
            data.status === 'in-progress';
          
          if (isServiceRequestBeingAssigned) {
            toast.info(`User ${ticket.createdBy} has been notified that their request ${ticket.id} has been assigned.`);
          }
          
          const updatedTicket = {
            ...ticket,
            status: data.status as TicketStatus,
            assignedTo: data.assignedTo || ticket.assignedTo,
            updatedAt: new Date(),
            audit: data.notes 
              ? addAuditEntry(
                  ticket.audit,
                  ticket.id,
                  'ticket',
                  `Status updated to ${data.status}${data.notes ? ': ' + data.notes : ''}`,
                  'current-user'
                )
              : ticket.audit,
          };
          return updatedTicket;
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      
      const updatedTicket = updatedTickets.find(t => t.id === selectedTicket.id) || null;
      setSelectedTicket(updatedTicket);
      
      toast.success('Ticket updated successfully');
    } catch (error) {
      console.error('Failed to update ticket:', error);
      toast.error('Failed to update ticket');
    }
  };

  return { handleUpdateTicket };
};
