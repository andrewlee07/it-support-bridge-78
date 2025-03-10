
// Calendar types for change and release management
import { ChangeRequest } from './change';
import { Release } from './release';

export type CalendarViewType = 'day' | 'week' | 'month';
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

// Service types
export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  status: 'active' | 'inactive' | 'maintenance' | 'deprecated';
  owner?: string;
  supportContact?: string;
  slaId?: string;
  createdAt: Date;
  updatedAt: Date;
  // New fields for relationships
  relatedServiceIds?: string[]; // IDs of related services
  parentServiceId?: string;     // ID of parent service if this is a sub-service/module
}

export interface ServiceRelationship {
  id: string;
  sourceServiceId: string;
  targetServiceId: string;
  relationshipType: 'depends-on' | 'parent-child' | 'component-of' | 'related-to';
  description?: string;
  strength?: 'weak' | 'medium' | 'strong';
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

export interface ServiceWithRelationships extends ServiceWithCategory {
  relationships: ServiceRelationship[];
  children?: ServiceWithRelationships[]; // For hierarchical representation
}
