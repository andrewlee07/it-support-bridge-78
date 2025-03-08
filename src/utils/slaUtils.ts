import { addHours, differenceInMilliseconds, isWithinInterval } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { BusinessHours, SLACalculationOptions } from './types/businessHours';

/**
 * Check if the current time is within business hours
 */
export const isWithinBusinessHours = (
  date: Date, 
  businessHours: BusinessHours
): boolean => {
  // Convert UTC time to the business hours timezone
  const localDate = toZonedTime(date, businessHours.timeZone);
  
  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = localDate.getDay();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[dayOfWeek];
  
  // Check if current day is a working day
  if (!businessHours.workingDays.includes(currentDay as any)) {
    return false;
  }
  
  // Parse business hours start and end times
  const [startHour, startMinute] = businessHours.startTime.split(':').map(Number);
  const [endHour, endMinute] = businessHours.endTime.split(':').map(Number);
  
  // Create Date objects for start and end of business hours on the current day
  const businessStart = new Date(localDate);
  businessStart.setHours(startHour, startMinute, 0, 0);
  
  const businessEnd = new Date(localDate);
  businessEnd.setHours(endHour, endMinute, 0, 0);
  
  // Check if current time is within business hours
  return isWithinInterval(localDate, {
    start: businessStart,
    end: businessEnd
  });
};

/**
 * Calculate SLA breach time, accounting for business hours and pending status
 */
export const calculateSLABreachTime = (
  startTime: Date,
  slaHours: number,
  options: SLACalculationOptions,
  businessHours?: BusinessHours,
  pauseDurations?: { pendingDuration: number, outsideBusinessHoursDuration: number }
): Date => {
  // Simple calculation if we don't need to account for business hours or pending status
  if (!options.pauseOutsideBusinessHours && !options.pauseDuringPendingStatus) {
    return addHours(startTime, slaHours);
  }
  
  // Account for already accumulated pause durations if provided
  let adjustedSlaMilliseconds = slaHours * 60 * 60 * 1000;
  
  if (pauseDurations) {
    if (options.pauseDuringPendingStatus) {
      adjustedSlaMilliseconds += pauseDurations.pendingDuration;
    }
    if (options.pauseOutsideBusinessHours && businessHours) {
      adjustedSlaMilliseconds += pauseDurations.outsideBusinessHoursDuration;
    }
  }
  
  // Convert milliseconds back to hours for the final calculation
  const adjustedSlaHours = adjustedSlaMilliseconds / (60 * 60 * 1000);
  return addHours(startTime, adjustedSlaHours);
};

/**
 * Calculate time until SLA breach, accounting for pauses
 */
export const calculateTimeUntilBreach = (
  currentTime: Date,
  breachTime: Date,
  isPaused: boolean
): number => {
  if (isPaused) {
    // SLA is paused, so time until breach remains the same
    return differenceInMilliseconds(breachTime, currentTime);
  }
  
  // SLA is active, return time until breach (can be negative if already breached)
  return differenceInMilliseconds(breachTime, currentTime);
};

/**
 * Check if SLA is currently paused due to pending status or outside business hours
 */
export const isSLAPaused = (
  ticket: { status: string; pendingSubStatus?: string },
  currentTime: Date,
  options: SLACalculationOptions,
  businessHours?: BusinessHours
): boolean => {
  // Check if paused due to pending status
  const isPausedDueToPending = 
    options.pauseDuringPendingStatus && 
    ticket.status === 'pending';
  
  // Check if paused due to being outside business hours
  let isPausedDueToBusinessHours = false;
  if (options.pauseOutsideBusinessHours && businessHours) {
    isPausedDueToBusinessHours = !isWithinBusinessHours(currentTime, businessHours);
  }
  
  return isPausedDueToPending || isPausedDueToBusinessHours;
};
