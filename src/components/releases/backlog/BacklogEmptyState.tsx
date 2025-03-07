
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardListIcon, PlusCircleIcon } from 'lucide-react';

interface BacklogEmptyStateProps {
  onAddItems: () => void;
}

const BacklogEmptyState: React.FC<BacklogEmptyStateProps> = ({ onAddItems }) => {
  return (
    <div className="text-center py-12 border rounded-md">
      <ClipboardListIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-medium mb-2">No backlog items assigned</h3>
      <p className="text-muted-foreground mb-4">
        Assign backlog items to this release to track progress
      </p>
      <Button variant="outline" onClick={onAddItems}>
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        Add Backlog Items
      </Button>
    </div>
  );
};

export default BacklogEmptyState;
