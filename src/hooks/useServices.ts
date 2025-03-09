
import { useState, useCallback, useEffect } from 'react';
import { Service, ServiceCategory, ServiceWithCategory } from '@/utils/types/service';
import { ServiceFormValues } from '@/components/services/ServiceForm';
import { toast } from 'sonner';
import { 
  mockServices, 
  mockServiceCategories,
  getServicesWithCategories,
  generateServiceId
} from '@/utils/mockData/services';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [servicesWithCategories, setServicesWithCategories] = useState<ServiceWithCategory[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  // Load data
  const loadData = useCallback(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setServices([...mockServices]);
      setCategories([...mockServiceCategories]);
      setServicesWithCategories(getServicesWithCategories());
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Create or update service
  const handleSubmitService = useCallback(async (values: ServiceFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (values.id) {
        // Update existing service
        const updatedServices = services.map(service => 
          service.id === values.id 
            ? { 
                ...service, 
                ...values, 
                updatedAt: new Date() 
              }
            : service
        );
        
        setServices(updatedServices);
        setServicesWithCategories(
          updatedServices.map(service => {
            const category = categories.find(cat => cat.id === service.categoryId);
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
          })
        );
        
        toast.success("Service updated successfully");
        
        // If we're viewing the service that was just updated, update the selected service
        if (selectedService && selectedService.id === values.id) {
          const category = categories.find(cat => cat.id === values.categoryId);
          setSelectedService({
            ...values,
            createdAt: selectedService.createdAt,
            updatedAt: new Date(),
            category: category || selectedService.category
          } as ServiceWithCategory);
        }
      } else {
        // Create new service
        const newService: Service = {
          ...values,
          id: generateServiceId(),
          createdAt: new Date(),
          updatedAt: new Date()
        } as Service;
        
        const updatedServices = [...services, newService];
        setServices(updatedServices);
        
        // Update services with categories
        const category = categories.find(cat => cat.id === newService.categoryId);
        const newServiceWithCategory: ServiceWithCategory = {
          ...newService,
          category: category || { 
            id: 'unknown', 
            name: 'Unknown',
            description: 'Unknown category',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        };
        
        setServicesWithCategories([...servicesWithCategories, newServiceWithCategory]);
        toast.success("Service created successfully");
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error submitting service:', error);
      toast.error("Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  }, [services, categories, servicesWithCategories, selectedService]);

  // Select service for editing
  const handleEditService = useCallback((service: ServiceWithCategory) => {
    setSelectedService(service);
    
    if (viewMode === 'list') {
      setIsDialogOpen(true);
    }
  }, [viewMode]);

  // Create new service
  const handleAddService = useCallback(() => {
    setSelectedService(null);
    setIsDialogOpen(true);
  }, []);

  // View service details
  const handleViewService = useCallback((service: ServiceWithCategory) => {
    setSelectedService(service);
    setViewMode('detail');
  }, []);

  // Go back to list view
  const handleBackToList = useCallback(() => {
    setViewMode('list');
    setSelectedService(null);
  }, []);

  return {
    services,
    categories,
    servicesWithCategories,
    selectedService,
    isDialogOpen,
    isSubmitting,
    isLoading,
    viewMode,
    setIsDialogOpen,
    handleSubmitService,
    handleEditService,
    handleAddService,
    handleViewService,
    handleBackToList,
  };
};
