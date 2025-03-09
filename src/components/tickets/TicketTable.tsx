
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Ticket } from '@/utils/types/ticket';
import { formatDistanceToNow } from 'date-fns';
import { SortKey, SortDirection } from './types/ticketTableTypes';
import { getUserNameById } from '@/utils/userUtils';
import SortableTableHeader from './components/SortableTableHeader';
import TicketSLAIndicator from './components/TicketSLAIndicator';
import { StatusBadge, PriorityBadge } from './utils/ticketDisplayUtils';
import { getSortedTickets } from './utils/ticketSortUtils';

interface TicketTableProps {
  tickets: Ticket[];
  onTicketClick: (ticketId: string) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets, onTicketClick }) => {
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Handle sort click
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Get sorted tickets
  const sortedTickets = getSortedTickets(tickets, sortKey, sortDirection);

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableTableHeader 
              keyName="id" 
              label="ID" 
              currentSortKey={sortKey} 
              sortDirection={sortDirection} 
              onSort={handleSort} 
            />
            <SortableTableHeader 
              keyName="title" 
              label="Title" 
              currentSortKey={sortKey} 
              sortDirection={sortDirection} 
              onSort={handleSort} 
            />
            <SortableTableHeader 
              keyName="status" 
              label="Status" 
              currentSortKey={sortKey} 
              sortDirection={sortDirection} 
              onSort={handleSort} 
            />
            <SortableTableHeader 
              keyName="priority" 
              label="Priority" 
              currentSortKey={sortKey} 
              sortDirection={sortDirection} 
              onSort={handleSort} 
            />
            <SortableTableHeader 
              keyName="assignedTo" 
              label="Assigned To" 
              currentSortKey={sortKey} 
              sortDirection={sortDirection} 
              onSort={handleSort} 
            />
            <SortableTableHeader 
              keyName="createdAt" 
              label="Created" 
              currentSortKey={sortKey} 
              sortDirection={sortDirection} 
              onSort={handleSort} 
            />
            <SortableTableHeader 
              keyName="sla" 
              label="SLA Status" 
              currentSortKey={sortKey} 
              sortDirection={sortDirection} 
              onSort={handleSort} 
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTickets.map((ticket) => (
            <TableRow 
              key={ticket.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => onTicketClick(ticket.id)}
            >
              <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
              <TableCell>
                <div className="font-medium">{ticket.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{ticket.description}</div>
              </TableCell>
              <TableCell>
                <StatusBadge status={ticket.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={ticket.priority} />
              </TableCell>
              <TableCell>{getUserNameById(ticket.assignedTo)}</TableCell>
              <TableCell className="text-sm">
                {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <TicketSLAIndicator ticket={ticket} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;
