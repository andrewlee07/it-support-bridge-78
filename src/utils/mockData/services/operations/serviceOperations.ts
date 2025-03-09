
import { ServiceWithCategory, Service } from '@/utils/types/service';
import { services } from '../data/servicesList';
import { serviceCategories } from '../categories';

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
