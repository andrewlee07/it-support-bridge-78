
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Ticket } from '@/utils/types/ticket';
import { mockSLAs } from '@/utils/mockData/slas';

export type SLAStatus = 'ok' | 'warning' | 'breached';
export type SLAType = 'response' | 'resolution';

export interface SLAInfo {
  status: SLAStatus;
  timeLeft?: string; // Time left before breach or time since breach
  percentLeft?: number; // Percentage of time left (for progress bars)
  completed?: boolean; // Whether the SLA is completed (ticket resolved/closed)
  slaType?: string; // What type of SLA this is (response, resolution)
  slaName?: string; // Name of the SLA policy
}

/**
 * Calculate SLA status for a ticket
 */
export const calculateSLAStatus = (ticket: Ticket, slaType: SLAType = 'resolution'): SLAInfo => {
  // Find the appropriate SLA for this ticket
  const sla = mockSLAs.find(
    s => s.ticketType === ticket.type && s.priorityLevel === ticket.priority
  );
  
  // If the ticket is resolved or closed, mark SLA as completed
  if (!sla || ticket.status === 'closed' || ticket.status === 'resolved') {
    return { 
      status: 'ok',
      completed: true 
    };
  }
  
  const now = new Date();
  const createdAt = new Date(ticket.createdAt);
  
  // Calculate total resolution/response time in minutes based on the selected type
  const totalTimeHours = slaType === 'resolution' ? sla.resolutionTimeHours : sla.responseTimeHours;
  const totalTimeMinutes = totalTimeHours * 60;
  
  // Calculate elapsed time in minutes
  const elapsedMinutes = differenceInMinutes(now, createdAt);
  
  // Calculate minutes left
  const minutesLeft = totalTimeMinutes - elapsedMinutes;
  
  // Calculate percentage left (for progress bars)
  const percentLeft = Math.max(0, Math.min(100, (minutesLeft / totalTimeMinutes) * 100));
  
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
  } else if (minutesLeft < totalTimeMinutes * 0.2) { // Warning at 20% time left
    status = 'warning';
  }
  
  return {
    status,
    timeLeft: formatTimeLeft(minutesLeft),
    percentLeft,
    completed: false,
    slaType: slaType === 'resolution' ? 'Resolution' : 'Response', // Capitalize for display
    slaName: sla.name // Include the SLA policy name
  };
};
