
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { calculateReleaseCapacity } from '@/utils/types/backlogTypes';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ClipboardListIcon, 
  PlusCircleIcon,
  TagIcon,
  ChevronRightIcon
} from 'lucide-react';

interface ReleaseDetailBacklogItemsProps {
  releaseId: string;
  onAddItems: () => void;
  onViewItem: (backlogItem: BacklogItem) => void;
}

const ReleaseDetailBacklogItems: React.FC<ReleaseDetailBacklogItemsProps> = ({
  releaseId,
  onAddItems,
  onViewItem
}) => {
  // Fetch backlog items for this release
  const { data: backlogItemsResponse, isLoading } = useQuery({
    queryKey: ['backlogItems', releaseId],
    queryFn: () => fetchBacklogItems(releaseId),
  });

  const backlogItems = backlogItemsResponse?.data || [];
  
  // Calculate capacity metrics
  const targetCapacity = 100; // This could be configurable per release
  const totalPoints = backlogItems.reduce((sum, item) => sum + (item.storyPoints || 0), 0);
  const capacityPercentage = calculateReleaseCapacity(backlogItems, targetCapacity);
  
  // Count items by status
  const statusCounts = backlogItems.reduce((counts, item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const completedItems = statusCounts['completed'] || 0;
  const totalItems = backlogItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Helper function for status badge color
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Backlog Items</CardTitle>
            <CardDescription>
              Work items assigned to this release
            </CardDescription>
          </div>
          <Button size="sm" onClick={onAddItems}>
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            Add Items
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Release Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span>{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {completedItems} of {totalItems} items completed
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Capacity Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Capacity</span>
                  <span>{capacityPercentage}%</span>
                </div>
                <Progress 
                  value={capacityPercentage} 
                  className={`h-2 ${capacityPercentage > 90 ? 'bg-red-600' : ''}`}
                />
                <div className="text-sm text-muted-foreground flex items-center">
                  <TagIcon className="h-4 w-4 mr-1" />
                  {totalPoints} story points allocated
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : backlogItems.length === 0 ? (
          <div className="text-center py-12 border rounded-md">
            <ClipboardListIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No backlog items assigned</h3>
            <p className="text-muted-foreground mb-4">
              Assign backlog items to this release to track progress
            </p>
            <Button variant="outline" onClick={onAddItems}>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add Backlog Items
            </Button>
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Story Points</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backlogItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.storyPoints || 0}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onViewItem(item)}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseDetailBacklogItems;
