
export interface Service {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  serviceType: 'technical' | 'business';
  status: 'active' | 'maintenance' | 'inactive' | 'deprecated';
  supportContactId: string;
  supportTeamId: string;
  supportHours: string;
  serviceOwnerId: string;
  documentationUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  order: number;
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

export interface ServiceRelationship {
  id: string;
  sourceServiceId: string;
  targetServiceId: string;
  relationshipType: 'depends-on' | 'supports' | 'alternative-to' | 'component-of';
  description?: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  createdAt: Date;
  updatedAt: Date;
}
