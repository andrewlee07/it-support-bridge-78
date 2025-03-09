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
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { calculateSLAStatus } from '@/utils/sla/slaCalculations';
import { Progress } from '@/components/ui/progress';
import { getUserNameById } from '@/utils/userUtils';

interface TicketTableProps {
  tickets: Ticket[];
  onTicketClick: (ticketId: string) => void;
}

// Sorting interface
type SortKey = 'id' | 'title' | 'priority' | 'status' | 'createdAt' | 'assignedTo' | 'sla';
type SortDirection = 'asc' | 'desc';

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
  const getSortedTickets = (): Ticket[] => {
    const sortFactor = sortDirection === 'asc' ? 1 : -1;
    
    return [...tickets].sort((a, b) => {
      switch (sortKey) {
        case 'id':
          return sortFactor * a.id.localeCompare(b.id);
        case 'title':
          return sortFactor * a.title.localeCompare(b.title);
        case 'priority':
          return sortFactor * a.priority.localeCompare(b.priority);
        case 'status':
          return sortFactor * a.status.localeCompare(b.status);
        case 'assignedTo':
          const aAssigned = a.assignedTo || '';
          const bAssigned = b.assignedTo || '';
          return sortFactor * aAssigned.localeCompare(bAssigned);
        case 'sla':
          const aStatus = calculateSLAStatus(a);
          const bStatus = calculateSLAStatus(b);
          // Order: breached > warning > ok
          const statusRank = { 'breached': 0, 'warning': 1, 'ok': 2 };
          return sortFactor * (statusRank[aStatus.status] - statusRank[bStatus.status]);
        case 'createdAt':
        default:
          return sortFactor * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
    });
  };

  // Priority display helper
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'P2':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'P3':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'P4':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Status display helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'approved':
      case 'fulfilled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // SLA status indicator - updated to use only progress bars with color coding
  const renderSLAIndicator = (ticket: Ticket) => {
    const slaInfo = calculateSLAStatus(ticket);
    
    if (ticket.status === 'closed' || ticket.status === 'resolved') {
      return <div className="text-gray-500">Completed</div>;
    }
    
    switch (slaInfo.status) {
      case 'breached':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-red-600 font-medium">SLA Breached</span>
              <span className="text-red-600 text-sm">{slaInfo.timeLeft}</span>
            </div>
            <Progress value={0} className="h-2" indicatorClassName="bg-red-600" />
          </div>
        );
      case 'warning':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-600 font-medium">SLA Warning</span>
              <span className="text-amber-600 text-sm">{slaInfo.timeLeft}</span>
            </div>
            <Progress value={slaInfo.percentLeft} className="h-2" indicatorClassName="bg-amber-500" />
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-medium">SLA On Track</span>
              <span className="text-green-600 text-sm">{slaInfo.timeLeft}</span>
            </div>
            <Progress value={slaInfo.percentLeft} className="h-2" indicatorClassName="bg-green-500" />
          </div>
        );
    }
  };

  // Render sort indicator
  const renderSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-3.5 w-3.5 ml-1 inline" /> : 
      <ArrowDown className="h-3.5 w-3.5 ml-1 inline" />;
  };

  // Column header with sort functionality
  const SortableHeader = ({ 
    keyName, 
    label 
  }: { 
    keyName: SortKey, 
    label: string 
  }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/60"
      onClick={() => handleSort(keyName)}
    >
      <div className="flex items-center">
        {label}
        {renderSortIndicator(keyName)}
      </div>
    </TableHead>
  );

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader keyName="id" label="ID" />
            <SortableHeader keyName="title" label="Title" />
            <SortableHeader keyName="status" label="Status" />
            <SortableHeader keyName="priority" label="Priority" />
            <SortableHeader keyName="assignedTo" label="Assigned To" />
            <SortableHeader keyName="createdAt" label="Created" />
            <SortableHeader keyName="sla" label="SLA Status" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {getSortedTickets().map((ticket) => (
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
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{getUserNameById(ticket.assignedTo)}</TableCell>
              <TableCell className="text-sm">
                {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell>{renderSLAIndicator(ticket)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;
