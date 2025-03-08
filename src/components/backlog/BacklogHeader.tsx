
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface BacklogHeaderProps {
  onCreateItem: () => void;
}

const BacklogHeader: React.FC<BacklogHeaderProps> = ({ onCreateItem }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Backlog Items</h1>
        <p className="text-muted-foreground">Manage and plan your work items</p>
      </div>
      <Button onClick={onCreateItem}>
        <PlusCircle className="h-4 w-4 mr-2" />
        New Item
      </Button>
    </div>
  );
};

export default BacklogHeader;
