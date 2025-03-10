
// Calendar types for change and release management
import { ChangeRequest } from './change';
import { Release } from './release';

export type CalendarViewType = 'day' | 'week' | 'month' | 'timeline';
export type CalendarEventType = 'change' | 'release';

export interface CalendarEvent {
  id: string;
  entityId: string; // ID of the associated change request or release
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  type: CalendarEventType;
  status: string;
  owner: string;
  impact?: string;
}

export interface CalendarFilters {
  type?: CalendarEventType | 'all';
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Helper interface for mapping data from changes and releases
export interface CalendarEventMapping {
  changes: {
    toEvent: (change: ChangeRequest) => CalendarEvent;
    getRoute: (id: string) => string;
  };
  releases: {
    toEvent: (release: Release) => CalendarEvent;
    getRoute: (id: string) => string;
  };
}
