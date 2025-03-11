import { useState, useEffect } from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';

export type DateFilterType = 'any' | 'today' | 'this-week' | 'this-month' | 'custom';

export interface DateFilter {
  type: DateFilterType;
  customDate?: Date;
}

export interface FilterState {
  status: string[];
  priority: string[];
  type: string[];
  assignee: string[];
  label: string[];
  releaseId: string[];
  dateFilter: DateFilter;
}

interface UseAdvancedFiltersProps {
  items: BacklogItem[];
}

export const useAdvancedFilters = ({ items }: UseAdvancedFiltersProps) => {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    status: [],
    priority: [],
    type: [],
    assignee: [],
    label: [],
    releaseId: [],
    dateFilter: {
      type: 'any',
      customDate: undefined
    }
  });
  const [filteredItems, setFilteredItems] = useState<BacklogItem[]>(items);

  useEffect(() => {
    applyFilters();
  }, [activeFilters, items]);

  const applyFilters = () => {
    let newFilteredItems = [...items];

    if (activeFilters.status.length > 0) {
      newFilteredItems = newFilteredItems.filter(item =>
        activeFilters.status.includes(item.status)
      );
    }

    if (activeFilters.priority.length > 0) {
      newFilteredItems = newFilteredItems.filter(item =>
        activeFilters.priority.includes(item.priority)
      );
    }

    if (activeFilters.type.length > 0) {
      newFilteredItems = newFilteredItems.filter(item =>
        activeFilters.type.includes(item.type)
      );
    }

    if (activeFilters.assignee.length > 0) {
      newFilteredItems = newFilteredItems.filter(item =>
        activeFilters.assignee.includes(item.assignee || 'unassigned')
      );
    }

    if (activeFilters.label.length > 0) {
      newFilteredItems = newFilteredItems.filter(item => {
        if (activeFilters.label.includes('no-label')) {
          return !item.labels || item.labels.length === 0;
        }
        return item.labels?.some(label => activeFilters.label.includes(label));
      });
    }

    if (activeFilters.releaseId.length > 0) {
      newFilteredItems = newFilteredItems.filter(item =>
        activeFilters.releaseId.includes(item.releaseId || 'none')
      );
    }

    if (activeFilters.dateFilter.type !== 'any') {
      newFilteredItems = filterByDate(newFilteredItems, activeFilters.dateFilter);
    }

    setFilteredItems(newFilteredItems);
  };

  const filterByDate = (items: BacklogItem[], dateFilter: DateFilter): BacklogItem[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (dateFilter.type) {
      case 'today':
        return items.filter(item => {
          const itemDate = new Date(item.createdAt);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate.getTime() === today.getTime();
        });
      case 'this-week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return items.filter(item => {
          const itemDate = new Date(item.createdAt);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= startOfWeek && itemDate <= today;
        });
      case 'this-month':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        return items.filter(item => {
          const itemDate = new Date(item.createdAt);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= startOfMonth && itemDate <= today;
        });
      case 'custom':
        if (dateFilter.customDate) {
          const customDate = new Date(dateFilter.customDate);
          customDate.setHours(0, 0, 0, 0);
          return items.filter(item => {
            const itemDate = new Date(item.createdAt);
            itemDate.setHours(0, 0, 0, 0);
            return itemDate.getTime() === customDate.getTime();
          });
        }
        return items;
      default:
        return items;
    }
  };

  const updateFilter = (filterType: keyof FilterState, values: string[]) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: values
    }));
  };

  const updateDateFilter = (dateFilter: DateFilter) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      dateFilter: dateFilter
    }));
  };

  const resetFilters = () => {
    setActiveFilters({
      status: [],
      priority: [],
      type: [],
      assignee: [],
      label: [],
      releaseId: [],
      dateFilter: {
        type: 'any',
        customDate: undefined
      }
    });
  };

  return {
    filteredItems,
    activeFilters,
    updateFilter,
    updateDateFilter,
    resetFilters
  };
};
