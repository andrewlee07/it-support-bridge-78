
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  LayoutGrid, 
  List, 
  Search, 
  Maximize, 
  Minimize,
  FolderKanban,
  Settings
} from 'lucide-react';

interface BacklogKanbanHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'kanban' | 'table';
  setViewMode: (mode: 'kanban' | 'table') => void;
  onViewTable: () => void;
  columnSize: 'compact' | 'standard';
  setColumnSize: (size: 'compact' | 'standard') => void;
  onCreateItem: () => void;
  onAddBucket: () => void;
  onConfigOpen: () => void;
}

const BacklogKanbanHeader: React.FC<BacklogKanbanHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onViewTable,
  columnSize,
  setColumnSize,
  onCreateItem,
  onAddBucket,
  onConfigOpen,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Backlog Board</h1>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-grow sm:flex-grow-0 sm:w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search backlog items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={columnSize === 'compact' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setColumnSize('compact')}
          >
            <Minimize className="h-4 w-4 mr-1" />
            Compact
          </Button>
          
          <Button
            variant={columnSize === 'standard' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setColumnSize('standard')}
          >
            <Maximize className="h-4 w-4 mr-1" />
            Standard
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onViewTable}
          >
            <List className="h-4 w-4 mr-1" />
            Table View
          </Button>

          <Button 
            variant="outline"
            size="sm"
            onClick={onAddBucket}
          >
            <FolderKanban className="h-4 w-4 mr-1" />
            Add Bucket
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onConfigOpen}
          >
            <Settings className="h-4 w-4 mr-1" />
            Configure Board
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BacklogKanbanHeader;
