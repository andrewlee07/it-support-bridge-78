
import { useState, useEffect } from 'react';
import { Ticket, TicketStatus, TicketPriority } from '@/utils/types/ticket';

export interface UseTicketFiltersProps {
  tickets: Ticket[];
}

export interface UseTicketFiltersReturn {
  filteredTickets: Ticket[];
  searchQuery: string;
  statusFilter: TicketStatus | 'all';
  priorityFilter: TicketPriority | 'all';
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: TicketStatus | 'all') => void;
  setPriorityFilter: (priority: TicketPriority | 'all') => void;
}

export const useTicketFilters = ({ tickets }: UseTicketFiltersProps): UseTicketFiltersReturn => {
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');

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
    } else {
      // "All" now means all except closed tickets
      result = result.filter(t => t.status !== 'closed');
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    setFilteredTickets(result);
  }, [searchQuery, statusFilter, priorityFilter, tickets]);

  return {
    filteredTickets,
    searchQuery,
    statusFilter,
    priorityFilter,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter
  };
};
