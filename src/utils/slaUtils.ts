
// SLA utility functions
import { SLA } from './types/sla';
import { Ticket } from './types/ticket';
import { formatDistance, differenceInHours, differenceInMinutes, isWithinInterval } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'; // Fixed import from utcToZonedTime to toZonedTime
import { mockSLAs } from './mockData/slas'; // Use mockSLAs instead of businessHours

/**
 * Calculates whether an SLA has been breached
 * @param ticket The ticket to check
 * @param sla The SLA to apply
 * @returns boolean indicating if the SLA has been breached
 */
export const isSLABreached = (ticket: Ticket, sla: SLA): boolean => {
  if (!ticket.createdAt) return false;
  
  const creationTime = new Date(ticket.createdAt);
  const currentTime = new Date();
  
  // For resolution time breach check
  if (sla.resolutionTimeHours) {
    const resolutionDeadline = new Date(creationTime);
    resolutionDeadline.setHours(resolutionDeadline.getHours() + sla.resolutionTimeHours);
    
    // If we're past the deadline and ticket isn't resolved
    if (currentTime > resolutionDeadline && ticket.status !== 'resolved' && ticket.status !== 'closed') {
      return true;
    }
  }
  
  // For response time breach check
  if (sla.responseTimeHours) {
    const responseDeadline = new Date(creationTime);
    responseDeadline.setHours(responseDeadline.getHours() + sla.responseTimeHours);
    
    // If we're past the deadline and ticket hasn't been responded to
    if (currentTime > responseDeadline && !ticket.firstResponseAt) {
      return true;
    }
  }
  
  return false;
};

/**
 * Gets the SLA that applies to a specific ticket
 * @param ticket Ticket to get SLA for
 * @returns The matching SLA or null if none found
 */
export const getApplicableSLA = (ticket: Ticket): SLA | null => {
  // Filter SLAs by ticket type and priority
  const applicableSLAs = mockSLAs.filter(sla => {
    const ticketTypeMatches = 
      (ticket.type === 'incident' && sla.ticketType === 'incident') ||
      (ticket.type === 'service' && sla.ticketType === 'service');
    
    const priorityMatches = sla.priorityLevel === ticket.priority;
    
    return ticketTypeMatches && priorityMatches && sla.isActive;
  });
  
  // Return the first matching SLA or null if none found
  return applicableSLAs.length > 0 ? applicableSLAs[0] : null;
};

/**
 * Calculates the time remaining before SLA breach
 * @param ticket The ticket to check
 * @param sla The SLA to apply
 * @returns Formatted string showing time remaining or 'Breached' if already breached
 */
export const getTimeUntilSLABreach = (ticket: Ticket, sla: SLA): string => {
  if (isSLABreached(ticket, sla)) {
    return 'Breached';
  }
  
  if (!ticket.createdAt) return 'Unknown';
  
  const creationTime = new Date(ticket.createdAt);
  const currentTime = new Date();
  
  // Calculate deadline based on ticket status
  let deadline: Date;
  
  if (ticket.status === 'new' || !ticket.firstResponseAt) {
    // For tickets awaiting first response, use response time SLA
    deadline = new Date(creationTime);
    deadline.setHours(deadline.getHours() + sla.responseTimeHours);
  } else {
    // For tickets in progress, use resolution time SLA
    deadline = new Date(creationTime);
    deadline.setHours(deadline.getHours() + sla.resolutionTimeHours);
  }
  
  // If we've already passed the deadline
  if (currentTime > deadline) {
    return 'Breached';
  }
  
  // Return human-readable format of time remaining
  return formatDistance(deadline, currentTime, { addSuffix: false });
};

/**
 * Adjusts the SLA calculation based on business hours if configured
 * This is a placeholder for the actual implementation
 */
export const adjustForBusinessHours = (startTime: Date, endTime: Date, sla: SLA): number => {
  // Placeholder implementation
  // In a real implementation, this would:
  // 1. Check if SLA is configured to respect business hours
  // 2. Calculate elapsed time only during business hours
  // 3. Apply timezone adjustments
  
  if (!sla.calculationOptions.pauseOutsideBusinessHours) {
    // If not respecting business hours, just return the full difference
    return differenceInHours(endTime, startTime);
  }
  
  // Placeholder - in real implementation we would load business hours
  // and perform complex calculation
  return differenceInHours(endTime, startTime) / 2; // Just an example
};

/**
 * Checks if SLA calculation should be paused
 * @param ticket The ticket to check
 * @param sla The SLA configuration
 */
export const shouldPauseSLACalculation = (ticket: Ticket, sla: SLA): boolean => {
  // Pause if configured to pause during pending status and ticket is pending
  if (sla.calculationOptions.pauseDuringPendingStatus && ticket.status === 'pending') {
    return true;
  }
  
  // Additional pause logic can be added here
  
  return false;
};
