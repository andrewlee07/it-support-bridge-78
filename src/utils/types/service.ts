
// Core Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  serviceType: 'technical' | 'business';
  status: ServiceStatus;
  supportContactId: string;
  supportTeamId: string;
  supportHours: SupportHours;
  serviceOwnerId: string;
  documentationUrl: string;
  createdAt: Date;
  updatedAt: Date;
  parentServiceId?: string;
  technicalServiceIds?: string[];
  businessServiceIds?: string[];
  category?: ServiceCategory; // For compatibility
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  displayOrder?: number;
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

export interface ServiceRelationship {
  id: string;
  sourceServiceId: string;
  targetServiceId: string;
  relationshipType: 'depends-on' | 'supports' | 'alternative-to' | 'component-of' | 'parent-child' | 'technical-business' | 'related-to';
  description?: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  createdAt: Date;
  updatedAt: Date;
  strength?: number;
}

export interface ServiceWithRelationships extends ServiceWithCategory {
  relationships: {
    dependsOn: ServiceWithCategory[];
    supportedBy: ServiceWithCategory[];
    componentOf: ServiceWithCategory[];
    children?: ServiceWithCategory[];
    technical?: ServiceWithCategory[];
    business?: ServiceWithCategory[];
    related?: ServiceWithCategory[];
    filter?: (predicate: (value: ServiceWithCategory, index: number, array: ServiceWithCategory[]) => boolean) => ServiceWithCategory[];
    map?: <U>(callback: (value: ServiceWithCategory, index: number, array: ServiceWithCategory[]) => U) => U[];
    length?: number;
  };
}

// Service Status Types
export type ServiceStatus = 'active' | 'maintenance' | 'inactive' | 'deprecated' | 'planned';

// Support Hours Types
export type SupportHours = 'Business Hours (9am-5pm)' | '24/7 Support' | 'Extended Hours (8am-8pm)' | 'Custom';

// Service Type
export type ServiceType = 'technical' | 'business';

// Support Hours Constants
export const SERVICE_SUPPORT_HOURS: SupportHours[] = [
  'Business Hours (9am-5pm)',
  '24/7 Support',
  'Extended Hours (8am-8pm)',
  'Custom'
];

// Business Unit Types
export interface BusinessUnit {
  id: string;
  name: string;
  description: string;
  managerIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServiceBusinessUnit {
  id: string;
  serviceId: string;
  businessUnitId: string;
  criticality: ServiceBusinessUnitCriticality;
  notes?: string;
}

export type ServiceBusinessUnitCriticality = 'critical' | 'high' | 'medium' | 'low';

export const SERVICE_BUSINESS_UNIT_CRITICALITY: ServiceBusinessUnitCriticality[] = [
  'critical',
  'high',
  'medium',
  'low'
];

// Knowledge Types
export interface ServiceKnowledge {
  id: string;
  serviceId: string;
  title: string;
  content: string;
  type: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  knowledgeArticleId?: string;
  relationshipType?: string;
  isPrimary?: boolean;
  displayOrder?: number;
}

export type ServiceKnowledgeRelationshipType = 'faqs' | 'troubleshooting' | 'howto' | 'documentation';

// Client Contract Types
export interface ClientContract {
  id: string;
  serviceId: string;
  clientName: string;
  contractNumber: string;
  startDate: Date;
  endDate: Date;
  renewalDate?: Date;
  contactPerson: string;
  contactEmail: string;
  status: 'active' | 'expired' | 'pending' | 'terminated' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  description?: string;
  businessServiceIds?: string[];
}
