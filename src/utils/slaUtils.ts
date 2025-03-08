
import { addHours, differenceInMinutes, differenceInHours, isWithinInterval } from 'date-fns';
import { SLA } from './types/sla';
import { Ticket } from './types/ticket';
// Importing correct functions from date-fns-tz
import { toZonedTime, utcToZonedTime } from 'date-fns-tz';
import { getBusinessHoursById } from './mockData/businessHours';

/**
 * Calculates if an SLA is breached based on the ticket and SLA definition
 */
export const isSLABreached = (ticket: Ticket, sla: SLA): boolean => {
  if (ticket.status === 'resolved' || ticket.status === 'closed') {
    // For resolved tickets, check if resolution time was within SLA
    if (ticket.resolvedAt) {
      const resolutionTime = calculateResolutionTime(ticket, sla);
      return resolutionTime > sla.resolutionTimeHours * 60; // Convert hours to minutes
    }
    return false;
  }
  
  // For open tickets, check if current time exceeds SLA
  const currentTime = new Date();
  const creationTime = new Date(ticket.createdAt);
  
  // Calculate elapsed time based on SLA calculation options
  const elapsedMinutes = calculateElapsedTime(ticket, sla, currentTime);
  
  // Convert SLA targets to minutes
  const resolutionTimeMinutes = sla.resolutionTimeHours * 60;
  
  // Check if elapsed time exceeds resolution time target
  return elapsedMinutes > resolutionTimeMinutes;
};

/**
 * Calculates resolution time in minutes considering SLA calculation options
 */
export const calculateResolutionTime = (ticket: Ticket, sla: SLA): number => {
  if (!ticket.resolvedAt) return 0;
  
  return calculateElapsedTime(ticket, sla, ticket.resolvedAt);
};

/**
 * Calculates elapsed time considering business hours and pause options
 */
export const calculateElapsedTime = (ticket: Ticket, sla: SLA, endTime: Date): number => {
  const startTime = new Date(ticket.createdAt);
  let totalMinutes = differenceInMinutes(endTime, startTime);
  
  const { calculationOptions } = sla;
  
  // Adjust for business hours if specified
  if (calculationOptions?.pauseOutsideBusinessHours) {
    totalMinutes = adjustForBusinessHours(startTime, endTime, calculationOptions.businessHoursId);
  }
  
  // Adjust for time spent in pending status
  if (calculationOptions?.pauseDuringPendingStatus && ticket.pendingStartDate) {
    const pendingEndDate = ticket.status === 'pending' ? endTime : ticket.updatedAt;
    const pendingMinutes = differenceInMinutes(pendingEndDate, ticket.pendingStartDate);
    totalMinutes -= pendingMinutes > 0 ? pendingMinutes : 0;
  }
  
  return totalMinutes;
};

/**
 * Adjusts elapsed time by considering only business hours
 */
export const adjustForBusinessHours = (startTime: Date, endTime: Date, businessHoursId: string): number => {
  const businessHours = getBusinessHoursById(businessHoursId);
  if (!businessHours) return differenceInMinutes(endTime, startTime);
  
  // Implementation for business hours adjustment would go here
  // This would need to consider working days and working hours
  
  // Placeholder: Return 80% of total time as a simple approximation
  return Math.floor(differenceInMinutes(endTime, startTime) * 0.8);
};

/**
 * Calculate SLA percentage (how much of the allocated time has been used)
 */
export const calculateSLAPercentage = (ticket: Ticket, sla: SLA): number => {
  if (ticket.status === 'resolved' || ticket.status === 'closed') {
    const resolutionTimeMinutes = calculateResolutionTime(ticket, sla);
    const targetMinutes = sla.resolutionTimeHours * 60;
    return Math.min(Math.round((resolutionTimeMinutes / targetMinutes) * 100), 100);
  }
  
  const elapsedMinutes = calculateElapsedTime(ticket, sla, new Date());
  const targetMinutes = sla.resolutionTimeHours * 60;
  
  return Math.min(Math.round((elapsedMinutes / targetMinutes) * 100), 100);
};

/**
 * Get remaining time for SLA in hours and minutes
 */
export const getSLARemainingTime = (ticket: Ticket, sla: SLA): { hours: number, minutes: number } | null => {
  if (ticket.status === 'resolved' || ticket.status === 'closed') {
    return null;
  }
  
  const elapsedMinutes = calculateElapsedTime(ticket, sla, new Date());
  const targetMinutes = sla.resolutionTimeHours * 60;
  
  const remainingMinutes = targetMinutes - elapsedMinutes;
  
  if (remainingMinutes <= 0) {
    return { hours: 0, minutes: 0 };
  }
  
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;
  
  return { hours, minutes };
};
