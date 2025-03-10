
import React from 'react';

interface ServiceEmptyStateProps {
  hasSearchQuery?: boolean;
  onAddService?: () => void;
}

const ServiceEmptyState: React.FC<ServiceEmptyStateProps> = ({ 
  hasSearchQuery = false,
  onAddService
}) => {
  return (
    <div className="text-center py-8 border rounded-md bg-muted/10">
      <p className="text-muted-foreground">
        {hasSearchQuery
          ? "No services match your search"
          : "No services found. Add your first service to get started."}
      </p>
      {onAddService && (
        <button
          onClick={onAddService}
          className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
        >
          Add Service
        </button>
      )}
    </div>
  );
};

export default ServiceEmptyState;
