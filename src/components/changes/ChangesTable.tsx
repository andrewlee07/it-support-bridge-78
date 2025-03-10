
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChangeRequest } from '@/utils/types/change';
import { format } from 'date-fns';
import { Eye, Check, X } from 'lucide-react';

export interface ChangesTableProps {
  changes: ChangeRequest[];
  activeTab: string;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewChange: (id: string) => void;
  userRole?: string;
}

const ChangesTable: React.FC<ChangesTableProps> = ({
  changes,
  activeTab,
  onApprove,
  onReject,
  onViewChange,
  userRole
}) => {
  const canApprove = userRole === 'admin' || userRole === 'change-manager';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };
  
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  if (!changes || changes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No change requests found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {changes.map(change => (
          <TableRow key={change.id}>
            <TableCell className="font-medium">{change.id}</TableCell>
            <TableCell>{change.title}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(change.status)}>
                {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getRiskLevelColor(change.riskLevel)}>
                {change.riskLevel.charAt(0).toUpperCase() + change.riskLevel.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{format(new Date(change.createdAt), 'MMM d, yyyy')}</TableCell>
            <TableCell>{format(new Date(change.startDate), 'MMM d, yyyy')}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewChange(change.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                
                {canApprove && change.status === 'submitted' && (
                  <>
                    <Button 
                      size="sm"
                      onClick={() => onApprove?.(change.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onReject?.(change.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ChangesTable;
