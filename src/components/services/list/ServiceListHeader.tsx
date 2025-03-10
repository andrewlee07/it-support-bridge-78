
import React from 'react';
import ServiceViewToggle from './ServiceViewToggle';
import ServiceAddButton from './ServiceAddButton';
import ServiceListFilter from './ServiceListFilter';
import { ServiceCategory } from '@/utils/types/service';

interface ServiceListHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (categoryId: string) => void;
  categories: ServiceCategory[];
  viewMode: 'list' | 'topology';
  setViewMode: (mode: 'list' | 'topology') => void;
  onAddService?: () => void;
}

const ServiceListHeader: React.FC<ServiceListHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  categories,
  viewMode,
  setViewMode,
  onAddService
}) => {
  return (
    <div className="flex justify-between items-center">
      <ServiceListFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      
      <div className="flex items-center gap-2">
        <ServiceViewToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        {onAddService && (
          <ServiceAddButton onAddService={onAddService} />
        )}
      </div>
    </div>
  );
};

export default ServiceListHeader;
