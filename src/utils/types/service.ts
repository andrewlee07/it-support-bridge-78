
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
  createdAt?: Date;
  updatedAt?: Date;
  displayOrder?: number;
}

export type ServiceStatus = 'active' | 'inactive' | 'maintenance' | 'deprecated';
export type SupportHours = 'Business Hours (9am-5pm)' | 'Extended Hours (8am-8pm)' | '24/7 Support' | 'Limited Support' | 'not-specified';

export const SERVICE_SUPPORT_HOURS: SupportHours[] = [
  'Business Hours (9am-5pm)',
  'Extended Hours (8am-8pm)',
  '24/7 Support',
  'Limited Support',
  'not-specified'
];

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  status: ServiceStatus;
  owner?: string;
  supportContact?: string;
  supportContactId?: string;
  supportTeamId?: string;
  serviceOwnerId?: string;
  documentationUrl?: string;
  supportHours?: SupportHours;
  slaId?: string;
  price?: string; // Adding this to match the mock data
  approvalRequired?: boolean; // Adding this to match the mock data
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

// Business unit related types
export interface BusinessUnit {
  id: string;
  name: string;
  description: string;
  managerIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceBusinessUnitCriticality = 'Critical' | 'High' | 'Medium' | 'Low';

export const SERVICE_BUSINESS_UNIT_CRITICALITY: ServiceBusinessUnitCriticality[] = [
  'Critical', 'High', 'Medium', 'Low'
];

export interface ServiceBusinessUnit {
  id: string;
  serviceId: string;
  businessUnitId: string;
  criticality: ServiceBusinessUnitCriticality;
  notes?: string;
}

// Knowledge base integration types
export type ServiceKnowledgeRelationshipType = 'documentation' | 'user-guide' | 'faq' | 'training' | 'known-issue';

export interface ServiceKnowledge {
  id: string;
  serviceId: string;
  knowledgeArticleId: string;
  relationshipType: ServiceKnowledgeRelationshipType;
  isPrimary?: boolean;
  displayOrder?: number;
}
