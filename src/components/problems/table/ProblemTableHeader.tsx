
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { SortableColumnHeader, SLAColumnHeader } from './ProblemTableColumns';

interface ProblemTableHeaderProps {
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  handleSort: (column: string) => void;
  slaType: 'response' | 'resolution';
  setSlaType: (type: 'response' | 'resolution') => void;
}

const ProblemTableHeader: React.FC<ProblemTableHeaderProps> = ({
  sortColumn,
  sortDirection,
  handleSort,
  slaType,
  setSlaType
}) => {
  return (
    <TableHeader>
      <TableRow>
        <SortableColumnHeader 
          title="ID" 
          column="id" 
          sortColumn={sortColumn} 
          sortDirection={sortDirection} 
          onSort={handleSort} 
        />
        <SortableColumnHeader 
          title="Problem Description" 
          column="title" 
          sortColumn={sortColumn} 
          sortDirection={sortDirection} 
          onSort={handleSort} 
        />
        <SortableColumnHeader 
          title="Status" 
          column="status" 
          sortColumn={sortColumn} 
          sortDirection={sortDirection} 
          onSort={handleSort} 
        />
        <SortableColumnHeader 
          title="Priority" 
          column="priority" 
          sortColumn={sortColumn} 
          sortDirection={sortDirection} 
          onSort={handleSort} 
        />
        <SortableColumnHeader 
          title="Assigned To" 
          column="assignedTo" 
          sortColumn={sortColumn} 
          sortDirection={sortDirection} 
          onSort={handleSort} 
        />
        <SortableColumnHeader 
          title="Created" 
          column="createdAt" 
          sortColumn={sortColumn} 
          sortDirection={sortDirection} 
          onSort={handleSort} 
        />
        <TableHead>Related</TableHead>
        <SLAColumnHeader 
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          slaType={slaType}
          onSort={handleSort}
          onSLATypeChange={setSlaType}
        />
        <TableHead className="w-[120px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProblemTableHeader;
