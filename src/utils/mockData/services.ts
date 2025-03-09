
import { ServiceWithCategory } from '../types/service';
import { mockServices, generateServiceId } from './servicesData';
import { mockServiceCategories, getCategoryById, generateCategoryId } from './serviceCategories';
import { mockTeams, getTeamById } from './teams';
import { mockServiceTicketCounts } from './serviceTickets';

// Helper function to get services with their category information
export const getServicesWithCategories = (): ServiceWithCategory[] => {
  return mockServices.map(service => {
    const category = getCategoryById(service.categoryId);
    return {
      ...service,
      category: category || { 
        id: 'unknown', 
        name: 'Unknown',
        description: 'Unknown category',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
  });
};

// Helper function to get services by category
export const getServicesByCategory = (): Record<string, ServiceWithCategory[]> => {
  const servicesWithCategories = getServicesWithCategories();
  return servicesWithCategories.reduce((acc, service) => {
    const categoryName = service.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(service);
    return acc;
  }, {} as Record<string, ServiceWithCategory[]>);
};

// Get service by ID
export const getServiceById = (id: string): ServiceWithCategory | undefined => {
  const service = mockServices.find(s => s.id === id);
  if (!service) return undefined;
  
  const category = getCategoryById(service.categoryId);
  return {
    ...service,
    category: category || { 
      id: 'unknown', 
      name: 'Unknown',
      description: 'Unknown category',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };
};

// Export everything from the new files for backward compatibility
export {
  mockServices,
  mockServiceCategories,
  mockTeams,
  mockServiceTicketCounts,
  generateServiceId,
  generateCategoryId,
  getTeamById,
  getCategoryById
};
