
export interface BusinessHoursConfig {
  id: string;
  name: string;
  description: string;
  timeZone: string;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  holidays: Holiday[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DaySchedule {
  isWorkingDay: boolean;
  workingHours: TimeRange[];
}

export interface TimeRange {
  start: string; // HH:MM format
  end: string; // HH:MM format
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  description?: string;
  recurring: boolean;
}

export interface SLACalculationOptions {
  includeBusinessHoursOnly: boolean;
  businessHoursId?: string;
  excludeWeekends: boolean;
  excludeHolidays: boolean;
}
