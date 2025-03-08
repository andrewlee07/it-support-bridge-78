
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, KanbanIcon } from 'lucide-react';

interface BacklogHeaderProps {
  onCreateItem: () => void;
}

const BacklogHeader: React.FC<BacklogHeaderProps> = ({
  onCreateItem
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Backlog</h1>
        <p className="text-muted-foreground">Manage your backlog items and track progress</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline"
          onClick={() => navigate('/backlog/kanban')}
        >
          <KanbanIcon className="mr-2 h-4 w-4" />
          Kanban View
        </Button>
        <Button onClick={onCreateItem}>
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </div>
    </div>
  );
};

export default BacklogHeader;
