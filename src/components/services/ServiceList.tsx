
import React, { useState } from 'react';
import { Service, ServiceCategory, ServiceWithCategory } from '@/utils/types/service';
import ServiceListHeader from './list/ServiceListHeader';
import ServiceTable from './list/ServiceTable';
import ServiceEmptyState from './list/ServiceEmptyState';
import ServiceLoadingState from './list/ServiceLoadingState';

interface ServiceListProps {
  services: ServiceWithCategory[];
  categories?: ServiceCategory[];
  onAddService?: () => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onToggleStatus?: (service: ServiceWithCategory) => void;
  onSelect?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void;
  isLoading?: boolean;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  categories = [],
  onAddService,
  onEditService,
  onToggleStatus,
  onSelect,
  onEdit,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter services based on search query and category filter
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      categoryFilter === 'all' || service.categoryId === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <ServiceListHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        onAddService={onAddService}
      />

      {isLoading ? (
        <ServiceLoadingState />
      ) : filteredServices.length === 0 ? (
        <ServiceEmptyState searchQuery={searchQuery} />
      ) : (
        <div className="border rounded-md">
          <ServiceTable
            services={filteredServices}
            onSelect={onSelect}
            onEditService={onEditService}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceList;
