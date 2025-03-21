
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, Clock, Eye, Check, X } from 'lucide-react';
import { Release, ReleaseStatus } from '@/utils/types';
import { format } from 'date-fns';

interface ReleasesListProps {
  releases: Release[];
  isLoading: boolean;
  isError: boolean;
  onApprove: (releaseId: string) => void;
  onReject: (releaseId: string) => void;
  onCreateNew: () => void;
  onViewRelease: (releaseId: string) => void;
  refetch: () => void;
  userRole?: string;
  searchQuery?: string;
  viewType?: 'all' | 'planned' | 'inProgress' | 'deployed';
  canApprove?: boolean;
}

const ReleasesList: React.FC<ReleasesListProps> = ({
  releases,
  isLoading,
  isError,
  onApprove,
  onReject,
  onCreateNew,
  onViewRelease,
  refetch,
  userRole,
  searchQuery,
  viewType = 'all',
  canApprove = false
}) => {
  // Utility functions for status and type colors
  const getStatusColor = (status: ReleaseStatus) => {
    switch (status) {
      case 'Planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Deployed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'minor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'patch':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'emergency':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  // Helper function to format dates safely
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMM d, yyyy');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium">Error loading releases</h3>
        <p className="text-muted-foreground mt-1">Please try again later</p>
        <Button variant="outline" className="mt-4" onClick={refetch}>
          Try Again
        </Button>
      </div>
    );
  }

  if (releases.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No releases found.</p>
        {!searchQuery && (
          <Button className="mt-4" onClick={onCreateNew}>
            Create New Release
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Planned Date</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((release) => (
            <TableRow 
              key={release.id} 
              className="cursor-pointer hover:bg-muted"
              onClick={() => onViewRelease(release.id)}
            >
              <TableCell className="font-medium">{release.id}</TableCell>
              <TableCell>{release.title}</TableCell>
              <TableCell>{release.version}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(release.status)}>
                  {release.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getTypeColor(release.type)}>
                  {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(release.plannedDate)}</TableCell>
              <TableCell>{release.owner}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewRelease(release.id);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  {release.approvalStatus === 'pending' && canApprove && (
                    <>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onApprove(release.id);
                        }}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onReject(release.id);
                        }}
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
    </div>
  );
};

export default ReleasesList;
