
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Clock, CheckCircle2 } from 'lucide-react';
import { TableHead } from '@/components/ui/table';

interface SortableColumnHeaderProps {
  title: string;
  column: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
}

export const SortableColumnHeader: React.FC<SortableColumnHeaderProps> = ({
  title,
  column,
  sortColumn,
  sortDirection,
  onSort
}) => {
  const renderSortIndicator = () => {
    if (sortColumn === column) {
      return <span className="ml-1">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>;
    }
    return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
  };

  return (
    <TableHead 
      className="cursor-pointer hover:bg-muted/20 text-muted-foreground"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center">
        {title}
        {renderSortIndicator()}
      </div>
    </TableHead>
  );
};

interface SLAColumnHeaderProps {
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  slaType: 'response' | 'resolution';
  onSort: (column: string) => void;
  onSLATypeChange: (type: 'response' | 'resolution') => void;
}

export const SLAColumnHeader: React.FC<SLAColumnHeaderProps> = ({
  sortColumn,
  sortDirection,
  slaType,
  onSort,
  onSLATypeChange
}) => {
  const renderSortIndicator = () => {
    if (sortColumn === 'sla') {
      return <span className="ml-1">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>;
    }
    return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
  };

  return (
    <TableHead 
      className="cursor-pointer hover:bg-muted/20 min-w-[240px] text-muted-foreground"
      onClick={() => onSort('sla')}
    >
      <div className="flex items-center justify-between">
        <span>SLA Status</span>
        <div className="flex bg-secondary rounded overflow-hidden">
          <Button 
            size="sm" 
            variant="ghost" 
            className={`px-2 py-1 text-xs h-7 rounded-none ${slaType === 'response' ? 'bg-secondary text-white' : 'text-muted-foreground'}`}
            onClick={(e) => {
              e.stopPropagation();
              onSLATypeChange('response');
            }}
          >
            <Clock className="h-3 w-3 mr-1" />
            Response
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className={`px-2 py-1 text-xs h-7 rounded-none ${slaType === 'resolution' ? 'bg-secondary text-white' : 'text-muted-foreground'}`}
            onClick={(e) => {
              e.stopPropagation();
              onSLATypeChange('resolution');
            }}
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Resolution
          </Button>
        </div>
      </div>
    </TableHead>
  );
};
