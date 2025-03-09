
import { useState, useEffect } from 'react';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import { getAllServices, getAllServiceCategories } from '@/utils/mockData/services';

interface UseServicesResult {
  services: ServiceWithCategory[] | null;
  categories: ServiceCategory[] | null;
  isLoading: boolean;
  error: Error | null;
}

export const useServices = (): UseServicesResult => {
  const [services, setServices] = useState<ServiceWithCategory[] | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real application, these would be API calls
        const servicesData = getAllServices();
        const categoriesData = getAllServiceCategories();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setServices(servicesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, categories, isLoading, error };
};
