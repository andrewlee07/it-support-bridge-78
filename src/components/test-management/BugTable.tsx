
import React from 'react';
import { Bug, BugStatus } from '@/utils/types/testTypes';
import { StatusBadge, SeverityBadge } from './ui/BugBadges';
import { Bug as BugIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BugTableProps {
  bugs: Bug[];
  onView: (bug: Bug) => void;
  onEdit: (bug: Bug) => void;
  onStatusUpdate: (id: string, status: BugStatus) => void;
}

const BugTable: React.FC<BugTableProps> = ({ 
  bugs, 
  onView, 
  onEdit, 
  onStatusUpdate 
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-32">
                <div className="flex flex-col items-center justify-center">
                  <BugIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No bugs found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            bugs.map((bug) => (
              <TableRow 
                key={bug.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onView(bug)}
              >
                <TableCell className="font-medium">
                  {bug.title}
                </TableCell>
                <TableCell>
                  <SeverityBadge severity={bug.severity} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={bug.status} />
                </TableCell>
                <TableCell>
                  {bug.createdBy || <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell>
                  {new Date(bug.createdAt).toLocaleDateString()}
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
