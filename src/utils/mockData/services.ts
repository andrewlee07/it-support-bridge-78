
import { Service, ServiceCategory, ServiceWithCategory } from '@/utils/types/service';

// Mock service categories
const serviceCategories: ServiceCategory[] = [
  { id: 'cat-1', name: 'Hardware', description: 'Computer hardware and peripherals' },
  { id: 'cat-2', name: 'Software', description: 'Applications and software licenses' },
  { id: 'cat-3', name: 'Network', description: 'Network and connectivity services' },
  { id: 'cat-4', name: 'Security', description: 'IT security services' },
  { id: 'cat-5', name: 'Support', description: 'Technical support services' },
];

// Mock services
const services: ServiceWithCategory[] = [
  {
    id: 'srv-1',
    name: 'Laptop Request',
    description: 'Request a new or replacement laptop',
    categoryId: 'cat-1',
    status: 'active',
    slaId: 'sla-1',
    ownerId: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0]
  },
  {
    id: 'srv-2',
    name: 'Software Installation',
    description: 'Request installation of approved software',
    categoryId: 'cat-2',
    status: 'active',
    slaId: 'sla-2',
    ownerId: 'user-2',
    price: 'Low',
    approvalRequired: false,
    category: serviceCategories[1]
  },
  {
    id: 'srv-3',
    name: 'VPN Access',
    description: 'Request VPN access for remote work',
    categoryId: 'cat-3',
    status: 'active',
    slaId: 'sla-1',
    ownerId: 'user-1',
    price: 'Low',
    approvalRequired: true,
    category: serviceCategories[2]
  },
  {
    id: 'srv-4',
    name: 'Password Reset',
    description: 'Reset password for corporate accounts',
    categoryId: 'cat-4',
    status: 'active',
    slaId: 'sla-3',
    ownerId: 'user-3',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[3]
  },
  {
    id: 'srv-5',
    name: 'Technical Support',
    description: 'Get technical assistance for IT issues',
    categoryId: 'cat-5',
    status: 'active',
    slaId: 'sla-2',
    ownerId: 'user-2',
    price: 'Free',
    approvalRequired: false,
    category: serviceCategories[4]
  },
  {
    id: 'srv-6',
    name: 'Monitor Request',
    description: 'Request an additional monitor',
    categoryId: 'cat-1',
    status: 'active',
    slaId: 'sla-1',
    ownerId: 'user-1',
    price: 'Medium',
    approvalRequired: true,
    category: serviceCategories[0]
  },
  {
    id: 'srv-7',
    name: 'Software License',
    description: 'Request a license for software',
    categoryId: 'cat-2',
    status: 'inactive',
    slaId: 'sla-2',
    ownerId: 'user-2',
    price: 'High',
    approvalRequired: true,
    category: serviceCategories[1]
  },
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

export const addService = (service: Service): ServiceWithCategory => {
  const category = getServiceCategoryById(service.categoryId);
  
  if (!category) {
    throw new Error(`Category with ID ${service.categoryId} not found`);
  }
  
  const newService: ServiceWithCategory = {
    ...service,
    id: `srv-${services.length + 1}`,
    category
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
    category
  };
  
  services[index] = updatedServiceWithCategory;
  return updatedServiceWithCategory;
};
