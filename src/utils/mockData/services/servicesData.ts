
import { ServiceWithCategory, Service, ServiceType, ServiceRelationship } from '@/utils/types/service';
import { serviceCategories } from './categories';

// Mock services
export const services: ServiceWithCategory[] = [
  {
    id: 'srv-1',
    name: 'Laptop Request',
    description: 'Request a new or replacement laptop',
    categoryId: 'cat-1',
    status: 'active',
    serviceType: 'technical',
    owner: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    createdAt: new Date(),
    updatedAt: new Date(),
    businessServiceIds: ['srv-8']
  },
  {
    id: 'srv-2',
    name: 'Software Installation',
    description: 'Request installation of approved software',
    categoryId: 'cat-2',
    status: 'active',
    serviceType: 'technical',
    owner: 'user-2',
    price: 'Low',
    approvalRequired: false,
    category: serviceCategories[1],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    createdAt: new Date(),
    updatedAt: new Date(),
    businessServiceIds: ['srv-8', 'srv-9']
  },
  {
    id: 'srv-3',
    name: 'VPN Access',
    description: 'Request VPN access for remote work',
    categoryId: 'cat-3',
    status: 'active',
    serviceType: 'technical',
    owner: 'user-1',
    price: 'Low',
    approvalRequired: true,
    category: serviceCategories[2],
    supportTeamId: 'team-2',
    supportHours: '24/7 Support',
    createdAt: new Date(),
    updatedAt: new Date(),
    businessServiceIds: ['srv-8']
  },
  {
    id: 'srv-4',
    name: 'Password Reset',
    description: 'Reset password for corporate accounts',
    categoryId: 'cat-4',
    status: 'active',
    serviceType: 'technical',
    owner: 'user-3',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[3],
    supportTeamId: 'team-3',
    supportHours: '24/7 Support',
    createdAt: new Date(),
    updatedAt: new Date(),
    businessServiceIds: ['srv-8', 'srv-10']
  },
  {
    id: 'srv-5',
    name: 'Technical Support',
    description: 'Get technical assistance for IT issues',
    categoryId: 'cat-5',
    status: 'active',
    serviceType: 'technical',
    owner: 'user-2',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[4],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    createdAt: new Date(),
    updatedAt: new Date(),
    businessServiceIds: ['srv-8', 'srv-9', 'srv-10']
  },
  {
    id: 'srv-6',
    name: 'Monitor Request',
    description: 'Request an additional monitor',
    categoryId: 'cat-1',
    status: 'active',
    serviceType: 'technical',
    owner: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    createdAt: new Date(),
    updatedAt: new Date(),
    parentServiceId: 'srv-1',
    businessServiceIds: ['srv-8']
  },
  {
    id: 'srv-7',
    name: 'Software License',
    description: 'Request a license for software',
    categoryId: 'cat-2',
    status: 'inactive',
    serviceType: 'technical',
    owner: 'user-2',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[1],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    createdAt: new Date(),
    updatedAt: new Date(),
    parentServiceId: 'srv-2',
    businessServiceIds: ['srv-9']
  },
  // Business Services
  {
    id: 'srv-8',
    name: 'Contact Centre',
    description: 'End-to-end customer contact services',
    categoryId: 'cat-5',
    status: 'active',
    serviceType: 'business',
    owner: 'user-3',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[4],
    supportTeamId: 'team-3',
    supportHours: '24/7 Support',
    createdAt: new Date(),
    updatedAt: new Date(),
    technicalServiceIds: ['srv-1', 'srv-2', 'srv-3', 'srv-4', 'srv-5', 'srv-6']
  },
  {
    id: 'srv-9',
    name: 'IT Development',
    description: 'Software development and maintenance services',
    categoryId: 'cat-2',
    status: 'active',
    serviceType: 'business',
    owner: 'user-2',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[1],
    supportTeamId: 'team-1',
    supportHours: 'Business Hours (9am-5pm)',
    createdAt: new Date(),
    updatedAt: new Date(),
    technicalServiceIds: ['srv-2', 'srv-5', 'srv-7']
  },
  {
    id: 'srv-10',
    name: 'Payroll Processing',
    description: 'End-to-end payroll processing services',
    categoryId: 'cat-4',
    status: 'active',
    serviceType: 'business',
    owner: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[3],
    supportTeamId: 'team-2',
    supportHours: 'Business Hours (9am-5pm)',
    createdAt: new Date(),
    updatedAt: new Date(),
    technicalServiceIds: ['srv-4', 'srv-5']
  }
];

// Mock service relationships
export const serviceRelationships: ServiceRelationship[] = [
  // Parent-child relationships
  {
    id: 'rel-1',
    sourceServiceId: 'srv-6', // Monitor Request (Child)
    targetServiceId: 'srv-1', // Laptop Request (Parent)
    relationshipType: 'parent-child',
    strength: 'strong'
  },
  {
    id: 'rel-2',
    sourceServiceId: 'srv-7', // Software License (Child)
    targetServiceId: 'srv-2', // Software Installation (Parent)
    relationshipType: 'parent-child',
    strength: 'strong'
  },
  // Technical to business service relationships
  {
    id: 'rel-3',
    sourceServiceId: 'srv-1', // Laptop Request (Technical)
    targetServiceId: 'srv-8', // Contact Centre (Business)
    relationshipType: 'technical-business',
    strength: 'medium'
  },
  {
    id: 'rel-4',
    sourceServiceId: 'srv-2', // Software Installation (Technical)
    targetServiceId: 'srv-8', // Contact Centre (Business)
    relationshipType: 'technical-business',
    strength: 'medium'
  },
  {
    id: 'rel-5',
    sourceServiceId: 'srv-2', // Software Installation (Technical)
    targetServiceId: 'srv-9', // IT Development (Business)
    relationshipType: 'technical-business',
    strength: 'strong'
  },
  {
    id: 'rel-6',
    sourceServiceId: 'srv-3', // VPN Access (Technical)
    targetServiceId: 'srv-8', // Contact Centre (Business)
    relationshipType: 'technical-business',
    strength: 'weak'
  },
  {
    id: 'rel-7',
    sourceServiceId: 'srv-4', // Password Reset (Technical)
    targetServiceId: 'srv-8', // Contact Centre (Business)
    relationshipType: 'technical-business',
    strength: 'medium'
  },
  {
    id: 'rel-8',
    sourceServiceId: 'srv-4', // Password Reset (Technical)
    targetServiceId: 'srv-10', // Payroll Processing (Business)
    relationshipType: 'technical-business',
    strength: 'medium'
  },
  {
    id: 'rel-9',
    sourceServiceId: 'srv-5', // Technical Support (Technical)
    targetServiceId: 'srv-8', // Contact Centre (Business)
    relationshipType: 'technical-business',
    strength: 'strong'
  },
  {
    id: 'rel-10',
    sourceServiceId: 'srv-5', // Technical Support (Technical)
    targetServiceId: 'srv-9', // IT Development (Business)
    relationshipType: 'technical-business',
    strength: 'medium'
  },
  {
    id: 'rel-11',
    sourceServiceId: 'srv-5', // Technical Support (Technical)
    targetServiceId: 'srv-10', // Payroll Processing (Business)
    relationshipType: 'technical-business',
    strength: 'medium'
  },
  {
    id: 'rel-12',
    sourceServiceId: 'srv-6', // Monitor Request (Technical)
    targetServiceId: 'srv-8', // Contact Centre (Business)
    relationshipType: 'technical-business',
    strength: 'weak'
  },
  {
    id: 'rel-13',
    sourceServiceId: 'srv-7', // Software License (Technical)
    targetServiceId: 'srv-9', // IT Development (Business)
    relationshipType: 'technical-business',
    strength: 'strong'
  }
];

// Mock client contracts
export const clientContracts = [
  {
    id: 'contract-1',
    name: 'Lloyds Contact Centre Support',
    clientName: 'Lloyds Bank',
    description: 'Contact centre support for Lloyds Bank customer inquiries',
    startDate: new Date(2023, 0, 1),
    endDate: new Date(2025, 11, 31),
    status: 'active',
    businessServiceIds: ['srv-8'], // Contact Centre
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'contract-2',
    name: 'Home Office IT Support',
    clientName: 'Home Office',
    description: 'Comprehensive IT support for Home Office operations',
    startDate: new Date(2023, 3, 1),
    endDate: new Date(2026, 2, 31),
    status: 'active',
    businessServiceIds: ['srv-8', 'srv-9'], // Contact Centre and IT Development
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'contract-3',
    name: 'ABC Corp Payroll Services',
    clientName: 'ABC Corporation',
    description: 'Payroll processing services for ABC Corporation',
    startDate: new Date(2023, 6, 1),
    endDate: new Date(2025, 5, 30),
    status: 'active',
    businessServiceIds: ['srv-10'], // Payroll Processing
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Helper functions
export const getAllServices = (): ServiceWithCategory[] => {
  return [...services];
};

export const getTechnicalServices = (): ServiceWithCategory[] => {
  return services.filter(service => service.serviceType === 'technical');
};

export const getBusinessServices = (): ServiceWithCategory[] => {
  return services.filter(service => service.serviceType === 'business');
};

export const getServiceById = (id: string): ServiceWithCategory | undefined => {
  return services.find(service => service.id === id);
};

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

export const getServiceRelationships = (): ServiceRelationship[] => {
  return [...serviceRelationships];
};

export const getServiceWithRelationships = (serviceId: string) => {
  const service = getServiceById(serviceId);
  if (!service) return undefined;
  
  const relationships = serviceRelationships.filter(rel => 
    rel.sourceServiceId === serviceId || rel.targetServiceId === serviceId
  );
  
  // Get child services
  const childRelationships = serviceRelationships.filter(rel => 
    rel.targetServiceId === serviceId && rel.relationshipType === 'parent-child'
  );
  
  const children = childRelationships.map(rel => 
    getServiceById(rel.sourceServiceId)
  ).filter(Boolean) as ServiceWithCategory[];
  
  // Get parent service
  const parentRelationship = serviceRelationships.find(rel => 
    rel.sourceServiceId === serviceId && rel.relationshipType === 'parent-child'
  );
  
  const parentService = parentRelationship ? 
    getServiceById(parentRelationship.targetServiceId) : undefined;
  
  // Get technical or business services based on service type
  let technicalServices: ServiceWithCategory[] = [];
  let businessServices: ServiceWithCategory[] = [];
  
  if (service.serviceType === 'business') {
    // Get technical services that support this business service
    const techRelationships = serviceRelationships.filter(rel => 
      rel.targetServiceId === serviceId && rel.relationshipType === 'technical-business'
    );
    
    technicalServices = techRelationships.map(rel => 
      getServiceById(rel.sourceServiceId)
    ).filter(Boolean) as ServiceWithCategory[];
  } else {
    // Get business services supported by this technical service
    const busRelationships = serviceRelationships.filter(rel => 
      rel.sourceServiceId === serviceId && rel.relationshipType === 'technical-business'
    );
    
    businessServices = busRelationships.map(rel => 
      getServiceById(rel.targetServiceId)
    ).filter(Boolean) as ServiceWithCategory[];
  }
  
  return {
    ...service,
    relationships,
    children,
    parentService,
    technicalServices,
    businessServices
  };
};

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

export const createServiceRelationship = (relationship: Omit<ServiceRelationship, 'id'>): ServiceRelationship => {
  const newRelationship: ServiceRelationship = {
    ...relationship,
    id: `rel-${serviceRelationships.length + 1}`
  };
  
  serviceRelationships.push(newRelationship);
  return newRelationship;
};

export const removeServiceRelationship = (id: string): boolean => {
  const index = serviceRelationships.findIndex(rel => rel.id === id);
  if (index === -1) return false;
  
  serviceRelationships.splice(index, 1);
  return true;
};

export const getClientContracts = () => {
  return [...clientContracts];
};

export const getContractsForBusinessService = (serviceId: string) => {
  return clientContracts.filter(contract => 
    contract.businessServiceIds.includes(serviceId)
  );
};

export const getBusinessServicesForContract = (contractId: string) => {
  const contract = clientContracts.find(c => c.id === contractId);
  if (!contract) return [];
  
  return contract.businessServiceIds.map(id => 
    getServiceById(id)
  ).filter(Boolean) as ServiceWithCategory[];
};
