
import React from 'react';
import { TableHead } from '@/components/ui/table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { SortKey, SortDirection } from '../types/ticketTableTypes';

interface SortableTableHeaderProps {
  keyName: SortKey;
  label: string;
  currentSortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  keyName,
  label,
  currentSortKey,
  sortDirection,
  onSort
}) => {
  const renderSortIndicator = () => {
    if (currentSortKey !== keyName) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-3.5 w-3.5 ml-1 inline" /> : 
      <ArrowDown className="h-3.5 w-3.5 ml-1 inline" />;
  };

  return (
    <TableHead 
      className="cursor-pointer hover:bg-muted/60"
      onClick={() => onSort(keyName)}
    >
      <div className="flex items-center">
        {label}
        {renderSortIndicator()}
      </div>
    </TableHead>
  );
};

export default SortableTableHeader;
