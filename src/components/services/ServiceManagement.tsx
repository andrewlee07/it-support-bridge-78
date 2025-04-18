
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
import { Server, Cog, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const openManagement = () => {
    setIsManagementOpen(true);
  };
  
  const navigateToServiceManagement = () => {
    navigate('/service-catalog-management');
  };

  return (
    <>
      {inServiceCatalog && (
        <>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={openManagement}
              className="bg-secondary/50 border border-border/20 hover:bg-muted"
              title="Manage services and their details"
            >
              <Server className="mr-2 h-4 w-4" />
              Manage Services
            </Button>
            
            {canConfigureCatalog && (
              <Button 
                variant="outline" 
                onClick={navigateToServiceManagement}
                className="bg-secondary/50 border border-border/20 hover:bg-muted"
                title="Advanced service catalog management including relationships and client contracts"
              >
                <Cog className="mr-2 h-4 w-4" />
                Advanced Management
              </Button>
            )}
          </div>
          
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
        </>
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
        availableServices={services || []}
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
