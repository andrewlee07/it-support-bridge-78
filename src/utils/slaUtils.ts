
import { differenceInMinutes, isAfter } from 'date-fns';
import { Ticket } from './types/ticket';
import { getTicketsSLA } from './mockData/slas';

// Define SLA timeframes - in a real app these would come from a configuration or database
export const SLA_TIMEFRAMES = {
  responseTime: {
    P1: 30, // minutes
    P2: 60,
    P3: 240,
    P4: 480
  },
  resolutionTime: {
    P1: 240, // minutes
    P2: 480,
    P3: 1440,
    P4: 2880
  }
};

/**
 * Calculate SLA breach percentage (how close we are to breaching SLA)
 * @param ticket The ticket to calculate SLA for
 * @param slaType 'response' or 'resolution'
 * @returns A number from 0-100 where 100 means SLA has been breached
 */
export const calculateSLAPercentage = (ticket: Ticket, slaType: 'response' | 'resolution' = 'resolution'): number => {
  // If ticket is resolved/closed/fulfilled, SLA is not relevant
  if (['resolved', 'closed', 'fulfilled'].includes(ticket.status)) {
    return 0;
  }

  // Get appropriate SLA timeframe based on priority and type
  const timeframes = SLA_TIMEFRAMES[slaType === 'response' ? 'responseTime' : 'resolutionTime'];
  const targetMinutes = timeframes[ticket.priority as keyof typeof timeframes] || timeframes.P3;
  
  // Calculate elapsed time
  const createdAt = new Date(ticket.createdAt);
  const now = new Date();
  
  // For response time, if the ticket has been responded to, use that time instead of now
  const endTime = slaType === 'response' && ticket.firstResponseAt ? new Date(ticket.firstResponseAt) : now;
  
  // Calculate minutes elapsed
  const minutesElapsed = differenceInMinutes(endTime, createdAt);
  
  // Calculate percentage of SLA used
  const percentage = Math.min(100, Math.round((minutesElapsed / targetMinutes) * 100));
  
  return percentage;
};

/**
 * Check if SLA has been breached
 * @param ticket The ticket to check
 * @param slaType 'response' or 'resolution'
 * @returns Boolean indicating whether SLA has been breached
 */
export const isSLABreached = (ticket: Ticket, slaType: 'response' | 'resolution' = 'resolution'): boolean => {
  return calculateSLAPercentage(ticket, slaType) >= 100;
};

/**
 * Calculate SLA status - returns one of: 'ok', 'warning', 'breached'
 * @param ticket The ticket to calculate status for
 * @param slaType 'response' or 'resolution'
 * @returns SLA status string
 */
export const getSLAStatus = (ticket: Ticket, slaType: 'response' | 'resolution' = 'resolution'): 'ok' | 'warning' | 'breached' => {
  // If ticket is resolved or closed, SLA is considered ok
  if (['resolved', 'closed', 'fulfilled'].includes(ticket.status)) {
    return 'ok';
  }
  
  // For response SLA, if ticket has been responded to, SLA is considered ok
  if (slaType === 'response' && ticket.status !== 'new' && ticket.firstResponseAt) {
    return 'ok';
  }
  
  const percentage = calculateSLAPercentage(ticket, slaType);
  
  if (percentage >= 100) {
    return 'breached';
  } else if (percentage >= 80) {
    return 'warning';
  } else {
    return 'ok';
  }
};

/**
 * Get formatted time remaining for SLA
 * @param ticket The ticket to calculate time for
 * @param slaType 'response' or 'resolution'
 * @returns Formatted string of time remaining or breached by
 */
export const getSLATimeRemaining = (ticket: Ticket, slaType: 'response' | 'resolution' = 'resolution'): string => {
  // Get appropriate SLA timeframe
  const timeframes = SLA_TIMEFRAMES[slaType === 'response' ? 'responseTime' : 'resolutionTime'];
  const targetMinutes = timeframes[ticket.priority as keyof typeof timeframes] || timeframes.P3;
  
  // Calculate elapsed time
  const createdAt = new Date(ticket.createdAt);
  const now = new Date();
  const minutesElapsed = differenceInMinutes(now, createdAt);
  
  // Calculate minutes remaining
  const minutesRemaining = targetMinutes - minutesElapsed;
  
  // Format the time
  if (minutesRemaining <= 0) {
    const minutesBreached = Math.abs(minutesRemaining);
    const hours = Math.floor(minutesBreached / 60);
    const minutes = minutesBreached % 60;
    return hours > 0 ? `Breached by ${hours}h ${minutes}m` : `Breached by ${minutes}m`;
  } else {
    const hours = Math.floor(minutesRemaining / 60);
    const minutes = minutesRemaining % 60;
    return hours > 0 ? `${hours}h ${minutes}m remaining` : `${minutes}m remaining`;
  }
};
