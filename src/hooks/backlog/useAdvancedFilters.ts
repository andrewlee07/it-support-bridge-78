
import { useState, useMemo } from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { format, isAfter, isBefore, isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { BacklogFilter, FilterPreset } from './kanban/types';

export type DateFilterType = 'any' | 'today' | 'this-week' | 'this-month' | 'custom';

export interface DateFilter {
  type: DateFilterType;
  customDate?: Date;
}

interface StatusFilter {
  status: string[];
}

interface AssigneeFilter {
  assignee: string[];
}

interface PriorityFilter {
  priority: string[];
}

interface LabelFilter {
  label: string[];
}

interface ReleaseFilter {
  release: string[];
}

interface TextFilter {
  text: string;
}

export function useAdvancedFilters(items: BacklogItem[]) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>({ status: [] });
  const [assigneeFilter, setAssigneeFilter] = useState<AssigneeFilter>({ assignee: [] });
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>({ priority: [] });
  const [labelFilter, setLabelFilter] = useState<LabelFilter>({ label: [] });
  const [releaseFilter, setReleaseFilter] = useState<ReleaseFilter>({ release: [] });
  const [textFilter, setTextFilter] = useState<TextFilter>({ text: '' });
  const [dateFilter, setDateFilter] = useState<DateFilter>({ type: 'any', customDate: undefined });

  const updateStatusFilter = useCallback((status: string[]) => {
    setStatusFilter({ status });
  }, []);

  const updateAssigneeFilter = useCallback((assignee: string[]) => {
    setAssigneeFilter({ assignee });
  }, []);

  const updatePriorityFilter = useCallback((priority: string[]) => {
    setPriorityFilter({ priority });
  }, []);

  const updateLabelFilter = useCallback((label: string[]) => {
    setLabelFilter({ label });
  }, []);

  const updateReleaseFilter = useCallback((release: string[]) => {
    setReleaseFilter({ release });
  }, []);

  const updateTextFilter = useCallback((text: string) => {
    setTextFilter({ text: text });
  }, []);

  const updateDateFilter = useCallback((dateFilter: DateFilter) => {
    setDateFilter(dateFilter);
  }, []);

  const filterByStatus = useCallback((items: BacklogItem[], statusFilter: StatusFilter) => {
    if (statusFilter.status.length === 0) return items;
    return items.filter(item => statusFilter.status.includes(item.status));
  }, []);

  const filterByAssignee = useCallback((items: BacklogItem[], assigneeFilter: AssigneeFilter) => {
    if (assigneeFilter.assignee.length === 0) return items;
    return items.filter(item => assigneeFilter.assignee.includes(item.assignee || ''));
  }, []);

  const filterByPriority = useCallback((items: BacklogItem[], priorityFilter: PriorityFilter) => {
    if (priorityFilter.priority.length === 0) return items;
    return items.filter(item => priorityFilter.priority.includes(item.priority));
  }, []);

  const filterByLabel = useCallback((items: BacklogItem[], labelFilter: LabelFilter) => {
    if (labelFilter.label.length === 0) return items;
    return items.filter(item => {
      if (!item.labels) return false;
      return item.labels.some(label => labelFilter.label.includes(label));
    });
  }, []);

  const filterByRelease = useCallback((items: BacklogItem[], releaseFilter: ReleaseFilter) => {
    if (releaseFilter.release.length === 0) return items;
    return items.filter(item => releaseFilter.release.includes(item.releaseId || ''));
  }, []);

  const filterByText = useCallback((items: BacklogItem[], textFilter: TextFilter) => {
    if (!textFilter.text) return items;
    const searchTerm = textFilter.text.toLowerCase();
    return items.filter(item => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    });
  }, []);

  // Function to filter items based on due date
  const filterByDueDate = useCallback((items: BacklogItem[], dateFilter: DateFilter) => {
    if (dateFilter.type === 'any') return items;
    
    return items.filter(item => {
      if (!item.dueDate) return false;
      
      const dueDate = new Date(item.dueDate);
      const now = new Date();
      
      switch (dateFilter.type) {
        case 'today':
          return isWithinInterval(dueDate, {
            start: startOfDay(now),
            end: endOfDay(now)
          });
        case 'this-week':
          return isWithinInterval(dueDate, {
            start: startOfWeek(now),
            end: endOfWeek(now)
          });
        case 'this-month':
          return isWithinInterval(dueDate, {
            start: startOfMonth(now),
            end: endOfMonth(now)
          });
        case 'custom':
          if (!dateFilter.customDate) return true;
          return isSameDay(dueDate, dateFilter.customDate);
        default:
          return true;
      }
    });
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;
    result = filterByStatus(result, statusFilter);
    result = filterByAssignee(result, assigneeFilter);
    result = filterByPriority(result, priorityFilter);
    result = filterByLabel(result, labelFilter);
    result = filterByRelease(result, releaseFilter);
    result = filterByText(result, textFilter);
    result = filterByDueDate(result, dateFilter);
    return result;
  }, [items, statusFilter, assigneeFilter, priorityFilter, labelFilter, releaseFilter, textFilter, dateFilter, filterByStatus, filterByAssignee, filterByPriority, filterByLabel, filterByRelease, filterByText, filterByDueDate]);

  return {
    filteredItems,
    updateStatusFilter,
    updateAssigneeFilter,
    updatePriorityFilter,
    updateLabelFilter,
    updateReleaseFilter,
    updateTextFilter,
    updateDateFilter,
    statusFilter,
    assigneeFilter,
    priorityFilter,
    labelFilter,
    releaseFilter,
    textFilter,
    dateFilter: {
      type: 'any',
      customDate: undefined
    } as DateFilter,
  };
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
