
import { useState, useMemo } from 'react';
import { Bug } from '@/utils/types/test/bug';

export function useBugFilters(bugs: Bug[]) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Available options for filters (dynamically generated from data)
  const statusOptions = useMemo(() => {
    const statuses = new Set<string>();
    bugs.forEach(bug => statuses.add(bug.status));
    return Array.from(statuses);
  }, [bugs]);

  const severityOptions = useMemo(() => {
    const severities = new Set<string>();
    bugs.forEach(bug => severities.add(bug.severity));
    return Array.from(severities);
  }, [bugs]);

  const priorityOptions = useMemo(() => {
    const priorities = new Set<string>();
    bugs.forEach(bug => priorities.add(bug.priority));
    return Array.from(priorities);
  }, [bugs]);

  // Filter the bugs based on current filters
  const filteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === null || bug.status === statusFilter;
      
      // Severity filter
      const matchesSeverity = severityFilter === null || bug.severity === severityFilter;
      
      // Priority filter
      const matchesPriority = priorityFilter === null || bug.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesSeverity && matchesPriority;
    });
  }, [bugs, searchQuery, statusFilter, severityFilter, priorityFilter]);

  // Function to determine if any filters are active
  const hasActiveFilters = searchQuery !== '' || statusFilter !== null || severityFilter !== null || priorityFilter !== null;

  // Function to reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setSeverityFilter(null);
    setPriorityFilter(null);
  };

  // Counter functions
  const getBugCountByStatus = (status: string): number => {
    return bugs.filter(bug => bug.status === status).length;
  };

  const getBugCountBySeverity = (severity: string): number => {
    return bugs.filter(bug => bug.severity === severity).length;
  };

  return {
    // Filter values
    searchQuery,
    statusFilter,
    severityFilter,
    priorityFilter,
    
    // Setters
    setSearchQuery,
    setStatusFilter,
    setSeverityFilter,
    setPriorityFilter,
    
    // Filter options
    statusOptions,
    severityOptions,
    priorityOptions,
    
    // Filtered results
    filteredBugs,
    
    // Filter status
    hasActiveFilters,
    resetFilters,
    
    // Counter helper functions
    getBugCountByStatus,
    getBugCountBySeverity
  };
}
