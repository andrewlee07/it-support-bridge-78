
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ChangesHeaderProps {
  onCreateNew: () => void;
}

const ChangesHeader: React.FC<ChangesHeaderProps> = ({ onCreateNew }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Change Management</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage system and infrastructure changes
        </p>
      </div>
      <Button className="shrink-0" onClick={onCreateNew}>
        <Plus className="mr-2 h-4 w-4" />
        New Change Request
      </Button>
    </div>
  );
};

export default ChangesHeader;
