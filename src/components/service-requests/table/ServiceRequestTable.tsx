
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ExternalLink, Edit } from 'lucide-react';
import { Ticket } from '@/utils/types/ticket';

interface ServiceRequestTableProps {
  tickets: Ticket[];
  expandedTicket: string | null;
  selectedTicket: Ticket | null;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  typeFilter: string | null;
  statusFilter: string | null;
  priorityFilter: string | null;
  typeOptions: string[];
  statusOptions: string[];
  priorityOptions: string[];
  handleSort: (column: string) => void;
  toggleExpandRow: (ticketId: string) => void;
  setTypeFilter: (type: string | null) => void;
  setStatusFilter: (status: string | null) => void;
  setPriorityFilter: (priority: string | null) => void;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
  getPriorityColor: (priority: string) => string;
  getPriorityIcon: (priority: string) => { icon: any; className: string } | null;
  formatDate: (date: string | Date) => string;
  getTimeDifference: (date: string | Date) => string;
  handleViewTicket: (ticket: Ticket) => void;
  handleEditTicket: (ticket: Ticket) => void;
}

const ServiceRequestTable: React.FC<ServiceRequestTableProps> = ({
  tickets,
  expandedTicket,
  selectedTicket,
  sortColumn,
  sortDirection,
  typeFilter,
  statusFilter,
  priorityFilter,
  typeOptions,
  statusOptions,
  priorityOptions,
  handleSort,
  toggleExpandRow,
  setTypeFilter,
  setStatusFilter,
  setPriorityFilter,
  getStatusColor,
  getTypeColor,
  getPriorityColor,
  getPriorityIcon,
  formatDate,
  getTimeDifference,
  handleViewTicket,
  handleEditTicket
}) => {
  // Helper to render sort indicator
  const renderSortIndicator = (columnName: string) => {
    if (sortColumn === columnName) {
      return sortDirection === 'asc' ? (
        <ChevronUp className="ml-1 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-1 h-4 w-4" />
      );
    }
    return null;
  };

  // Render priority with icon if available
  const renderPriority = (priority: string) => {
    const priorityIcon = getPriorityIcon(priority);
    if (priorityIcon) {
      const IconComponent = priorityIcon.icon;
      return (
        <div className="flex items-center">
          <IconComponent className={priorityIcon.className} />
          {priority}
        </div>
      );
    }
    return priority;
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px] cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID
                  {renderSortIndicator('id')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center">
                  Title
                  {renderSortIndicator('title')}
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center">
                  Status
                </div>
              </TableHead>
              <TableHead className="w-[100px]">
                <div className="flex items-center">
                  Priority
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center">
                  Type
                </div>
              </TableHead>
              <TableHead
                className="w-[180px] cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center">
                  Created
                  {renderSortIndicator('createdAt')}
                </div>
              </TableHead>
              <TableHead
                className="w-[150px] text-right"
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No service requests found.
                </TableCell>
              </TableRow>
            )}

            {tickets.map((ticket) => (
              <React.Fragment key={ticket.id}>
                <TableRow className={expandedTicket === ticket.id ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium"
                      onClick={() => handleViewTicket(ticket)}
                    >
                      {ticket.id}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{ticket.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {renderPriority(ticket.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(ticket.category)}>
                      {ticket.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(ticket.createdAt)}</div>
                    <div className="text-xs text-muted-foreground">
                      {getTimeDifference(ticket.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTicket(ticket)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedTicket === ticket.id && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={7} className="p-4">
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Description:</p>
                        <p className="whitespace-pre-wrap mb-3">{ticket.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <p className="font-semibold text-xs text-muted-foreground">Assigned To:</p>
                            <p>{ticket.assignedTo || 'Unassigned'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-xs text-muted-foreground">Last Updated:</p>
                            <p>{formatDate(ticket.updatedAt)}</p>
                          </div>
                          {ticket.resolvedAt && (
                            <div>
                              <p className="font-semibold text-xs text-muted-foreground">Resolved:</p>
                              <p>{formatDate(ticket.resolvedAt)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ServiceRequestTable;
