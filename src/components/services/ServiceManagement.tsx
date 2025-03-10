
import React, { useState } from 'react';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceWithCategory } from '@/utils/types/service';
import ServiceManagementDialog from './management/ServiceManagementDialog';
import ServiceManagementSection from './management/ServiceManagementSection';
import ServiceDetailDialog from './management/ServiceDetailDialog';

interface ServiceManagementProps {
  inServiceCatalog?: boolean;
}

const ServiceManagement: React.FC<ServiceManagementProps> = ({ 
  inServiceCatalog = true 
}) => {
  const { services, categories, isLoading } = useServices();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  const { userHasPermission } = useAuth();

  const canConfigureCatalog = userHasPermission('Manage Service Catalog Config');
  const canManageContent = userHasPermission('Manage Service Catalog Content') || canConfigureCatalog;

  if (!canManageContent) {
    return null;
  }

  const handleSelectService = (service: ServiceWithCategory) => {
    setSelectedService(service);
    // In a real app, this would open a modal or navigate to edit page
    console.log(`Selected service: ${service.name}`);
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      {!inServiceCatalog && (
        <ServiceManagementSection
          services={services}
          categories={categories}
          onEditService={handleSelectService}
          canConfigureCatalog={canConfigureCatalog}
          isLoading={isLoading}
        />
      )}

      <ServiceDetailDialog 
        service={selectedService}
        categories={categories}
        onClose={() => setSelectedService(null)}
        canConfigureCatalog={canConfigureCatalog}
      />
    </>
  );
};

export default ServiceManagement;
