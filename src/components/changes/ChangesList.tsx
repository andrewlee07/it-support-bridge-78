
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, Clock, FileText, Plus } from 'lucide-react';
import { ChangeRequest } from '@/utils/types';

interface ChangesListProps {
  changes: ChangeRequest[];
  isLoading: boolean;
  isError: boolean;
  onApprove: (changeId: string) => void;
  onReject: (changeId: string) => void;
  onCreateNew: () => void;
  onViewChange: (changeId: string) => void;
  refetch: () => void;
  userRole?: string;
  searchQuery?: string;
  viewType: 'all' | 'pending' | 'upcoming' | 'completed';
}

const ChangesList: React.FC<ChangesListProps> = ({
  changes,
  isLoading,
  isError,
  onApprove,
  onReject,
  onCreateNew,
  onViewChange,
  refetch,
  userRole,
  searchQuery,
  viewType
}) => {
  const navigate = useNavigate();
  
  // Utility functions for status and priority colors
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const handleCardClick = (changeId: string) => {
    navigate(`/changes/${changeId}`);
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
        <h3 className="text-lg font-medium">Error loading change requests</h3>
        <p className="text-muted-foreground mt-1">Please try again later</p>
        <Button variant="outline" className="mt-4" onClick={refetch}>
          Try Again
        </Button>
      </div>
    );
  }

  if (changes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">
          {viewType === 'pending'
            ? 'No pending change requests'
            : viewType === 'upcoming'
            ? 'No upcoming changes'
            : viewType === 'completed'
            ? 'No completed changes'
            : 'No change requests found'}
        </h3>
        <p className="text-muted-foreground mt-1">
          {searchQuery
            ? 'Try a different search query'
            : viewType === 'pending'
            ? 'There are no change requests waiting for approval.'
            : viewType === 'upcoming'
            ? 'There are no approved changes scheduled for implementation.'
            : viewType === 'completed'
            ? 'There are no completed change requests yet.'
            : 'Create your first change request to get started'}
        </p>
        {!searchQuery && viewType === 'all' && (
          <Button className="mt-4" onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            New Change Request
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {changes.map((change) => (
        <Card 
          key={change.id} 
          className="shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick(change.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-medium">{change.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">{change.id}</div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(change.status)}>
                  {change.status.charAt(0).toUpperCase() + change.status.slice(1)}
                </Badge>
                <Badge className={getPriorityColor(change.priority)}>
                  {change.priority.charAt(0).toUpperCase() + change.priority.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm">{change.description}</p>
            {viewType === 'upcoming' && (
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  Implementation: {format(new Date(change.startDate), 'MMM d')} - {format(new Date(change.endDate), 'MMM d, yyyy')}
                </span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {viewType === 'completed'
                  ? `Completed: ${format(new Date(change.updatedAt), 'MMM d, yyyy')}`
                  : `Created: ${format(new Date(change.createdAt), 'MMM d, yyyy')}`}
              </span>
            </div>
            {change.status === 'submitted' && userRole === 'admin' && (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" variant="outline" onClick={(e) => {e.stopPropagation(); onReject(change.id);}}>
                  Reject
                </Button>
                <Button size="sm" onClick={(e) => {e.stopPropagation(); onApprove(change.id);}}>
                  Approve
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ChangesList;
