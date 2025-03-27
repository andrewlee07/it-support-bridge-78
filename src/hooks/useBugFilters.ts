
import { useState, useMemo } from 'react';
import { Bug } from '@/utils/types/test/bug';

export const useBugFilters = (bugs: Bug[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Extract unique values for filter options
  const statusOptions = useMemo(() => {
    return Array.from(new Set(bugs.map(bug => bug.status)));
  }, [bugs]);

  const severityOptions = useMemo(() => {
    return Array.from(new Set(bugs.map(bug => bug.severity)));
  }, [bugs]);

  const priorityOptions = useMemo(() => {
    return Array.from(new Set(bugs.map(bug => bug.priority)));
  }, [bugs]);

  // Apply all filters
  const filteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      // Search filter
      const matchesSearch = !searchQuery || 
        bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bug.description && bug.description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      const matchesStatus = !statusFilter || bug.status === statusFilter;

      // Severity filter
      const matchesSeverity = !severityFilter || bug.severity === severityFilter;

      // Priority filter
      const matchesPriority = !priorityFilter || bug.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesSeverity && matchesPriority;
    });
  }, [bugs, searchQuery, statusFilter, severityFilter, priorityFilter]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return !!(searchQuery || statusFilter || severityFilter || priorityFilter);
  }, [searchQuery, statusFilter, severityFilter, priorityFilter]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setSeverityFilter(null);
    setPriorityFilter(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    severityFilter,
    setSeverityFilter,
    priorityFilter,
    setPriorityFilter,
    statusOptions,
    severityOptions,
    priorityOptions,
    filteredBugs,
    hasActiveFilters,
    resetFilters
  };
};
