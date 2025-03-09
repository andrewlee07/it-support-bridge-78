
import React, { useCallback } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, Grid2X2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type ViewType = 'grid' | 'table';

interface UserViewToggleProps {
  view: ViewType;
  onChange: (view: ViewType) => void;
}

const UserViewToggle: React.FC<UserViewToggleProps> = ({ view, onChange }) => {
  // Memoize the value change handler to avoid unnecessary rerenders
  const handleValueChange = useCallback((value: string) => {
    if (value) onChange(value as ViewType);
  }, [onChange]);

  console.log('UserViewToggle rendering with view:', view); // Debugging log

  return (
    <TooltipProvider delayDuration={300}>
      <ToggleGroup 
        type="single" 
        value={view} 
        onValueChange={handleValueChange}
        className="border rounded-md"
        aria-label="View toggle"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem 
              value="grid" 
              aria-label="Grid view" 
              title="Card View"
              className="flex items-center gap-1 data-[state=on]:bg-muted"
            >
              <Grid2X2 className="h-4 w-4" />
              <span className="hidden sm:inline">Card View</span>
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Card view</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem 
              value="table" 
              aria-label="Table view" 
              title="Table View"
              className="flex items-center gap-1 data-[state=on]:bg-muted"
            >
              <Table className="h-4 w-4" />
              <span className="hidden sm:inline">Table View</span>
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>Table view</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  );
};

export default UserViewToggle;
