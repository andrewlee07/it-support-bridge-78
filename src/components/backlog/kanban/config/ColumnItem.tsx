
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Move, X, Edit, Check } from 'lucide-react';
import { KanbanColumnConfig } from '@/utils/types/kanbanTypes';

interface ColumnItemProps {
  column: KanbanColumnConfig;
  index: number;
  totalColumns: number;
  isCollapsed: boolean;
  onToggleVisibility: (columnId: string, isVisible: boolean) => void;
  onRemoveColumn: (columnId: string) => void;
  onMoveColumn: (columnId: string, direction: 'up' | 'down') => void;
  onUpdateColumnName: (columnId: string, newName: string) => void;
}

const ColumnItem: React.FC<ColumnItemProps> = ({
  column,
  index,
  totalColumns,
  isCollapsed,
  onToggleVisibility,
  onRemoveColumn,
  onMoveColumn,
  onUpdateColumnName
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(column.displayName);

  const handleSaveName = () => {
    if (editedName.trim() && editedName !== column.displayName) {
      onUpdateColumnName(column.id, editedName.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(column.displayName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

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
        <div className="flex-grow">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="h-7 py-1"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={handleSaveName}
                className="h-7 w-7"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={handleCancelEdit}
                className="h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="font-medium">{column.displayName}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          )}
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
