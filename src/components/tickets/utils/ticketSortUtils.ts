
import { Ticket } from '@/utils/types/ticket';
import { SortKey, SortDirection } from '../types/ticketTableTypes';
import { calculateSLAStatus, SLAType } from '@/utils/sla/slaCalculations';

// Sort tickets based on sort key and direction
export const getSortedTickets = (
  tickets: Ticket[],
  sortKey: SortKey,
  sortDirection: SortDirection
): Ticket[] => {
  const sortFactor = sortDirection === 'asc' ? 1 : -1;
  
  return [...tickets].sort((a, b) => {
    switch (sortKey) {
      case 'id':
        return sortFactor * a.id.localeCompare(b.id);
      case 'title':
        return sortFactor * a.title.localeCompare(b.title);
      case 'priority':
        return sortFactor * a.priority.localeCompare(b.priority);
      case 'status':
        return sortFactor * a.status.localeCompare(b.status);
      case 'assignedTo':
        const aAssigned = a.assignedTo || '';
        const bAssigned = b.assignedTo || '';
        return sortFactor * aAssigned.localeCompare(bAssigned);
      case 'sla':
        const aStatus = calculateSLAStatus(a, 'resolution');
        const bStatus = calculateSLAStatus(b, 'resolution');
        // Order: breached > non-breached
        return sortFactor * (aStatus.isBreached === bStatus.isBreached ? 0 : aStatus.isBreached ? -1 : 1);
      case 'createdAt':
      default:
        return sortFactor * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  });
};
