
import { useQuery } from '@tanstack/react-query';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import { getServicesWithCategories, getAllServiceCategories } from '@/utils/mockData/services';

interface UseServicesResult {
  services: ServiceWithCategory[] | null;
  categories: ServiceCategory[] | null;
  isLoading: boolean;
  error: Error | null;
}

const fetchServices = async (): Promise<ServiceWithCategory[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getServicesWithCategories();
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
    queryFn: fetchServices
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
