
import React from 'react';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceTable from './list/ServiceTable';
import ServiceEmptyState from './list/ServiceEmptyState';
import ServiceAddButton from './list/ServiceAddButton';

interface ServiceListProps {
  services: ServiceWithCategory[];
  categories: ServiceCategory[];
  onSelect?: (service: ServiceWithCategory) => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onAddService?: () => void;
  isLoading?: boolean;
}

// Helper function to format service IDs to SRV00001 format
const formatServiceId = (id: string): string => {
  // Extract numeric part if it exists (e.g., "srv-1" -> "1")
  const numericPart = id.split('-')[1];
  
  if (numericPart && !isNaN(parseInt(numericPart))) {
    // Format as SRV00001, SRV00002, etc.
    return `SRV${numericPart.padStart(5, '0')}`;
  }
  
  // If for some reason we can't extract a numeric part, return original
  return id;
};

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  categories,
  onSelect,
  onEditService,
  onAddService,
  isLoading = false
}) => {
  // Format the service IDs in the services list
  const formattedServices = services.map(service => ({
    ...service,
    formattedId: formatServiceId(service.id)
  }));

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="mt-4">
        <ServiceEmptyState hasSearchQuery={false} onAddService={onAddService} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {onAddService && (
        <div className="flex justify-end mb-4">
          <ServiceAddButton onAddService={onAddService} />
        </div>
      )}
      
      <ServiceTable 
        services={formattedServices} 
        onSelect={onSelect} 
        onEditService={onEditService} 
      />
    </div>
  );
};

export default ServiceList;
