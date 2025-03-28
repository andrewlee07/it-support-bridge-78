
import { Service, ServiceCategory, ServiceWithCategory, ServiceRelationship } from '@/utils/types/service';

// Sample services data
const services: Service[] = [
  {
    id: 'service-1',
    name: 'Email Service',
    description: 'Corporate email service for all employees',
    categoryId: 'cat-1',
    serviceType: 'technical',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-2',
    documentationUrl: 'https://docs.example.com/email-service',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'service-2',
    name: 'VPN Service',
    description: 'Secure VPN for remote access to corporate network',
    categoryId: 'cat-2',
    serviceType: 'technical',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-1',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-1',
    documentationUrl: 'https://docs.example.com/vpn-service',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'service-3',
    name: 'File Storage',
    description: 'Corporate file storage and sharing service',
    categoryId: 'cat-1',
    serviceType: 'technical',
    status: 'active',
    supportContactId: 'user-4',
    supportTeamId: 'team-1',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-2',
    documentationUrl: 'https://docs.example.com/file-storage',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'service-4',
    name: 'Helpdesk',
    description: 'IT support ticketing system',
    categoryId: 'cat-3',
    serviceType: 'business',
    status: 'active',
    supportContactId: 'user-3',
    supportTeamId: 'team-2',
    supportHours: 'Business Hours (9am-5pm)',
    serviceOwnerId: 'user-1',
    documentationUrl: 'https://docs.example.com/helpdesk',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'service-5',
    name: 'Accounting System',
    description: 'Financial management system',
    categoryId: 'cat-4',
    serviceType: 'business',
    status: 'active',
    supportContactId: 'user-5',
    supportTeamId: 'team-3',
    supportHours: 'Extended Hours (8am-8pm)',
    serviceOwnerId: 'user-6',
    documentationUrl: 'https://docs.example.com/accounting',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'service-6',
    name: 'HR Portal',
    description: 'Human resources self-service portal',
    categoryId: 'cat-4',
    serviceType: 'business',
    status: 'active',
    supportContactId: 'user-7',
    supportTeamId: 'team-4',
    supportHours: '24/7 Support',
    serviceOwnerId: 'user-8',
    documentationUrl: 'https://docs.example.com/hr-portal',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sample service categories
const serviceCategories: ServiceCategory[] = [
  {
    id: 'cat-1',
    name: 'Communication Services',
    description: 'Services for communication and collaboration',
    order: 1
  },
  {
    id: 'cat-2',
    name: 'Network Services',
    description: 'Services related to network infrastructure',
    order: 2
  },
  {
    id: 'cat-3',
    name: 'Support Services',
    description: 'Services for user and technical support',
    order: 3
  },
  {
    id: 'cat-4',
    name: 'Business Applications',
    description: 'Core business application services',
    order: 4
  }
];

// Sample service relationships
const serviceRelationships: ServiceRelationship[] = [
  {
    id: 'rel-1',
    sourceServiceId: 'service-1',
    targetServiceId: 'service-3',
    relationshipType: 'depends-on',
    importance: 'high',
    description: 'Email service requires file storage for attachments',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'rel-2',
    sourceServiceId: 'service-4',
    targetServiceId: 'service-1',
    relationshipType: 'supports',
    importance: 'medium',
    description: 'Helpdesk provides support for Email service',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'rel-3',
    sourceServiceId: 'service-2',
    targetServiceId: 'service-3',
    relationshipType: 'component-of',
    importance: 'critical',
    description: 'VPN is required for remote access to File Storage',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Helper function to convert Service to ServiceWithCategory
export const enrichServiceWithCategory = (service: Service): ServiceWithCategory => {
  const category = serviceCategories.find(cat => cat.id === service.categoryId) || {
    id: 'unknown',
    name: 'Unknown Category',
    description: 'Category not found',
    order: 999
  };
  
  return {
    ...service,
    category
  };
};

// Get services with their categories
export const getServicesWithCategories = (): ServiceWithCategory[] => {
  return services.map(service => enrichServiceWithCategory(service));
};

// Get service relationships for a service
export const getServiceRelationships = (serviceId: string): ServiceRelationship[] => {
  return serviceRelationships.filter(rel => 
    rel.sourceServiceId === serviceId || rel.targetServiceId === serviceId
  );
};

// Helper to get related services
export const getRelatedServices = (serviceId: string): ServiceWithCategory[] => {
  const relationships = getServiceRelationships(serviceId);
  const relatedServiceIds = relationships.map(rel => 
    rel.sourceServiceId === serviceId ? rel.targetServiceId : rel.sourceServiceId
  );
  
  return services
    .filter(service => relatedServiceIds.includes(service.id))
    .map(service => enrichServiceWithCategory(service));
};

// Function to get a service with its relationships
export const getServiceWithRelationships = (serviceId: string) => {
  const service = services.find(s => s.id === serviceId);
  if (!service) return null;
  
  const serviceWithCategory = enrichServiceWithCategory(service);
  const relationships = getServiceRelationships(serviceId);
  const dependsOn = relationships
    .filter(rel => rel.sourceServiceId === serviceId && rel.relationshipType === 'depends-on')
    .map(rel => {
      const targetService = services.find(s => s.id === rel.targetServiceId);
      return targetService ? enrichServiceWithCategory(targetService) : null;
    })
    .filter(Boolean);
  
  const supportedBy = relationships
    .filter(rel => rel.targetServiceId === serviceId && rel.relationshipType === 'supports')
    .map(rel => {
      const sourceService = services.find(s => s.id === rel.sourceServiceId);
      return sourceService ? enrichServiceWithCategory(sourceService) : null;
    })
    .filter(Boolean);
  
  const componentOf = relationships
    .filter(rel => rel.sourceServiceId === serviceId && rel.relationshipType === 'component-of')
    .map(rel => {
      const targetService = services.find(s => s.id === rel.targetServiceId);
      return targetService ? enrichServiceWithCategory(targetService) : null;
    })
    .filter(Boolean);
  
  return {
    ...serviceWithCategory,
    relationships: {
      dependsOn,
      supportedBy,
      componentOf
    }
  };
};

export const getAllServices = (): Service[] => {
  return services;
};

export const getAllServiceCategories = (): ServiceCategory[] => {
  return serviceCategories;
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServiceCategoryById = (id: string): ServiceCategory | undefined => {
  return serviceCategories.find(category => category.id === id);
};
