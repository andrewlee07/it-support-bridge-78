
import React, { useState } from 'react';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import ServiceListHeader from './list/ServiceListHeader';
import ServiceContent from './list/ServiceContent';

interface ServiceListProps {
  services: ServiceWithCategory[];
  categories?: ServiceCategory[];
  onAddService?: () => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onSelect?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void;
  isLoading?: boolean;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  categories = [],
  onAddService,
  onEditService,
  onSelect,
  onEdit,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'topology'>('list');

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
        viewMode={viewMode}
        setViewMode={setViewMode}
        onAddService={onAddService}
      />

      <ServiceContent
        isLoading={isLoading}
        filteredServices={filteredServices}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onSelect={onSelect}
        onEdit={onEdit}
        onEditService={onEditService}
      />
    </div>
  );
};

export default ServiceList;
