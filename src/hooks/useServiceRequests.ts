
import { useState, useCallback, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { format, formatDistanceToNow } from 'date-fns';
import { AlertCircle, Bell, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { getTicketsByType } from '@/utils/mockData/tickets';
import { Ticket } from '@/utils/types/ticket';

export const useServiceRequests = () => {
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [cardFilters, setCardFilters] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Get all service requests from mock data
  const allServiceRequests = useMemo(() => 
    getTicketsByType('service').sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    }), []);

  // Filter options derived from data
  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(allServiceRequests.map(request => request.category)));
    return types.sort();
  }, [allServiceRequests]);

  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(allServiceRequests.map(request => request.status)));
    return statuses.sort();
  }, [allServiceRequests]);

  const priorityOptions = useMemo(() => {
    const priorities = Array.from(new Set(allServiceRequests.map(request => request.priority)));
    return priorities.sort();
  }, [allServiceRequests]);

  // Filter service requests based on all active filters
  const getFilteredTickets = useCallback(() => {
    let filtered = [...allServiceRequests];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        request => request.id.toLowerCase().includes(query) || 
                 request.title.toLowerCase().includes(query) ||
                 request.description.toLowerCase().includes(query)
      );
    }

    // Apply card filters
    if (cardFilters.length > 0) {
      if (cardFilters.includes('active')) {
        filtered = filtered.filter(request => 
          request.status === 'open' || request.status === 'in-progress'
        );
      }
      if (cardFilters.includes('high-priority')) {
        filtered = filtered.filter(request => request.priority === 'P2' || request.priority === 'P1');
      }
      if (cardFilters.includes('pending-approval')) {
        filtered = filtered.filter(request => request.status === 'pending');
      }
      // If 'all' is selected, we don't add additional filters
    }

    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter(request => request.category === typeFilter);
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(request => request.priority === priorityFilter);
    }

    // Apply date range filter
    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(request => {
        const createdAt = new Date(request.createdAt);
        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          return createdAt >= fromDate && createdAt <= toDate;
        }
        return createdAt >= fromDate;
      });
    }

    // Apply sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        let aValue: any = (a as any)[sortColumn];
        let bValue: any = (b as any)[sortColumn];
        
        // Special case for date sorting
        if (sortColumn === 'createdAt' || sortColumn === 'updatedAt') {
          aValue = aValue instanceof Date ? aValue.getTime() : new Date(aValue).getTime();
          bValue = bValue instanceof Date ? bValue.getTime() : new Date(bValue).getTime();
        }
        
        // For string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        // For number comparison
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' 
            ? aValue - bValue
            : bValue - aValue;
        }
        
        // Default return for other types
        return 0;
      });
    }

    return filtered;
  }, [
    allServiceRequests,
    searchQuery,
    cardFilters,
    sortColumn,
    sortDirection,
    typeFilter,
    statusFilter,
    priorityFilter,
    dateRange
  ]);

  // Sorting handler
  const handleSort = useCallback((column: string) => {
    setSortDirection(prev => {
      if (sortColumn === column) {
        return prev === 'asc' ? 'desc' : 'asc';
      }
      return 'asc'; // Default to ascending when changing columns
    });
    setSortColumn(column);
  }, [sortColumn]);

  // Toggle card filter
  const toggleCardFilter = useCallback((filter: string) => {
    setCardFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      }
      return [...prev, filter];
    });
  }, []);

  // Toggle row expansion
  const toggleExpandRow = useCallback((ticketId: string) => {
    setExpandedTicket(prev => prev === ticketId ? null : ticketId);
  }, []);

  // Handle editing a case
  const handleEditTicket = useCallback((ticket: Ticket) => {
    setSelectedTicket(ticket);
    toast.info('Edit Service Request', { 
      description: `Would open edit form for request ${ticket.id}`,
      duration: 3000
    });
  }, []);

  // Format date for display
  const formatDate = useCallback((dateString: string | Date) => {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    return format(date, 'MMM dd, yyyy HH:mm');
  }, []);

  // Get relative time difference
  const getTimeDifference = useCallback((dateString: string | Date) => {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setCardFilters([]);
    setTypeFilter(null);
    setStatusFilter(null);
    setPriorityFilter(null);
    setDateRange(undefined);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return searchQuery !== '' || 
           cardFilters.length > 0 || 
           typeFilter !== null || 
           statusFilter !== null || 
           priorityFilter !== null || 
           dateRange !== undefined;
  }, [searchQuery, cardFilters, typeFilter, statusFilter, priorityFilter, dateRange]);

  // Export data to different formats
  const handleExport = useCallback((type: 'csv' | 'pdf') => {
    const filteredData = getFilteredTickets();
    toast.success(`Exporting ${filteredData.length} service requests as ${type.toUpperCase()}`, {
      description: 'The export would start downloading now',
      duration: 3000
    });
  }, [getFilteredTickets]);

  // Get color for ticket type
  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'network':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200';
      case 'software':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200';
      case 'hardware':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200';
      case 'security':
        return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
      case 'access':
        return 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200';
    }
  }, []);

  // Get color for ticket status
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'approved':
      case 'fulfilled':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  }, []);

  // Get color for ticket priority
  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'P1':
        return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
      case 'P2':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200';
      case 'P3':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200';
      case 'P4':
        return 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200';
    }
  }, []);

  // Get icon for ticket priority
  const getPriorityIcon = useCallback((priority: string) => {
    switch (priority) {
      case 'P1':
        return { icon: AlertCircle, className: "h-4 w-4 text-red-600 mr-1" };
      case 'P2':
        return { icon: Bell, className: "h-4 w-4 text-orange-600 mr-1" };
      case 'P3':
        return { icon: AlertTriangle, className: "h-4 w-4 text-yellow-600 mr-1" };
      default:
        return null;
    }
  }, []);

  // Calculate statistics
  const totalTickets = allServiceRequests.length;
  
  const activeTicketsCount = useMemo(() => {
    return allServiceRequests.filter(request => 
      request.status === 'open' || request.status === 'in-progress'
    ).length;
  }, [allServiceRequests]);
  
  const highPriorityCount = useMemo(() => {
    return allServiceRequests.filter(request => 
      request.priority === 'P1' || request.priority === 'P2'
    ).length;
  }, [allServiceRequests]);
  
  const pendingApprovalCount = useMemo(() => {
    return allServiceRequests.filter(request => request.status === 'pending').length;
  }, [allServiceRequests]);

  return {
    // State
    searchQuery,
    setSearchQuery,
    sortColumn,
    sortDirection,
    cardFilters,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    dateRange,
    setDateRange,
    expandedTicket,
    selectedTicket,
    
    // Helper functions
    handleSort,
    toggleCardFilter,
    formatDate,
    getTimeDifference,
    toggleExpandRow,
    handleEditTicket,
    getFilteredTickets,
    getTypeColor,
    getStatusColor,
    getPriorityColor,
    getPriorityIcon,
    resetFilters,
    hasActiveFilters,
    handleExport,
    
    // Data
    allServiceRequests,
    typeOptions,
    statusOptions,
    priorityOptions,
    totalTickets,
    activeTicketsCount,
    highPriorityCount,
    pendingApprovalCount
  };
};
