
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, Clock, FileText, Plus, Tag, User } from 'lucide-react';
import { Release, ReleaseStatus } from '@/utils/types';

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
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">
          {viewType === 'planned'
            ? 'No planned releases'
            : viewType === 'inProgress'
            ? 'No releases in progress'
            : viewType === 'deployed'
            ? 'No deployed releases'
            : 'No releases found'}
        </h3>
        <p className="text-muted-foreground mt-1">
          {searchQuery
            ? 'Try a different search query'
            : 'Create your first release to get started'}
        </p>
        {!searchQuery && (
          <Button className="mt-4" onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            New Release
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {releases.map((release) => (
        <Card key={release.id} className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-medium">{release.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <span>{release.id}</span>
                  <span className="mx-1">•</span>
                  <Tag className="h-3.5 w-3.5" />
                  <span>{release.version}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(release.status)}>
                  {release.status}
                </Badge>
                <Badge className={getTypeColor(release.type)}>
                  {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm">{release.description}</p>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Planned: {format(new Date(release.plannedDate), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Owner: {release.owner}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Created: {format(new Date(release.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex gap-2">
              {release.approvalStatus === 'pending' && canApprove && (
                <>
                  <Button size="sm" variant="outline" onClick={() => onReject(release.id)}>
                    Reject
                  </Button>
                  <Button size="sm" onClick={() => onApprove(release.id)}>
                    Approve
                  </Button>
                </>
              )}
              <Button size="sm" variant="outline" onClick={() => onViewRelease(release.id)}>
                View
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ReleasesList;
