
import { Ticket } from '@/utils/types/ticket';
import { format, differenceInHours, differenceInMinutes, addHours } from 'date-fns';

export type SLAType = 'response' | 'resolution';

interface SLAInfo {
  percentLeft: number;
  timeLeft: string;
  isBreached: boolean;
  slaTarget: Date;
  slaType: string;
}

// Default SLA targets in hours
const DEFAULT_SLA_TARGETS = {
  response: {
    P1: 1,
    P2: 2,
    P3: 4,
    P4: 8
  },
  resolution: {
    P1: 4,
    P2: 8,
    P3: 24,
    P4: 48
  }
};

export const calculateSLAStatus = (ticket: Ticket, slaType: SLAType): SLAInfo => {
  // For resolved or closed tickets, return completed status
  if (['resolved', 'closed', 'fulfilled'].includes(ticket.status)) {
    return {
      percentLeft: 100,
      timeLeft: 'Completed',
      isBreached: false,
      slaTarget: new Date(),
      slaType: slaType === 'response' ? 'Response' : 'Resolution'
    };
  }
  
  const createdAt = new Date(ticket.createdAt);
  const priority = ticket.priority as ('P1' | 'P2' | 'P3' | 'P4');
  
  // Get SLA target in hours based on priority and SLA type
  const targetHours = DEFAULT_SLA_TARGETS[slaType][priority];
  const slaTarget = addHours(createdAt, targetHours);
  
  // Calculate time remaining
  const now = new Date();
  const isBreached = now > slaTarget;
  
  // Calculate percentage of time left
  const totalDuration = slaTarget.getTime() - createdAt.getTime();
  const elapsedDuration = now.getTime() - createdAt.getTime();
  const percentUsed = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
  const percentLeft = Math.max(0, 100 - percentUsed);
  
  // Format time left as a readable string
  let timeLeft = '';
  if (isBreached) {
    const hours = differenceInHours(now, slaTarget);
    const mins = differenceInMinutes(now, slaTarget) % 60;
    timeLeft = `Overdue by ${hours > 0 ? `${hours}h ` : ''}${mins}m`;
  } else {
    const hours = differenceInHours(slaTarget, now);
    const mins = differenceInMinutes(slaTarget, now) % 60;
    timeLeft = `${hours > 0 ? `${hours}h ` : ''}${mins}m remaining`;
  }
  
  return {
    percentLeft: Math.round(percentLeft),
    timeLeft,
    isBreached,
    slaTarget,
    slaType: slaType === 'response' ? 'Response' : 'Resolution'
  };
};
