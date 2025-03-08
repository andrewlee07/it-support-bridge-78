
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Move, X } from 'lucide-react';
import { KanbanColumnConfig } from '@/utils/types/kanbanTypes';

interface ColumnItemProps {
  column: KanbanColumnConfig;
  index: number;
  totalColumns: number;
  isCollapsed: boolean;
  onToggleVisibility: (columnId: string, isVisible: boolean) => void;
  onRemoveColumn: (columnId: string) => void;
  onMoveColumn: (columnId: string, direction: 'up' | 'down') => void;
}

const ColumnItem: React.FC<ColumnItemProps> = ({
  column,
  index,
  totalColumns,
  isCollapsed,
  onToggleVisibility,
  onRemoveColumn,
  onMoveColumn
}) => {
  return (
    <div className="flex items-center justify-between border p-3 rounded-md">
      <div className="flex items-center space-x-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: column.color.includes('bg-') 
              ? `var(--${column.color.split('bg-')[1].split(' ')[0]})` 
              : column.color
          }}
        />
        <div>
          <p className="font-medium">{column.displayName}</p>
          <p className="text-xs text-muted-foreground">Status: {column.statusValue}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMoveColumn(column.id, 'up')}
            disabled={index === 0}
            className="h-8 w-8"
          >
            <Move className="h-4 w-4 rotate-90" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMoveColumn(column.id, 'down')}
            disabled={index === totalColumns - 1}
            className="h-8 w-8"
          >
            <Move className="h-4 w-4 -rotate-90" />
          </Button>
        </div>
        <Switch
          id={`visibility-${column.id}`}
          checked={!isCollapsed}
          onCheckedChange={(checked) => onToggleVisibility(column.id, checked)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemoveColumn(column.id)}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ColumnItem;
