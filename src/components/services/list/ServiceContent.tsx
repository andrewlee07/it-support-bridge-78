
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import ServiceEmptyState from './ServiceEmptyState';
import ServiceLoadingState from './ServiceLoadingState';
import ServiceTable from './ServiceTable';
import ServiceTopologyView from '../ServiceTopologyView';

interface ServiceContentProps {
  isLoading: boolean;
  filteredServices: ServiceWithCategory[];
  viewMode: 'list' | 'topology';
  searchQuery: string;
  onSelect?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void;
  onEditService?: (service: ServiceWithCategory) => void;
}

const ServiceContent: React.FC<ServiceContentProps> = ({
  isLoading,
  filteredServices,
  viewMode,
  searchQuery,
  onSelect,
  onEdit,
  onEditService
}) => {
  if (isLoading) {
    return <ServiceLoadingState />;
  }

  if (filteredServices.length === 0) {
    return <ServiceEmptyState hasSearchQuery={!!searchQuery} />;
  }

  if (viewMode === 'topology') {
    return (
      <div className="h-[700px]">
        <ServiceTopologyView 
          services={filteredServices} 
          onSelectService={(service) => {
            if (onSelect) {
              onSelect(service);
            }
          }} 
        />
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <ServiceTable 
        services={filteredServices}
        onSelect={onSelect}
        onEdit={onEdit}
        onEditService={onEditService}
      />
    </div>
  );
};

export default ServiceContent;
