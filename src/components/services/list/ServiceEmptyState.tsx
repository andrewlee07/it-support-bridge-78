
import React from 'react';

interface ServiceEmptyStateProps {
  hasSearchQuery: boolean;
}

const ServiceEmptyState: React.FC<ServiceEmptyStateProps> = ({ hasSearchQuery }) => {
  return (
    <div className="text-center py-8 border rounded-md bg-muted/10">
      <p className="text-muted-foreground">
        {hasSearchQuery
          ? "No services match your search"
          : "No services found. Add your first service to get started."}
      </p>
    </div>
  );
};

export default ServiceEmptyState;
