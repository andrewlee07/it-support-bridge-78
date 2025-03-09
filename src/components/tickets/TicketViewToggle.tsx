
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, Grid2X2 } from 'lucide-react';

export type ViewType = 'grid' | 'table';

interface TicketViewToggleProps {
  view: ViewType;
  onChange: (view: ViewType) => void;
}

const TicketViewToggle: React.FC<TicketViewToggleProps> = ({ view, onChange }) => {
  return (
    <ToggleGroup 
      type="single" 
      value={view} 
      onValueChange={(value) => {
        if (value) onChange(value as ViewType);
      }}
      className="border rounded-md"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view" className="flex items-center gap-1 data-[state=on]:bg-muted">
        <Grid2X2 className="h-4 w-4" />
        <span className="hidden sm:inline">Card View</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table view" className="flex items-center gap-1 data-[state=on]:bg-muted">
        <Table className="h-4 w-4" />
        <span className="hidden sm:inline">Table View</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default TicketViewToggle;
