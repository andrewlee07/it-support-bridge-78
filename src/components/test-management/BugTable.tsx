
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBugs, updateBug } from '@/utils/mockData/testData';
import { Bug } from '@/utils/types/test/bug';
import { BugStatus } from '@/utils/types/test/testStatus';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bug as BugIcon, Eye, Edit, MoreHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import BugForm from './BugForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BugListProps {
  bugs?: Bug[];
  onView?: (bug: Bug) => void;
  onEdit?: (bug: Bug) => void;
  onStatusUpdate?: (id: string, status: BugStatus) => void;
  onStatusFilterChange?: (status: string | null) => void;
  onSeverityFilterChange?: (severity: string | null) => void;
  statusFilter?: string | null;
  severityFilter?: string | null;
}

const BugTable: React.FC<BugListProps> = ({ 
  bugs, 
  onView, 
  onEdit, 
  onStatusUpdate,
  onStatusFilterChange,
  onSeverityFilterChange,
  statusFilter,
  severityFilter
}) => {
  const handleStatusChange = (id: string, status: BugStatus) => {
    if (onStatusUpdate) {
      onStatusUpdate(id, status);
    }
  };

  const handleStatusFilter = (status: string | null) => {
    if (onStatusFilterChange) {
      onStatusFilterChange(status);
    }
  };

  const handleSeverityFilter = (severity: string | null) => {
    if (onSeverityFilterChange) {
      onSeverityFilterChange(severity);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="status-filter">Filter by Status:</Label>
          <select
            id="status-filter"
            className="px-3 py-2 border rounded-md"
            value={statusFilter || ''}
            onChange={(e) => handleStatusFilter(e.target.value === '' ? null : e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="fixed">Fixed</option>
            <option value="verified">Verified</option>
            <option value="closed">Closed</option>
            <option value="resolved">Resolved</option>
            <option value="new">New</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="severity-filter">Filter by Severity:</Label>
          <select
            id="severity-filter"
            className="px-3 py-2 border rounded-md"
            value={severityFilter || ''}
            onChange={(e) => handleSeverityFilter(e.target.value === '' ? null : e.target.value)}
          >
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugs && bugs.map((bug) => (
            <TableRow key={bug.id}>
              <TableCell>{bug.title}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {bug.status} <MoreHorizontal className="ml-2 h-4 w-4" />
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
              <TableCell>{bug.severity}</TableCell>
              <TableCell>{bug.priority}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BugTable;
