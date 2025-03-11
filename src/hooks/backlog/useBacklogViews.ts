
import { useState, useCallback } from 'react';
import { BacklogViewType } from '@/utils/types/backlogTypes';

export interface BacklogFilters {
  search: string;
  status: string[];
  priority: string[];
  assignee: string[];
  labels: string[];
}

export function useBacklogViews() {
  const [currentView, setCurrentView] = useState<BacklogViewType>('kanban');
  const [filters, setFilters] = useState<BacklogFilters>({
    search: '',
    status: [],
    priority: [],
    assignee: [],
    labels: []
  });

  const handleViewChange = useCallback((view: BacklogViewType) => {
    setCurrentView(view);
    // Filters persist across view changes
  }, []);

  const updateFilters = useCallback((newFilters: Partial<BacklogFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  return {
    currentView,
    filters,
    handleViewChange,
    updateFilters
  };
}
