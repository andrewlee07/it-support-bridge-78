
import { Ticket, PendingSubStatus } from './types/ticket';
import { SLA } from './types/sla';
import { differenceInMilliseconds, addMilliseconds, isWithinInterval, getDay } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { BusinessHours, WorkingDay } from './types/businessHours';

// Map of day number to WorkingDay type
const dayMap: Record<number, WorkingDay> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
};

/**
 * Calculates the SLA breach timestamp for a ticket
 */
export const calculateSLABreachTime = (
  ticket: Ticket,
  sla: SLA,
  businessHours?: BusinessHours
): Date => {
  // Start with creation time
  const creationTime = new Date(ticket.createdAt);
  
  // Choose response or resolution time based on whether we've had a response
  const slaHours = ticket.firstResponseAt 
    ? sla.resolutionTimeHours // Use resolution time if we've had a response
    : sla.responseTimeHours;  // Use response time if we haven't had a response
    
  // Convert hours to milliseconds
  const slaMilliseconds = slaHours * 60 * 60 * 1000;
  
  // If we don't need to consider business hours and pending status, simple calculation
  if (!sla.calculationOptions.pauseOutsideBusinessHours && !sla.calculationOptions.pauseDuringPendingStatus) {
    return new Date(creationTime.getTime() + slaMilliseconds);
  }
  
  // Account for any already paused time
  const pausedDuration = ticket.slaTotalPausedDuration || 0;
  
  // Basic calculation without business hours but accounting for already paused time
  if (!sla.calculationOptions.pauseOutsideBusinessHours || !businessHours) {
    return new Date(creationTime.getTime() + slaMilliseconds + pausedDuration);
  }
  
  // For complex business hours calculation we need to progressively add time
  // This is a simplified implementation; a full implementation would track
  // all working hours between start and estimated end time
  
  // Start with creation time in the business time zone
  const timeZone = businessHours.timeZone || 'UTC';
  const zonedCreationTime = utcToZonedTime(creationTime, timeZone);
  
  // Parse business hours start and end times
  const [startHour, startMinute] = businessHours.startTime.split(':').map(Number);
  const [endHour, endMinute] = businessHours.endTime.split(':').map(Number);
  
  // Calculate business hours duration in milliseconds per day
  const businessHoursPerDay = 
    (endHour * 60 + endMinute - (startHour * 60 + startMinute)) * 60 * 1000;
  
  // Calculate how many full business days and remaining milliseconds
  const fullBusinessDays = Math.floor(slaMilliseconds / businessHoursPerDay);
  let remainingMilliseconds = slaMilliseconds % businessHoursPerDay;
  
  // Start with creation time
  let currentTime = new Date(zonedCreationTime);
  
  // Add business days
  let addedDays = 0;
  while (addedDays < fullBusinessDays) {
    // Add a day
    currentTime.setDate(currentTime.getDate() + 1);
    
    // Check if it's a working day
    const dayOfWeek = dayMap[getDay(currentTime)];
    if (businessHours.workingDays.includes(dayOfWeek)) {
      addedDays++;
    }
  }
  
  // Set time to end of business day
  currentTime.setHours(endHour, endMinute, 0, 0);
  
  // If there are remaining milliseconds, add them only during business hours
  if (remainingMilliseconds > 0) {
    // This is simplified - a real implementation would need to track
    // working vs. non-working time more carefully
    currentTime = addMilliseconds(currentTime, remainingMilliseconds);
  }
  
  // Convert back to UTC
  const utcBreachTime = zonedTimeToUtc(currentTime, timeZone);
  
  // Add any previously paused duration
  return addMilliseconds(utcBreachTime, pausedDuration);
};

/**
 * Checks if a given time is within business hours
 */
export const isWithinBusinessHours = (
  time: Date,
  businessHours: BusinessHours
): boolean => {
  const timeZone = businessHours.timeZone || 'UTC';
  const zonedTime = utcToZonedTime(time, timeZone);
  
  // Check if it's a working day
  const dayOfWeek = dayMap[getDay(zonedTime)];
  if (!businessHours.workingDays.includes(dayOfWeek)) {
    return false;
  }
  
  // Parse business hours start and end times
  const [startHour, startMinute] = businessHours.startTime.split(':').map(Number);
  const [endHour, endMinute] = businessHours.endTime.split(':').map(Number);
  
  // Check if current time is within business hours
  const startTime = new Date(zonedTime);
  startTime.setHours(startHour, startMinute, 0, 0);
  
  const endTime = new Date(zonedTime);
  endTime.setHours(endHour, endMinute, 0, 0);
  
  return isWithinInterval(zonedTime, { start: startTime, end: endTime });
};

/**
 * Handles pausing the SLA when a ticket enters pending status
 */
export const pauseSLA = (
  ticket: Ticket, 
  reason: 'pending-status' | 'outside-business-hours'
): Ticket => {
  const now = new Date();
  
  // Create a copy of the ticket
  const updatedTicket = { ...ticket };
  
  // Set the appropriate pause timestamp
  if (!updatedTicket.slaResponsePausedAt && !updatedTicket.firstResponseAt) {
    updatedTicket.slaResponsePausedAt = now;
  }
  
  if (!updatedTicket.slaResolutionPausedAt) {
    updatedTicket.slaResolutionPausedAt = now;
  }
  
  return updatedTicket;
};

/**
 * Handles resuming the SLA when a ticket leaves pending status
 */
export const resumeSLA = (
  ticket: Ticket,
  reason: 'pending-status' | 'outside-business-hours'
): Ticket => {
  const now = new Date();
  
  // Create a copy of the ticket
  const updatedTicket = { ...ticket };
  
  // Calculate paused duration for response SLA
  if (updatedTicket.slaResponsePausedAt && !updatedTicket.firstResponseAt) {
    const pausedDuration = differenceInMilliseconds(now, updatedTicket.slaResponsePausedAt);
    updatedTicket.slaTotalPausedDuration = (updatedTicket.slaTotalPausedDuration || 0) + pausedDuration;
    updatedTicket.slaResponsePausedAt = undefined;
  }
  
  // Calculate paused duration for resolution SLA
  if (updatedTicket.slaResolutionPausedAt) {
    const pausedDuration = differenceInMilliseconds(now, updatedTicket.slaResolutionPausedAt);
    updatedTicket.slaTotalPausedDuration = (updatedTicket.slaTotalPausedDuration || 0) + pausedDuration;
    updatedTicket.slaResolutionPausedAt = undefined;
  }
  
  return updatedTicket;
};

/**
 * Handles recording a response (first note) on a ticket
 */
export const recordFirstResponse = (ticket: Ticket): Ticket => {
  const now = new Date();
  
  // Create a copy of the ticket
  const updatedTicket = { ...ticket };
  
  // If this is the first response, set firstResponseAt
  if (!updatedTicket.firstResponseAt) {
    updatedTicket.firstResponseAt = now;
    
    // If response SLA was paused, resume it for accounting
    if (updatedTicket.slaResponsePausedAt) {
      const pausedDuration = differenceInMilliseconds(now, updatedTicket.slaResponsePausedAt);
      updatedTicket.slaTotalPausedDuration = (updatedTicket.slaTotalPausedDuration || 0) + pausedDuration;
      updatedTicket.slaResponsePausedAt = undefined;
    }
  }
  
  return updatedTicket;
};

/**
 * Updates SLA status based on ticket status changes
 */
export const updateSLAOnStatusChange = (
  ticket: Ticket, 
  oldStatus: string, 
  newStatus: string,
  pendingSubStatus?: PendingSubStatus,
  businessHours?: BusinessHours
): Ticket => {
  let updatedTicket = { ...ticket };
  
  // Handle transition to 'pending' status
  if (newStatus === 'pending' && oldStatus !== 'pending') {
    updatedTicket = pauseSLA(updatedTicket, 'pending-status');
    
    // Set the pending sub-status
    if (pendingSubStatus) {
      updatedTicket.pendingSubStatus = pendingSubStatus;
    }
  }
  
  // Handle transition from 'pending' status
  else if (oldStatus === 'pending' && newStatus !== 'pending') {
    updatedTicket = resumeSLA(updatedTicket, 'pending-status');
    
    // Clear the pending sub-status
    updatedTicket.pendingSubStatus = undefined;
  }
  
  // Handle resolved/fulfilled status
  if (newStatus === 'resolved' || newStatus === 'fulfilled') {
    updatedTicket.resolvedAt = new Date();
  }
  
  // Handle closed status
  if (newStatus === 'closed') {
    if (!updatedTicket.closedAt) {
      updatedTicket.closedAt = new Date();
    }
  }
  
  return updatedTicket;
};
