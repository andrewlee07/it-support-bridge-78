
import { useState, useEffect } from 'react';
import { Ticket } from '@/utils/types/ticket';
import { getTicketsByType } from '@/utils/mockData/tickets';
import { useTicketFilters } from './useTicketFilters';
import { useTicketActions } from './useTicketActions';
import { useTicketDetail } from './useTicketDetail';
import { applyAutoCloseLogic } from './useTicketAutoClose';

export const useTicketList = (type: 'incident' | 'service', initialId?: string) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get detailed ticket information
  const { 
    isViewingTicket,
    selectedTicket,
    setIsViewingTicket,
    setSelectedTicket
  } = useTicketDetail({ 
    tickets, 
    initialId 
  });

  // Get filtering capabilities
  const {
    filteredTickets,
    searchQuery,
    statusFilter,
    priorityFilter,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter
  } = useTicketFilters({ tickets });

  // Get ticket action handlers
  const {
    isNewTicketDialogOpen,
    handleUpdateTicket,
    handleCloseTicket,
    handleReopenTicket,
    handleAddNote,
    handleCreateTicket,
    handleCloseTicketDialog,
    setIsNewTicketDialogOpen
  } = useTicketActions({
    tickets,
    setTickets,
    selectedTicket,
    setSelectedTicket,
    type
  });

  const loadTickets = () => {
    setLoading(true);
    try {
      // Get tickets from mockData based on type
      const ticketsData = getTicketsByType(type);
      
      // Apply auto-close logic
      const processedTickets = applyAutoCloseLogic(ticketsData, type);
      
      setTickets(processedTickets);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [type]);

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
    handleReopenTicket,
  };
};
