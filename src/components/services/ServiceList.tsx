
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

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  categories,
  onSelect,
  onEditService,
  onAddService,
  isLoading = false
}) => {
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
        <ServiceEmptyState onAddService={onAddService} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {onAddService && (
        <div className="flex justify-end">
          <ServiceAddButton onClick={onAddService} />
        </div>
      )}
      
      <ServiceTable 
        services={services} 
        onSelect={onSelect} 
        onEditService={onEditService} 
      />
    </div>
  );
};

export default ServiceList;
