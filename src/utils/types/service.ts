
export type ServiceStatus = 'active' | 'inactive';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  displayOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessUnit {
  id: string;
  name: string;
  description: string;
  managerIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceBusinessUnitCriticality = 'Critical' | 'High' | 'Medium' | 'Low';

export interface ServiceBusinessUnit {
  id: string;
  serviceId: string;
  businessUnitId: string;
  criticality: ServiceBusinessUnitCriticality;
  notes?: string;
}

export interface KnowledgeArticleType {
  id: string;
  name: string;
  description: string;
}

export type ServiceKnowledgeRelationshipType = 'Documentation' | 'Known Issue' | 'FAQ';

export interface ServiceKnowledge {
  id: string;
  serviceId: string;
  knowledgeArticleId: string;
  relationshipType: ServiceKnowledgeRelationshipType;
  isPrimary: boolean;
  displayOrder: number;
}

// New service relationship types
export type ServiceRelationshipType = 
  | 'technical' 
  | 'business'
  | 'dependency'
  | 'component'
  | 'consumer'
  | 'provider';

// New interface for service relationships
export interface ServiceRelationship {
  id: string;
  sourceServiceId: string;
  targetServiceId: string;
  relationshipType: ServiceRelationshipType;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  status: ServiceStatus;
  // Owner fields
  ownerId?: string;          // Person who owns the service
  price?: string;           // Cost level of the service
  approvalRequired?: boolean; // Whether the service requires approval
  // Support fields
  supportContactId?: string;  // Person responsible for support
  supportTeamId?: string;     // Team responsible for support
  supportHours?: string;      // E.g., "Business Hours", "24/7"
  serviceOwnerId?: string;    // Person accountable for the service
  documentationUrl?: string;  // Link to detailed documentation
  // Related services
  relatedServiceIds?: string[]; // Array of related service IDs
  serviceType?: 'technical' | 'business' | 'hybrid'; // Type of service
  parentServiceId?: string;    // For hierarchical relationships
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

export interface ServiceTicketCount {
  serviceId: string;
  serviceName: string;
  incidents: number;
  requests: number;
  total: number;
}

// Support hours constants
export const SERVICE_SUPPORT_HOURS = [
  "Business Hours (9am-5pm)",
  "Extended Hours (8am-8pm)",
  "24/7 Support",
  "Limited Support",
  "On-demand Support"
] as const;

export type SupportHours = typeof SERVICE_SUPPORT_HOURS[number];

// Service business unit criticality constants
export const SERVICE_BUSINESS_UNIT_CRITICALITY = [
  "Critical",
  "High",
  "Medium", 
  "Low"
] as const;

// Service knowledge relationship type constants
export const SERVICE_KNOWLEDGE_RELATIONSHIP_TYPES = [
  "Documentation",
  "Known Issue",
  "FAQ"
] as const;

// Service relationship type constants
export const SERVICE_RELATIONSHIP_TYPES = [
  "technical",
  "business",
  "dependency",
  "component",
  "consumer",
  "provider"
] as const;

// Service types
export const SERVICE_TYPES = [
  "technical",
  "business",
  "hybrid"
] as const;
