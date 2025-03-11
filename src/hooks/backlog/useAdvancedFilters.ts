
import { useState } from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';

export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    sprints: string[];
    statuses: string[];
    releases: string[];
    goals: string[];
    finishDate: {
      type: 'today' | 'this-week' | 'this-month' | 'custom';
      customDate?: Date;
    };
  };
}

export function useAdvancedFilters() {
  const [activeFilters, setActiveFilters] = useState<{
    sprints: string[];
    statuses: string[];
    releases: string[];
    goals: string[];
    finishDate: {
      type: 'any' | 'today' | 'this-week' | 'this-month' | 'custom';
      customDate?: Date;
    };
  }>({
    sprints: [],
    statuses: [],
    releases: [],
    goals: [],
    finishDate: { type: 'any' }
  });

  const [savedPresets, setSavedPresets] = useState<FilterPreset[]>([]);

  const applyFilters = (items: BacklogItem[]): BacklogItem[] => {
    return items.filter(item => {
      // Apply sprint filter
      if (activeFilters.sprints.length > 0 && 
          !activeFilters.sprints.includes(item.sprintId || 'unassigned')) {
        return false;
      }

      // Apply status filter
      if (activeFilters.statuses.length > 0 && 
          !activeFilters.statuses.includes(item.status)) {
        return false;
      }

      // Apply release filter
      if (activeFilters.releases.length > 0 && 
          !activeFilters.releases.includes(item.releaseId || 'unassigned')) {
        return false;
      }

      // Apply goals filter
      if (activeFilters.goals.length > 0 && 
          !item.goals?.some(goal => activeFilters.goals.includes(goal))) {
        return false;
      }

      // Apply finish date filter
      if (activeFilters.finishDate.type !== 'any' && item.dueDate) {
        const dueDate = new Date(item.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (activeFilters.finishDate.type) {
          case 'today':
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (dueDate < today || dueDate >= tomorrow) return false;
            break;

          case 'this-week':
            const weekEnd = new Date(today);
            weekEnd.setDate(today.getDate() + (7 - today.getDay()));
            if (dueDate < today || dueDate > weekEnd) return false;
            break;

          case 'this-month':
            const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            if (dueDate < today || dueDate > monthEnd) return false;
            break;

          case 'custom':
            if (activeFilters.finishDate.customDate) {
              const customDate = new Date(activeFilters.finishDate.customDate);
              customDate.setHours(0, 0, 0, 0);
              const nextDay = new Date(customDate);
              nextDay.setDate(customDate.getDate() + 1);
              if (dueDate < customDate || dueDate >= nextDay) return false;
            }
            break;
        }
      }

      return true;
    });
  };

  const savePreset = (name: string) => {
    const newPreset: FilterPreset = {
      id: `preset-${Date.now()}`,
      name,
      filters: {
        sprints: activeFilters.sprints,
        statuses: activeFilters.statuses,
        releases: activeFilters.releases,
        goals: activeFilters.goals,
        finishDate: activeFilters.finishDate
      }
    };
    setSavedPresets(prev => [...prev, newPreset]);
  };

  const loadPreset = (presetId: string) => {
    const preset = savedPresets.find(p => p.id === presetId);
    if (preset) {
      setActiveFilters(prev => ({
        ...prev,
        ...preset.filters
      }));
    }
  };

  const deletePreset = (presetId: string) => {
    setSavedPresets(prev => prev.filter(p => p.id !== presetId));
  };

  return {
    activeFilters,
    setActiveFilters,
    savedPresets,
    applyFilters,
    savePreset,
    loadPreset,
    deletePreset
  };
}
