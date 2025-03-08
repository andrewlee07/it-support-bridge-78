
import { useState, useEffect } from 'react';
import { Ticket, TicketStatus, TicketPriority } from '@/utils/types/ticket';
import { getTicketsByType } from '@/utils/mockData/tickets';
import { toast } from 'sonner';
import { addAuditEntry } from '@/utils/auditUtils';
import { UpdateTicketValues } from '../TicketUpdateForm';
import { CloseTicketValues } from '../TicketCloseForm';

export const useTicketList = (type: 'incident' | 'service', initialId?: string) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState<boolean>(false);
  const [isViewingTicket, setIsViewingTicket] = useState<boolean>(!!initialId);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const loadTickets = () => {
    setLoading(true);
    try {
      // Get tickets from mockData based on type
      const ticketsData = getTicketsByType(type);
      setTickets(ticketsData);
      setFilteredTickets(ticketsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [type]);

  useEffect(() => {
    if (initialId) {
      setIsViewingTicket(true);
      const ticket = tickets.find(t => t.id === initialId);
      if (ticket) {
        setSelectedTicket(ticket);
      }
    } else {
      setIsViewingTicket(false);
      setSelectedTicket(null);
    }
  }, [initialId, tickets]);

  useEffect(() => {
    let result = tickets;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.id.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    setFilteredTickets(result);
  }, [searchQuery, statusFilter, priorityFilter, tickets]);

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
            status: data.status,
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
      setFilteredTickets(updatedTickets);
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
      const status = data.status;
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
      setFilteredTickets(updatedTickets);
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
      setFilteredTickets(updatedTickets);
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

  const handleTicketCreated = () => {
    loadTickets();
    setIsNewTicketDialogOpen(false);
  };

  return {
    tickets,
    filteredTickets,
    searchQuery,
    statusFilter,
    priorityFilter,
    loading,
    isNewTicketDialogOpen,
    isViewingTicket,
    selectedTicket,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    handleUpdateTicket,
    handleCloseTicket,
    handleAddNote,
    handleCreateTicket,
    handleCloseTicketDialog,
    handleTicketCreated,
    setIsViewingTicket,
    setSelectedTicket,
  };
};
