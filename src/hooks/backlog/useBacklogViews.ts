
import { useState, useCallback, useEffect } from 'react';
import { BacklogViewType } from '@/utils/types/backlogTypes';

export interface BacklogFilters {
  search: string;
  status: string[];
  priority: string[];
  assignee: string[];
  labels: string[];
}

export function useBacklogViews() {
  // Load initial view from localStorage or default to 'kanban'
  const [currentView, setCurrentView] = useState<BacklogViewType>(() => {
    const savedView = localStorage.getItem('backlogCurrentView');
    return (savedView as BacklogViewType) || 'kanban';
  });

  const [filters, setFilters] = useState<BacklogFilters>({
    search: '',
    status: [],
    priority: [],
    assignee: [],
    labels: []
  });

  const handleViewChange = useCallback((view: BacklogViewType) => {
    setCurrentView(view);
    // Save to localStorage
    localStorage.setItem('backlogCurrentView', view);
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
