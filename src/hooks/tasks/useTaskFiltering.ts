
import { useState, useEffect, useMemo } from 'react';
import { Task, isTaskOverdue } from '@/utils/types/taskTypes';

export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    status: string[];
    priority: string[];
    assignedToMe: boolean;
    overdue: boolean;
    goals: string[];
    finishDateOption: string;
    customFinishDate?: Date;
    sprint?: string;
    release?: string;
  };
}

export interface UseTaskFilteringProps {
  tasks: Task[];
  userId?: string;
}

export interface UseTaskFilteringReturn {
  filteredTasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (statuses: string[]) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  selectedPriorities: string[];
  setSelectedPriorities: (priorities: string[]) => void;
  onlyOverdue: boolean;
  setOnlyOverdue: (overdue: boolean) => void;
  onlyAssignedToMe: boolean;
  setOnlyAssignedToMe: (assignedToMe: boolean) => void;
  selectedGoals: string[];
  setSelectedGoals: (goals: string[]) => void;
  finishDateOption: string;
  setFinishDateOption: (option: string) => void;
  customFinishDate?: Date;
  setCustomFinishDate: (date?: Date) => void;
  sprintFilter?: string;
  setSprintFilter: (sprint?: string) => void;
  releaseFilter?: string;
  setReleaseFilter: (release?: string) => void;
  savedPresets: FilterPreset[];
  savePreset: (name: string) => void;
  loadPreset: (presetId: string) => void;
  deletePreset: (presetId: string) => void;
  clearAllFilters: () => void;
  totalActiveFilters: number;
}

export function useTaskFiltering({ tasks, userId }: UseTaskFilteringProps): UseTaskFilteringReturn {
  // Search and basic filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [onlyOverdue, setOnlyOverdue] = useState<boolean>(false);
  const [onlyAssignedToMe, setOnlyAssignedToMe] = useState<boolean>(false);

  // Advanced filters
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [finishDateOption, setFinishDateOption] = useState<string>('any');
  const [customFinishDate, setCustomFinishDate] = useState<Date | undefined>(undefined);
  const [sprintFilter, setSprintFilter] = useState<string | undefined>(undefined);
  const [releaseFilter, setReleaseFilter] = useState<string | undefined>(undefined);
  
  // Saved presets - get from localStorage on init
  const [savedPresets, setSavedPresets] = useState<FilterPreset[]>(() => {
    const storedPresets = localStorage.getItem('taskFilterPresets');
    return storedPresets ? JSON.parse(storedPresets) : [];
  });

  // Save presets to localStorage when they change
  useEffect(() => {
    localStorage.setItem('taskFilterPresets', JSON.stringify(savedPresets));
  }, [savedPresets]);

  // Calculate the total number of active filters
  const totalActiveFilters = useMemo(() => (
    (selectedStatuses.length) +
    (selectedPriorities.length) +
    (onlyOverdue ? 1 : 0) +
    (onlyAssignedToMe ? 1 : 0) +
    (selectedGoals.length) +
    (finishDateOption !== 'any' ? 1 : 0) +
    (sprintFilter ? 1 : 0) +
    (releaseFilter ? 1 : 0)
  ), [
    selectedStatuses, selectedPriorities, onlyOverdue, 
    onlyAssignedToMe, selectedGoals, finishDateOption,
    sprintFilter, releaseFilter
  ]);

  // Filter tasks based on all criteria
  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    
    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }
    
    // Status filter
    if (selectedStatuses.length > 0) {
      result = result.filter(task => selectedStatuses.includes(task.status));
    } else if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Priority filter
    if (selectedPriorities.length > 0) {
      result = result.filter(task => selectedPriorities.includes(task.priority));
    } else if (priorityFilter !== 'all') {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Assigned to me filter
    if (onlyAssignedToMe && userId) {
      result = result.filter(task => task.assignee === userId);
    }
    
    // Overdue filter
    if (onlyOverdue) {
      result = result.filter(task => isTaskOverdue(task));
    }
    
    // Goals filter
    if (selectedGoals.length > 0) {
      // In a real app, tasks would have a goals field
      // This is a placeholder implementation
      result = result.filter(task => {
        // Mock - in reality you'd check if any of selectedGoals are in task.goals
        // For now, we'll just filter based on task.id to demonstrate
        return selectedGoals.some(goal => task.id.includes(goal.slice(-1)));
      });
    }
    
    // Sprint filter
    if (sprintFilter) {
      // Mock implementation - in reality you'd check task.sprintId === sprintFilter
      result = result.filter(task => {
        // For demo purposes, we're using task ID to simulate sprint assignment
        return task.id.includes(sprintFilter.slice(-1));
      });
    }
    
    // Release filter
    if (releaseFilter) {
      // Mock implementation - in reality you'd check task.releaseId === releaseFilter
      result = result.filter(task => {
        // For demo purposes, we're using task ID to simulate release assignment
        return task.id.includes(releaseFilter.slice(-1));
      });
    }
    
    // Finish date filter
    if (finishDateOption !== 'any') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      
      const oneMonthLater = new Date(today);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      
      switch (finishDateOption) {
        case 'today':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < tomorrow;
          });
          break;
        case 'tomorrow':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            const nextDay = new Date(tomorrow);
            nextDay.setDate(nextDay.getDate() + 1);
            return dueDate >= tomorrow && dueDate < nextDay;
          });
          break;
        case 'this-week':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < oneWeekLater;
          });
          break;
        case 'this-month':
          result = result.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate < oneMonthLater;
          });
          break;
        case 'overdue':
          result = result.filter(task => isTaskOverdue(task));
          break;
        case 'no-date':
          result = result.filter(task => !task.dueDate);
          break;
        case 'custom':
          if (customFinishDate) {
            const nextDay = new Date(customFinishDate);
            nextDay.setDate(nextDay.getDate() + 1);
            result = result.filter(task => {
              if (!task.dueDate) return false;
              const dueDate = new Date(task.dueDate);
              return dueDate >= customFinishDate && dueDate < nextDay;
            });
          }
          break;
      }
    }
    
    return result;
  }, [
    tasks, searchQuery, statusFilter, selectedStatuses, 
    priorityFilter, selectedPriorities, onlyOverdue, 
    onlyAssignedToMe, userId, selectedGoals, finishDateOption, 
    customFinishDate, sprintFilter, releaseFilter
  ]);

  // Save current filters as a preset
  const savePreset = (name: string) => {
    if (!name.trim()) return;
    
    const newPreset: FilterPreset = {
      id: `preset-${Date.now()}`,
      name,
      filters: {
        status: selectedStatuses,
        priority: selectedPriorities,
        assignedToMe: onlyAssignedToMe,
        overdue: onlyOverdue,
        goals: selectedGoals,
        finishDateOption,
        customFinishDate,
        sprint: sprintFilter,
        release: releaseFilter
      }
    };
    
    setSavedPresets(prev => [...prev, newPreset]);
  };

  // Load a preset
  const loadPreset = (presetId: string) => {
    const preset = savedPresets.find(p => p.id === presetId);
    if (!preset) return;
    
    // Apply all the filters from the preset
    setSelectedStatuses(preset.filters.status);
    if (preset.filters.status.length === 1) {
      setStatusFilter(preset.filters.status[0]);
    } else if (preset.filters.status.length === 0) {
      setStatusFilter('all');
    }
    
    setSelectedPriorities(preset.filters.priority);
    if (preset.filters.priority.length === 1) {
      setPriorityFilter(preset.filters.priority[0]);
    } else if (preset.filters.priority.length === 0) {
      setPriorityFilter('all');
    }
    
    setOnlyAssignedToMe(preset.filters.assignedToMe);
    setOnlyOverdue(preset.filters.overdue);
    setSelectedGoals(preset.filters.goals);
    setFinishDateOption(preset.filters.finishDateOption);
    
    if (preset.filters.customFinishDate) {
      setCustomFinishDate(new Date(preset.filters.customFinishDate));
    } else {
      setCustomFinishDate(undefined);
    }
    
    setSprintFilter(preset.filters.sprint);
    setReleaseFilter(preset.filters.release);
  };

  // Delete a preset
  const deletePreset = (presetId: string) => {
    setSavedPresets(prev => prev.filter(p => p.id !== presetId));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedStatuses([]);
    setPriorityFilter('all');
    setSelectedPriorities([]);
    setOnlyAssignedToMe(false);
    setOnlyOverdue(false);
    setSelectedGoals([]);
    setFinishDateOption('any');
    setCustomFinishDate(undefined);
    setSprintFilter(undefined);
    setReleaseFilter(undefined);
  };

  return {
    filteredTasks,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedStatuses,
    setSelectedStatuses,
    priorityFilter,
    setPriorityFilter,
    selectedPriorities,
    setSelectedPriorities,
    onlyOverdue,
    setOnlyOverdue,
    onlyAssignedToMe,
    setOnlyAssignedToMe,
    selectedGoals,
    setSelectedGoals,
    finishDateOption,
    setFinishDateOption,
    customFinishDate,
    setCustomFinishDate,
    sprintFilter,
    setSprintFilter,
    releaseFilter,
    setReleaseFilter,
    savedPresets,
    savePreset,
    loadPreset,
    deletePreset,
    clearAllFilters,
    totalActiveFilters
  };
}
