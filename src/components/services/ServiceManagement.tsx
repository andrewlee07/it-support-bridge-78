
import React, { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceWithCategory, Service } from '@/utils/types/service';
import ServiceManagementDialog from './management/ServiceManagementDialog';
import ServiceManagementSection from './management/ServiceManagementSection';
import ServiceDetailDialog from './management/ServiceDetailDialog';
import ServiceDialog from './ServiceDialog';
import { toast } from 'sonner';
import { useDisclosure } from '@/hooks/useDisclosure';

interface ServiceManagementProps {
  inServiceCatalog?: boolean;
}

const ServiceManagement: React.FC<ServiceManagementProps> = ({ 
  inServiceCatalog = true 
}) => {
  const { services, categories, isLoading } = useServices();
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  const { userHasPermission } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const canConfigureCatalog = userHasPermission('Manage Service Catalog Config');
  const canManageContent = userHasPermission('Manage Service Catalog Content') || canConfigureCatalog;

  if (!canManageContent) {
    return null;
  }

  const handleSelectService = (service: ServiceWithCategory) => {
    setSelectedService(service);
    console.log(`Selected service: ${service.name}`);
  };

  const handleCloseServiceDetail = () => {
    setSelectedService(null);
  };

  const handleAddService = () => {
    setServiceToEdit(null);
    onOpen();
  };

  const handleSubmitService = (values: any) => {
    setIsSubmitting(true);
    // In a real application, this would call an API to create/update the service
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success(serviceToEdit ? "Service updated successfully" : "Service created successfully");
    }, 500);
  };

  return (
    <>
      {inServiceCatalog && (
        <ServiceManagementDialog
          services={services}
          categories={categories}
          onEditService={handleSelectService}
          canConfigureCatalog={canConfigureCatalog}
          isLoading={isLoading}
          isOpen={isManagementOpen}
          setIsOpen={setIsManagementOpen}
          onAddService={handleAddService}
        />
      )}

      {!inServiceCatalog && (
        <ServiceManagementSection
          services={services}
          categories={categories}
          onEditService={handleSelectService}
          canConfigureCatalog={canConfigureCatalog}
          isLoading={isLoading}
          onAddService={handleAddService}
        />
      )}

      <ServiceDetailDialog 
        service={selectedService}
        categories={categories}
        onClose={handleCloseServiceDetail}
        canConfigureCatalog={canConfigureCatalog}
      />

      <ServiceDialog
        isOpen={isOpen}
        onClose={onClose}
        service={serviceToEdit || undefined}
        categories={categories || []}
        onSubmit={handleSubmitService}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default ServiceManagement;
