
import { ServiceWithCategory, Service, ServiceRelationship } from '@/utils/types/service';
import { serviceCategories } from './categories';

// Mock service relationships
export const serviceRelationships: ServiceRelationship[] = [
  {
    id: 'rel-1',
    sourceServiceId: 'srv-8', // Workstation Equipment
    targetServiceId: 'srv-1', // Laptop Request
    relationshipType: 'component',
    description: 'Laptop Request is a component of Workstation Equipment service',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 'rel-2',
    sourceServiceId: 'srv-8', // Workstation Equipment
    targetServiceId: 'srv-6', // Monitor Request
    relationshipType: 'component',
    description: 'Monitor Request is a component of Workstation Equipment service',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 'rel-3',
    sourceServiceId: 'srv-1', // Laptop Request
    targetServiceId: 'srv-2', // Software Installation
    relationshipType: 'dependency',
    description: 'Laptop Request depends on Software Installation',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: 'rel-4',
    sourceServiceId: 'srv-2', // Software Installation
    targetServiceId: 'srv-7', // Software License
    relationshipType: 'dependency',
    description: 'Software Installation depends on Software License',
    isActive: true,
    createdAt: new Date()
  }
];

// Mock services
export const services: ServiceWithCategory[] = [
  {
    id: 'srv-1',
    name: 'Laptop Request',
    description: 'Request a new or replacement laptop',
    categoryId: 'cat-1',
    status: 'active',
    ownerId: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    relatedServiceIds: ['srv-6', 'srv-2'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-2',
    name: 'Software Installation',
    description: 'Request installation of approved software',
    categoryId: 'cat-2',
    status: 'active',
    ownerId: 'user-2',
    price: 'Low',
    approvalRequired: false,
    category: serviceCategories[1],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'technical',
    relatedServiceIds: ['srv-7'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-3',
    name: 'VPN Access',
    description: 'Request VPN access for remote work',
    categoryId: 'cat-3',
    status: 'active',
    ownerId: 'user-1',
    price: 'Low',
    approvalRequired: true,
    category: serviceCategories[2],
    supportTeamId: 'team-2',
    supportHours: '24/7 Support',
    serviceType: 'technical',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-4',
    name: 'Password Reset',
    description: 'Reset password for corporate accounts',
    categoryId: 'cat-4',
    status: 'active',
    ownerId: 'user-3',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[3],
    supportTeamId: 'team-3',
    supportHours: '24/7 Support',
    serviceType: 'technical',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-5',
    name: 'Technical Support',
    description: 'Get technical assistance for IT issues',
    categoryId: 'cat-5',
    status: 'active',
    ownerId: 'user-2',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[4],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'technical',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-6',
    name: 'Monitor Request',
    description: 'Request an additional monitor',
    categoryId: 'cat-1',
    status: 'active',
    ownerId: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    parentServiceId: 'srv-8',  // Child of Workstation Equipment
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'srv-7',
    name: 'Software License',
    description: 'Request a license for software',
    categoryId: 'cat-2',
    status: 'inactive',
    ownerId: 'user-2',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[1],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Let's add a new business service that has technical services as components
  {
    id: 'srv-8',
    name: 'Workstation Equipment',
    description: 'Comprehensive workstation equipment services including laptops, monitors, and peripherals',
    categoryId: 'cat-1',
    status: 'active',
    ownerId: 'user-1',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    serviceType: 'business',
    relatedServiceIds: ['srv-1', 'srv-6'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

// Get all services
export const getAllServices = (): ServiceWithCategory[] => {
  return [...services];
};

// Get a service by ID
export const getServiceById = (id: string): ServiceWithCategory | undefined => {
  return services.find(service => service.id === id);
};

// Get services grouped by category
export const getServicesByCategory = (): Record<string, ServiceWithCategory[]> => {
  const result: Record<string, ServiceWithCategory[]> = {};
  
  serviceCategories.forEach(category => {
    const categoryServices = services.filter(service => service.categoryId === category.id);
    if (categoryServices.length > 0) {
      result[category.name] = categoryServices;
    }
  });
  
  return result;
};

// Get related services for a specific service
export const getRelatedServices = (serviceId: string): ServiceWithCategory[] => {
  const service = getServiceById(serviceId);
  
  if (!service || !service.relatedServiceIds || service.relatedServiceIds.length === 0) {
    return [];
  }
  
  return services.filter(s => service.relatedServiceIds?.includes(s.id));
};

// Get service relationships
export const getServiceRelationships = (serviceId: string): ServiceRelationship[] => {
  return serviceRelationships.filter(
    rel => rel.sourceServiceId === serviceId || rel.targetServiceId === serviceId
  );
};

// Get child services
export const getChildServices = (parentServiceId: string): ServiceWithCategory[] => {
  return services.filter(service => service.parentServiceId === parentServiceId);
};

// Add a service
export const addService = (service: Service): ServiceWithCategory => {
  const category = serviceCategories.find(cat => cat.id === service.categoryId);
  
  if (!category) {
    throw new Error(`Category with ID ${service.categoryId} not found`);
  }
  
  const newService: ServiceWithCategory = {
    ...service,
    id: `srv-${services.length + 1}`,
    category,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  services.push(newService);
  return newService;
};

// Update a service
export const updateService = (updatedService: Service): ServiceWithCategory => {
  const index = services.findIndex(service => service.id === updatedService.id);
  
  if (index === -1) {
    throw new Error(`Service with ID ${updatedService.id} not found`);
  }
  
  const category = serviceCategories.find(cat => cat.id === updatedService.categoryId);
  
  if (!category) {
    throw new Error(`Category with ID ${updatedService.categoryId} not found`);
  }
  
  const updatedServiceWithCategory: ServiceWithCategory = {
    ...updatedService,
    category,
    updatedAt: new Date()
  };
  
  services[index] = updatedServiceWithCategory;
  return updatedServiceWithCategory;
};

// Create a service relationship
export const createServiceRelationship = (
  sourceServiceId: string,
  targetServiceId: string,
  relationshipType: string,
  description?: string
): ServiceRelationship => {
  const newRelationship: ServiceRelationship = {
    id: `rel-${serviceRelationships.length + 1}`,
    sourceServiceId,
    targetServiceId,
    relationshipType: relationshipType as any,
    description,
    isActive: true,
    createdAt: new Date()
  };
  
  serviceRelationships.push(newRelationship);
  return newRelationship;
};
