
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
export type ServiceType = 'technical' | 'business';

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
  serviceType: ServiceType;
  owner?: string;
  supportContact?: string;
  supportContactId?: string;
  supportTeamId?: string;
  serviceOwnerId?: string;
  documentationUrl?: string;
  supportHours?: SupportHours;
  slaId?: string;
  price?: string;
  approvalRequired?: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Relationship fields
  parentServiceId?: string; // If this is a child service
  relatedServiceIds?: string[]; // IDs of related services
  technicalServiceIds?: string[]; // For business services, the technical services they depend on
  businessServiceIds?: string[]; // For technical services, the business services they support
}

export interface ServiceRelationship {
  id: string;
  sourceServiceId: string;
  targetServiceId: string;
  relationshipType: 'depends-on' | 'parent-child' | 'technical-business' | 'related-to';
  description?: string;
  strength?: 'weak' | 'medium' | 'strong';
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

export interface ServiceWithRelationships extends ServiceWithCategory {
  relationships: ServiceRelationship[];
  children?: ServiceWithRelationships[]; // For hierarchical representation
  parentService?: ServiceWithCategory; // Parent service if this is a child
  technicalServices?: ServiceWithCategory[]; // For business services
  businessServices?: ServiceWithCategory[]; // For technical services
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

// Client contract types
export interface ClientContract {
  id: string;
  name: string;
  clientName: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'pending' | 'completed' | 'terminated';
  businessServiceIds: string[]; // Business services linked to this contract
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractServiceAssociation {
  id: string;
  contractId: string;
  serviceId: string; // Business service ID
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
