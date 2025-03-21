
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, MoreHorizontal, ArrowUpDown, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Bug } from '@/utils/types/test/bug';
import { BugStatus } from '@/utils/types/test/testStatus';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { getUserNameById } from '@/utils/userUtils';

interface BugTableProps {
  bugs: Bug[];
  onView: (bug: Bug) => void;
  onEdit: (bug: Bug) => void;
  onStatusUpdate: (id: string, status: BugStatus) => void;
  onStatusFilterChange?: (status: string | null) => void;
  onSeverityFilterChange?: (severity: string | null) => void;
  statusFilter?: string | null;
  severityFilter?: string | null;
}

const BugTable: React.FC<BugTableProps> = ({
  bugs,
  onView,
  onEdit,
  onStatusUpdate,
  onStatusFilterChange,
  onSeverityFilterChange,
  statusFilter,
  severityFilter
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'reopened':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatTimestamp = (date: Date) => {
    return format(date, 'MMM d, yyyy HH:mm');
  };

  const getTimeDifference = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays > 0) {
      return `${diffInDays}d ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours}h ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  // Filter options based on actual data
  const statusOptions = Array.from(new Set(bugs.map(bug => bug.status)));
  const severityOptions = Array.from(new Set(bugs.map(bug => bug.severity)));

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Bug Title</TableHead>
            <TableHead className="w-[120px]">
              <div className="flex items-center">
                Status
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {statusOptions.map(status => (
                      <DropdownMenuItem 
                        key={status}
                        onClick={() => onStatusFilterChange?.(status === statusFilter ? null : status)}
                        className={statusFilter === status ? "bg-muted" : ""}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onStatusFilterChange?.(null)}>
                      Show All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead className="w-[120px]">
              <div className="flex items-center">
                Severity
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {severityOptions.map(severity => (
                      <DropdownMenuItem 
                        key={severity}
                        onClick={() => onSeverityFilterChange?.(severity === severityFilter ? null : severity)}
                        className={severityFilter === severity ? "bg-muted" : ""}
                      >
                        {severity}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onSeverityFilterChange?.(null)}>
                      Show All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead className="w-[120px]">Priority</TableHead>
            <TableHead className="w-[150px]">Assigned To</TableHead>
            <TableHead className="w-[150px]">Reported</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No bugs found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            bugs.map((bug) => (
              <TableRow key={bug.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium text-foreground hover:underline"
                    onClick={() => onView(bug)}
                  >
                    {bug.id}
                  </Button>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate font-medium">{bug.title}</div>
                  <div className="truncate text-sm text-muted-foreground">{bug.description}</div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(bug.status)}>{bug.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(bug.severity)}>{bug.severity}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(bug.priority)}>{bug.priority}</Badge>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="line-clamp-1">
                          {getUserNameById(bug.assignedDeveloper || '')}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ID: {bug.assignedDeveloper || 'Unassigned'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{getTimeDifference(bug.createdAt)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{formatTimestamp(bug.createdAt)}</p>
                        <p className="text-xs">By: {getUserNameById(bug.reportedBy || bug.createdBy)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => onView(bug)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => onEdit(bug)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => onStatusUpdate(bug.id, 'in-progress')}
                          disabled={bug.status === 'in-progress'}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Mark In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onStatusUpdate(bug.id, 'resolved')}
                          disabled={bug.status === 'resolved'}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onStatusUpdate(bug.id, 'reopened')}
                          disabled={bug.status === 'reopened' || bug.status === 'open'}
                          className="text-orange-500"
                        >
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Reopen Bug
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BugTable;
