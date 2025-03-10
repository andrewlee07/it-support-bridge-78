
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import ServiceList from '../ServiceList';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';

interface ServiceManagementSectionProps {
  services: ServiceWithCategory[] | null;
  categories: ServiceCategory[] | null;
  onEditService: (service: ServiceWithCategory) => void;
  canConfigureCatalog: boolean;
  isLoading: boolean;
  onAddService?: () => void;
}

const ServiceManagementSection: React.FC<ServiceManagementSectionProps> = ({
  services,
  categories,
  onEditService,
  canConfigureCatalog,
  isLoading,
  onAddService
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Service Management</h2>
        {canConfigureCatalog && (
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin/service-catalogue-configuration'}
          >
            <Settings className="h-4 w-4 mr-2" />
            Advanced Configuration
          </Button>
        )}
      </div>
      <ServiceList 
        services={services || []}
        categories={categories || []}
        onEditService={onEditService}
        onAddService={canConfigureCatalog ? onAddService : undefined}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ServiceManagementSection;
