
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { DropdownOption } from '@/utils/types';

interface OptionsListProps {
  options: DropdownOption[];
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({
  options,
  onToggleActive,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  // Sort options by sort order
  const sortedOptions = [...options].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="divide-y">
      {sortedOptions.map((option, index) => (
        <div 
          key={option.id}
          className={`flex items-center justify-between p-3 ${
            !option.isActive ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={option.isActive}
              onCheckedChange={() => onToggleActive(option.id, option.isActive)}
            />
            <div>
              <p className="font-medium">{option.label}</p>
              <p className="text-xs text-muted-foreground">Value: {option.value}</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onMoveDown(index)}
              disabled={index === sortedOptions.length - 1}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onDelete(option.id)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionsList;
