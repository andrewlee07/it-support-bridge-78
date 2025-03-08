import { useState } from 'react';
import { Ticket, TicketStatus } from '@/utils/types/ticket';
import { toast } from 'sonner';
import { addAuditEntry } from '@/utils/auditUtils';
import { UpdateTicketValues } from '../TicketUpdateForm';
import { CloseTicketValues } from '../TicketCloseForm';

interface UseTicketActionsProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
  type: 'incident' | 'service';
}

export const useTicketActions = ({ 
  tickets, 
  setTickets, 
  selectedTicket, 
  setSelectedTicket,
  type 
}: UseTicketActionsProps) => {
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState<boolean>(false);

  const handleUpdateTicket = (data: UpdateTicketValues) => {
    if (!selectedTicket) return;
    
    try {
      // In a real app, we would call an API to update the ticket
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          // Check if this is a service request being assigned for the first time
          const isServiceRequestBeingAssigned = 
            type === 'service' && 
            !ticket.assignedTo && 
            data.assignedTo && 
            ticket.status === 'open' && 
            data.status === 'in-progress';
          
          // Show notification if service request is being assigned
          if (isServiceRequestBeingAssigned) {
            // In a real app, this would send an email, not just a toast
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

  const handleCloseTicket = (data: CloseTicketValues) => {
    if (!selectedTicket) return;
    
    try {
      // In a real app, we would call an API to close the ticket
      const status = data.status as TicketStatus;
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const auditMessage = type === 'service'
            ? `Request ${status}: ${data.rootCause}`
            : `Ticket ${status}: ${data.closureReason} - Root cause: ${data.rootCause}`;
            
          const updatedTicket = {
            ...ticket,
            status,
            updatedAt: new Date(),
            resolvedAt: new Date(),
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

  const handleReopenTicket = () => {
    if (!selectedTicket) return;
    
    try {
      // In a real app, we would call an API to reopen the ticket
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === selectedTicket.id) {
          const isServiceRequest = type === 'service';
          const fromStatus = isServiceRequest ? 'fulfilled' : 'resolved';
          
          if (ticket.status !== fromStatus) {
            toast.error(`Can only reopen tickets in ${fromStatus} status`);
            return ticket;
          }
          
          const auditMessage = isServiceRequest
            ? 'Service request reopened by customer'
            : 'Incident reopened by customer';
            
          const updatedTicket = {
            ...ticket,
            status: 'in-progress' as TicketStatus,
            updatedAt: new Date(),
            resolvedAt: undefined, // Clear the resolved date
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

  const handleCreateTicket = () => {
    setIsNewTicketDialogOpen(true);
  };

  const handleCloseTicketDialog = () => {
    setIsNewTicketDialogOpen(false);
  };

  return {
    isNewTicketDialogOpen,
    handleUpdateTicket,
    handleCloseTicket,
    handleReopenTicket,
    handleAddNote,
    handleCreateTicket,
    handleCloseTicketDialog,
    setIsNewTicketDialogOpen
  };
};
