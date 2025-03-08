
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface KanbanEmptyStateProps {
  onCreateItem: () => void;
}

const KanbanEmptyState: React.FC<KanbanEmptyStateProps> = ({ onCreateItem }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-background">
      <h3 className="text-lg font-medium mb-2">No items to display</h3>
      <p className="text-muted-foreground text-sm mb-4 text-center">
        Create your first backlog item to get started with the kanban board.
      </p>
      <Button onClick={onCreateItem} className="flex items-center gap-1">
        <Plus className="h-4 w-4" />
        Create Backlog Item
      </Button>
    </div>
  );
};

export default KanbanEmptyState;
