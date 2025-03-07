
import React from 'react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { getReleaseById } from '@/utils/api/release';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  CalendarIcon, 
  ClockIcon, 
  EditIcon, 
  TagIcon, 
  UserIcon 
} from 'lucide-react';
import { assignToRelease, removeFromRelease } from '@/utils/api/backlogApi';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BacklogItemDetailProps {
  backlogItem: BacklogItem;
  onEdit: () => void;
}

const BacklogItemDetail: React.FC<BacklogItemDetailProps> = ({
  backlogItem,
  onEdit,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch release data if assigned
  const { data: releaseResponse } = useQuery({
    queryKey: ['release', backlogItem.releaseId],
    queryFn: () => getReleaseById(backlogItem.releaseId || ''),
    enabled: !!backlogItem.releaseId,
  });

  // Get all releases for assignment
  const { data: releasesResponse } = useQuery({
    queryKey: ['releases'],
    queryFn: () => getReleases(),
  });

  const releases = releasesResponse?.data || [];
  const release = releaseResponse?.data;

  // Mutation to assign to release
  const assignMutation = useMutation({
    mutationFn: (releaseId: string) => assignToRelease(backlogItem.id, releaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backlogItems'] });
      queryClient.invalidateQueries({ queryKey: ['release', backlogItem.releaseId] });
      toast({
        title: 'Success',
        description: 'Backlog item assigned to release successfully',
      });
    }
  });

  // Mutation to remove from release
  const removeMutation = useMutation({
    mutationFn: () => removeFromRelease(backlogItem.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backlogItems'] });
      toast({
        title: 'Success',
        description: 'Backlog item removed from release',
      });
    }
  });

  const handleReleaseChange = (releaseId: string) => {
    if (!releaseId) {
      removeMutation.mutate();
    } else {
      assignMutation.mutate(releaseId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'blocked':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'deferred':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{backlogItem.title}</h1>
          <div className="text-sm text-muted-foreground">
            {backlogItem.id} • Created {format(new Date(backlogItem.createdAt), 'PPP')}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <EditIcon className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Badge className={getStatusColor(backlogItem.status)}>
                {backlogItem.status.charAt(0).toUpperCase() + backlogItem.status.slice(1).replace('-', ' ')}
              </Badge>
              <Badge className={getPriorityColor(backlogItem.priority)}>
                {backlogItem.priority.charAt(0).toUpperCase() + backlogItem.priority.slice(1)} Priority
              </Badge>
              <Badge variant="outline">
                {backlogItem.type.charAt(0).toUpperCase() + backlogItem.type.slice(1).replace('-', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {backlogItem.assignee && (
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Assigned to: {backlogItem.assignee}</span>
                </div>
              )}
              {backlogItem.storyPoints !== undefined && (
                <div className="flex items-center">
                  <TagIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Story Points: {backlogItem.storyPoints}</span>
                </div>
              )}
              {backlogItem.dueDate && (
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Due: {format(new Date(backlogItem.dueDate), 'PPP')}</span>
                </div>
              )}
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Last Updated: {format(new Date(backlogItem.updatedAt), 'PPP')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Release</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              onValueChange={handleReleaseChange}
              defaultValue={backlogItem.releaseId || ''}
              disabled={assignMutation.isPending || removeMutation.isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Not assigned to any release" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Not Assigned</SelectItem>
                {releases.map((rel) => (
                  <SelectItem key={rel.id} value={rel.id}>
                    {rel.title} ({rel.version})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {release && (
              <p className="mt-2 text-sm">
                Current Release: {release.title} ({release.version})
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{backlogItem.description}</p>
        </CardContent>
      </Card>

      {backlogItem.labels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Labels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {backlogItem.labels.map((label) => (
                <Badge key={label} variant="secondary">{label}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {backlogItem.relatedItemId && (
        <Card>
          <CardHeader>
            <CardTitle>Related {backlogItem.relatedItemType}</CardTitle>
            <CardDescription>
              This backlog item is linked to a {backlogItem.relatedItemType}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              View {backlogItem.relatedItemType}: {backlogItem.relatedItemId}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BacklogItemDetail;
