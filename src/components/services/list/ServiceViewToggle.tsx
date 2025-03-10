
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

interface ServiceViewToggleProps {
  viewMode: 'list' | 'topology';
  setViewMode: (mode: 'list' | 'topology') => void;
}

const ServiceViewToggle: React.FC<ServiceViewToggleProps> = ({
  viewMode,
  setViewMode
}) => {
  return (
    <div className="border rounded-md p-1">
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setViewMode('list')}
        className="px-2"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'topology' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setViewMode('topology')}
        className="px-2"
      >
        <Grid className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ServiceViewToggle;
