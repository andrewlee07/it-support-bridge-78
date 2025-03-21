
import { useState } from 'react';
import { Problem } from '@/utils/types/problem';

export function useProblemTable(problems: Problem[]) {
  const [sortColumn, setSortColumn] = useState<string | null>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [slaType, setSlaType] = useState<'response' | 'resolution'>('resolution');

  const handleSort = (column: string) => {
    // If clicking the same column, toggle direction
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new column, set it as the sort column with default 'asc' direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500 hover:bg-blue-500';
      case 'under-investigation': return 'bg-purple-500 hover:bg-purple-500';
      case 'root-cause-identified': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'known-error': return 'bg-orange-500 hover:bg-orange-500';
      case 'resolved': return 'bg-green-500 hover:bg-green-500';
      case 'closed': return 'bg-gray-500 hover:bg-gray-500';
      case 'pending': return 'bg-amber-500 hover:bg-amber-500';
      default: return 'bg-gray-500 hover:bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'P2': return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'P3': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  // Sort problems based on current sort settings
  const sortedProblems = [...problems].sort((a, b) => {
    if (!sortColumn) return 0;

    let valueA, valueB;

    // Extract the values to compare based on the sortColumn
    switch (sortColumn) {
      case 'id':
      case 'title':
      case 'status':
      case 'priority':
        valueA = a[sortColumn as keyof Problem];
        valueB = b[sortColumn as keyof Problem];
        break;
      case 'assignedTo':
        valueA = a.assignedTo || '';
        valueB = b.assignedTo || '';
        break;
      case 'createdAt':
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      case 'sla':
        // Placeholder for SLA sorting - in a real app, you'd use actual SLA data
        valueA = 70;
        valueB = 70;
        break;
      default:
        return 0;
    }

    // Compare the values
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return {
    sortColumn,
    sortDirection,
    slaType,
    setSlaType,
    handleSort,
    getStatusColor,
    getPriorityColor,
    sortedProblems
  };
}
