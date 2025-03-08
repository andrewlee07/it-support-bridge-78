import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { calculateReleaseCapacity } from '@/utils/types/backlogTypes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import BacklogItemsProgressCard from './backlog/BacklogItemsProgressCard';
import BacklogCapacityCard from './backlog/BacklogCapacityCard';
import BacklogItemsTable from './backlog/BacklogItemsTable';
import BacklogEmptyState from './backlog/BacklogEmptyState';
import BacklogLoadingState from './backlog/BacklogLoadingState';

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
    queryFn: () => fetchBacklogItems(releaseId as any),
  });

  const backlogItems = backlogItemsResponse?.data || backlogItemsResponse?.items || [];
  
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
          <BacklogItemsProgressCard
            backlogItems={backlogItems}
            totalItems={totalItems}
            completedItems={completedItems}
            progressPercentage={progressPercentage}
          />
          
          <BacklogCapacityCard
            capacityPercentage={capacityPercentage}
            totalPoints={totalPoints}
          />
        </div>

        {isLoading ? (
          <BacklogLoadingState />
        ) : backlogItems.length === 0 ? (
          <BacklogEmptyState onAddItems={onAddItems} />
        ) : (
          <BacklogItemsTable 
            backlogItems={backlogItems} 
            onViewItem={onViewItem} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseDetailBacklogItems;
