
import React from 'react';
import { Bug } from '@/utils/types/test/bug';
import { BugStatus } from '@/utils/types/test/testStatus';
import { Button } from '@/components/ui/button';
import { Eye, Edit, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface BugTableProps {
  bugs: Bug[];
  onView?: (bug: Bug) => void;
  onEdit?: (bug: Bug) => void;
  onStatusUpdate?: (id: string, status: BugStatus) => void;
}

const BugTable: React.FC<BugTableProps> = ({ 
  bugs, 
  onView, 
  onEdit, 
  onStatusUpdate
}) => {
  const handleStatusChange = (id: string, status: BugStatus) => {
    if (onStatusUpdate) {
      onStatusUpdate(id, status);
    }
  };

  // Helper function to get color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500 hover:bg-red-600';
      case 'high': return 'bg-orange-500 hover:bg-orange-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Helper function to get color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'fixed': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'verified': return 'bg-teal-100 text-teal-800 hover:bg-teal-200';
      case 'closed': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      case 'new': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Format bug ID to match the required format (BUG00001)
  const formatBugId = (id: string) => {
    if (id.startsWith('BUG')) return id;
    const numericPart = id.replace(/\D/g, '');
    return `BUG${numericPart.padStart(5, '0')}`;
  };

  return (
    <div className="w-full">
      <Table className="border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugs && bugs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No bugs found
              </TableCell>
            </TableRow>
          ) : (
            bugs && bugs.map((bug) => (
              <TableRow key={bug.id} className="hover:bg-muted/50 border-b">
                <TableCell className="font-medium">{formatBugId(bug.id)}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{bug.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{bug.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className={getStatusColor(bug.status)}>
                        {bug.status.replace('-', ' ')} <MoreHorizontal className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(bug.id, 'open')}>
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(bug.id, 'in-progress')}>
                        In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(bug.id, 'new')}>
                        New
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(bug.id, 'fixed')}>
                        Fixed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(bug.id, 'verified')}>
                        Verified
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(bug.id, 'closed')}>
                        Closed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(bug.id, 'resolved')}>
                        Resolved
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(bug.severity)}>
                    {bug.severity}
                  </Badge>
                </TableCell>
                <TableCell>{bug.priority}</TableCell>
                <TableCell>{bug.createdAt ? format(new Date(bug.createdAt), 'MMM dd, yyyy') : 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onView && onView(bug)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onEdit && onEdit(bug)}>
                      <Edit className="h-4 w-4" />
                    </Button>
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
