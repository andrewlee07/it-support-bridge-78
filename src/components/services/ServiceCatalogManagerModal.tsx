
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import ServiceList from '@/components/services/ServiceList';
import { useAuth } from '@/contexts/AuthContext';

interface ServiceCatalogManagerModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  services: ServiceWithCategory[];
  categories: ServiceCategory[];
}

const ServiceCatalogManagerModal: React.FC<ServiceCatalogManagerModalProps> = ({
  isOpen,
  setIsOpen,
  services,
  categories,
}) => {
  const { userHasPermission } = useAuth();
  
  const handleEditService = (service: ServiceWithCategory) => {
    console.log('Edit service clicked', service);
    // Implementation for editing a service will be added in future
  };

  const hasConfigPermission = userHasPermission('manage_service_catalog_config');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Service Catalog Management</DialogTitle>
          <DialogDescription>
            {hasConfigPermission 
              ? "Edit service details or mark services as active/inactive" 
              : "As a Service Catalog Manager, you can edit service details and mark services as active/inactive"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ServiceList 
            services={services} 
            categories={categories}
            onEditService={handleEditService}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceCatalogManagerModal;
