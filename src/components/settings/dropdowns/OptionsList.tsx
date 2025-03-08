
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { DropdownOption, ConfigurableEntityType } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { dropdownConfigurationApi } from '@/utils/api/dropdownConfigurationApi';

interface OptionsListProps {
  configId: string;
  entityType: ConfigurableEntityType;
  options?: DropdownOption[];
  onToggleActive?: (id: string, isActive: boolean) => void;
  onDelete?: (id: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({
  configId,
  entityType,
  options: propOptions,
  onToggleActive,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  // Fetch options if not provided as props
  const { data, isLoading } = useQuery({
    queryKey: ['dropdownConfiguration', configId],
    queryFn: () => dropdownConfigurationApi.getDropdownConfigurationById(configId),
    enabled: !propOptions,
  });

  const options = propOptions || (data?.success ? data.data.options : []);
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading options...</div>;
  }
  
  if (!options || options.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No options available</div>;
  }

  // Sort options by sort order
  const sortedOptions = [...options].sort((a, b) => a.sortOrder - b.sortOrder);

  const handleToggleActive = (id: string, isActive: boolean) => {
    if (onToggleActive) {
      onToggleActive(id, isActive);
    }
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (onMoveUp) {
      onMoveUp(index);
    }
  };

  const handleMoveDown = (index: number) => {
    if (onMoveDown) {
      onMoveDown(index);
    }
  };

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
              onCheckedChange={() => handleToggleActive(option.id, option.isActive)}
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
              onClick={() => handleMoveUp(index)}
              disabled={index === 0}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleMoveDown(index)}
              disabled={index === sortedOptions.length - 1}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(option.id)}
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
