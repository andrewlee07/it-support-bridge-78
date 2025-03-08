
import React from 'react';
import { FilesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

interface EmptyBacklogStateProps {
  onCreateItem: () => void;
  hasFilters: boolean;
}

const EmptyBacklogState: React.FC<EmptyBacklogStateProps> = ({ onCreateItem, hasFilters }) => {
  return (
    <div className="h-96 flex flex-col items-center justify-center text-center p-6">
      <FilesIcon className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No backlog items found</h3>
      <p className="text-muted-foreground mb-4">
        {hasFilters
          ? "Try adjusting your filters"
          : "Get started by creating your first backlog item"}
      </p>
      <Button onClick={onCreateItem}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Create Backlog Item
      </Button>
    </div>
  );
};

export default EmptyBacklogState;
