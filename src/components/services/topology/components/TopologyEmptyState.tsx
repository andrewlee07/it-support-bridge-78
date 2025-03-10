
import React from 'react';
import { AlertCircle } from 'lucide-react';

export const TopologyEmptyState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">No service relationships</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          There are no relationships defined between services.
        </p>
      </div>
    </div>
  );
};
