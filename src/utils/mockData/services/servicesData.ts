
import { ServiceWithCategory, Service } from '@/utils/types/service';
import { serviceCategories } from './categories';

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

export const getAllServices = (): ServiceWithCategory[] => {
  return [...services];
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
