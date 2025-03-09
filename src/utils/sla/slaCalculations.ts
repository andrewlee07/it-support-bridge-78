
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';
import { mockSLAs } from '@/utils/mockData/slas';

export type SLAStatus = 'ok' | 'warning' | 'breached';

export interface SLAInfo {
  status: SLAStatus;
  timeLeft?: string; // Time left before breach or time since breach
  percentLeft?: number; // Percentage of time left (for progress bars)
}

/**
 * Calculate SLA status for a ticket
 */
export const calculateSLAStatus = (ticket: Ticket): SLAInfo => {
  // Find the appropriate SLA for this ticket
  const sla = mockSLAs.find(
    s => s.ticketType === ticket.type && s.priorityLevel === ticket.priority
  );
  
  if (!sla || ticket.status === 'closed' || ticket.status === 'resolved') {
    return { status: 'ok' };
  }
  
  const now = new Date();
  const createdAt = new Date(ticket.createdAt);
  
  // Calculate total resolution time in minutes
  const totalResolutionTime = sla.resolutionTimeHours * 60;
  
  // Calculate elapsed time in minutes
  const elapsedMinutes = differenceInMinutes(now, createdAt);
  
  // Calculate minutes left
  const minutesLeft = totalResolutionTime - elapsedMinutes;
  
  // Calculate percentage left (for progress bars)
  const percentLeft = Math.max(0, Math.min(100, (minutesLeft / totalResolutionTime) * 100));
  
  // Format time left as hours and minutes
  const formatTimeLeft = (minutes: number): string => {
    const absMinutes = Math.abs(minutes);
    const hours = Math.floor(absMinutes / 60);
    const mins = Math.floor(absMinutes % 60);
    
    if (minutes < 0) {
      return `${hours}h ${mins}m overdue`;
    }
    return `${hours}h ${mins}m left`;
  };
  
  // Determine SLA status
  let status: SLAStatus = 'ok';
  if (minutesLeft < 0) {
    status = 'breached';
  } else if (minutesLeft < totalResolutionTime * 0.2) { // Warning at 20% time left
    status = 'warning';
  }
  
  return {
    status,
    timeLeft: formatTimeLeft(minutesLeft),
    percentLeft
  };
};
