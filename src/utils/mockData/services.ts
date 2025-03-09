
import { Service, ServiceCategory, ServiceWithCategory } from '@/utils/types/service';

// Mock service categories
const serviceCategories: ServiceCategory[] = [
  { 
    id: 'cat-1', 
    name: 'Hardware', 
    description: 'Computer hardware and peripherals',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-2', 
    name: 'Software', 
    description: 'Applications and software licenses',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-3', 
    name: 'Network', 
    description: 'Network and connectivity services',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-4', 
    name: 'Security', 
    description: 'IT security services',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    id: 'cat-5', 
    name: 'Support', 
    description: 'Technical support services',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

// Mock teams
const teams = [
  { id: 'team-1', name: 'IT Support Team' },
  { id: 'team-2', name: 'Network Team' },
  { id: 'team-3', name: 'Security Team' }
];

// Mock services
const services: ServiceWithCategory[] = [
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
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

// Mock service ticket counts for analytics
const mockServiceTicketCounts = [
  { serviceId: 'srv-1', serviceName: 'Laptop Request', incidents: 12, requests: 45, total: 57 },
  { serviceId: 'srv-2', serviceName: 'Software Installation', incidents: 5, requests: 68, total: 73 },
  { serviceId: 'srv-3', serviceName: 'VPN Access', incidents: 8, requests: 32, total: 40 },
  { serviceId: 'srv-4', serviceName: 'Password Reset', incidents: 3, requests: 89, total: 92 },
  { serviceId: 'srv-5', serviceName: 'Technical Support', incidents: 21, requests: 34, total: 55 },
];

// Helper functions
export const getAllServices = (): ServiceWithCategory[] => {
  return [...services];
};

export const getServiceById = (id: string): ServiceWithCategory | undefined => {
  return services.find(service => service.id === id);
};

export const getAllServiceCategories = (): ServiceCategory[] => {
  return [...serviceCategories];
};

export const getServiceCategoryById = (id: string): ServiceCategory | undefined => {
  return serviceCategories.find(category => category.id === id);
};

export const getTeamById = (id: string) => {
  return teams.find(team => team.id === id);
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

export const addService = (service: Service): ServiceWithCategory => {
  const category = getServiceCategoryById(service.categoryId);
  
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
  
  const category = getServiceCategoryById(updatedService.categoryId);
  
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

// Export for analytics
export { mockServiceTicketCounts };

