
import { useQuery } from '@tanstack/react-query';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import { getAllServices, getAllServiceCategories } from '@/utils/mockData/services';

interface UseServicesResult {
  services: ServiceWithCategory[] | null;
  categories: ServiceCategory[] | null;
  isLoading: boolean;
  error: Error | null;
}

// Create a function to combine services with their categories
const fetchServicesWithCategories = async (): Promise<ServiceWithCategory[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const services = getAllServices();
  const categories = getAllServiceCategories();
  
  // Map services to include their category information
  return services.map(service => {
    const category = categories.find(c => c.id === service.categoryId);
    if (!category) {
      throw new Error(`Category not found for service: ${service.id}`);
    }
    return {
      ...service,
      category
    };
  });
};

const fetchCategories = async (): Promise<ServiceCategory[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getAllServiceCategories();
};

export const useServices = (): UseServicesResult => {
  const { 
    data: services, 
    error: servicesError,
    isLoading: isServicesLoading
  } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServicesWithCategories
  });

  const { 
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading
  } = useQuery({
    queryKey: ['serviceCategories'],
    queryFn: fetchCategories
  });

  // Combine the errors if any
  const error = servicesError || categoriesError ? 
    new Error((servicesError || categoriesError)?.message) : 
    null;

  return {
    services: services || null,
    categories: categories || null,
    isLoading: isServicesLoading || isCategoriesLoading,
    error
  };
};
