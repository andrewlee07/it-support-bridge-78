
import React from 'react';
import { Bug } from '@/utils/types/test/bug';
import { BugStatus } from '@/utils/types/test/testStatus';
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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleBugClick = (bug: Bug) => {
    navigate(`/bugs/${bug.id}`);
  };

  // Helper function to get user display name
  const getUserDisplayName = (userId: string) => {
    // This would be replaced with actual user lookup
    const userMap: Record<string, string> = {
      'user-1': 'John Doe',
      'user-2': 'Jane Smith',
    };
    return userMap[userId] || userId;
  };

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
                onClick={() => handleBugClick(bug)}
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
                  {getUserDisplayName(bug.createdBy || bug.reportedBy || '')}
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
