
export interface BusinessHours {
  id: string;
  name: string;
  startTime: string; // In format "HH:MM" (24-hour)
  endTime: string;   // In format "HH:MM" (24-hour)
  workingDays: WorkingDay[];
  timeZone: string;  // IANA time zone name (e.g., "Europe/London")
  dstRules: DaylightSavingRule[];
  entityType: 'incident' | 'service-request';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkingDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface DaylightSavingRule {
  id: string;
  name: string;
  startDate: Date;  // When DST starts
  endDate: Date;    // When DST ends
  offsetMinutes: number; // Typically 60 (1 hour)
  year: number;
  isActive: boolean;
}

export interface SLACalculationOptions {
  pauseOutsideBusinessHours: boolean;
  pauseDuringPendingStatus: boolean;
  businessHoursId?: string;
}
