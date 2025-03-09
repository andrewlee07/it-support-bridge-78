
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  mockServices, 
  getServicesWithCategories, 
  generateServiceId,
  getServiceById
} from '@/utils/mockData/services';
import { mockServiceCategories } from '@/utils/mockData/serviceCategories';
import { Service, ServiceWithCategory } from '@/utils/types/service';

export const useServices = () => {
  const [services, setServices] = useState<ServiceWithCategory[]>([]);
  const [categories, setCategories] = useState(mockServiceCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    setIsLoading(true);
    try {
      const result = getServicesWithCategories();
      setServices(result);
    } catch (error) {
      console.error('Error loading services:', error);
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = () => {
    setSelectedServiceId(null);
    setIsDialogOpen(true);
  };

  const handleEditService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedServiceId(null);
  };

  const handleSubmitService = async (values: any) => {
    setIsSubmitting(true);
    try {
      // Simulate a delay for API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedServiceId) {
        // Update existing service
        const updatedServiceIndex = mockServices.findIndex(s => s.id === selectedServiceId);
        if (updatedServiceIndex !== -1) {
          mockServices[updatedServiceIndex] = {
            ...mockServices[updatedServiceIndex],
            ...values,
            updatedAt: new Date()
          };
        }
        toast.success('Service updated successfully');
      } else {
        // Create new service
        const newService: Service = {
          id: generateServiceId(),
          ...values,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        mockServices.push(newService);
        toast.success('Service created successfully');
      }

      loadServices();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = selectedServiceId 
    ? mockServices.find(s => s.id === selectedServiceId) 
    : undefined;

  return {
    services,
    categories,
    isLoading,
    selectedServiceId,
    selectedService,
    isDialogOpen,
    isSubmitting,
    handleAddService,
    handleEditService,
    handleCloseDialog,
    handleSubmitService
  };
};
