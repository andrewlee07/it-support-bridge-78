
import React, { useEffect } from 'react';
import { Release } from '@/utils/types/release';
import ReleaseDetail from '@/components/releases/ReleaseDetail';
import ReleaseDetailBacklogItems from '@/components/releases/ReleaseDetailBacklogItems';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReleaseTestsTab from '../test-integration/ReleaseTestsTab';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface ReleaseDetailContentProps {
  releaseId: string;
  release: Release;
  isLoading: boolean;
  isPending: boolean;
  canApprove: boolean;
  onEdit: () => void;
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onChangeStatus: (status: string) => void;
  onViewBacklogItem: (item: BacklogItem) => void;
}

const ReleaseDetailContent: React.FC<ReleaseDetailContentProps> = ({
  releaseId,
  release,
  isLoading,
  isPending,
  canApprove,
  onEdit,
  onAddItem,
  onRemoveItem,
  onApprove,
  onReject,
  onChangeStatus,
  onViewBacklogItem
}) => {
  const { settings, handleStatusChange } = useStatusSynchronization();
  
  // Handle status changes with synchronization
  const handleStatusChangeWithSync = async (status: string) => {
    // First call the parent handler to update the release
    onChangeStatus(status);
    
    // Then trigger synchronization if enabled
    if (settings.enableCascadingUpdates) {
      try {
        const result = await handleStatusChange(releaseId, status);
        if (result.updatedItems > 0 && settings.notifyOnStatusChange) {
          toast.info(
            <div className="flex flex-col space-y-1">
              <span>Status synchronization applied</span>
              <span className="text-xs text-muted-foreground">
                {result.updatedItems} item{result.updatedItems !== 1 ? 's' : ''} updated
              </span>
            </div>
          );
        }
      } catch (error) {
        console.error('Failed to synchronize status:', error);
      }
    }
  };
  
  return (
    <>
      <ReleaseDetail
        release={release}
        onEdit={onEdit}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        onApprove={onApprove}
        onReject={onReject}
        onChangeStatus={handleStatusChangeWithSync}
        isLoading={isPending}
        canApprove={canApprove}
      />
      
      {settings.enableCascadingUpdates && (
        <div className="my-2 p-2 rounded-md bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800 flex items-center">
          <Badge variant="outline" className="mr-2 bg-blue-100 dark:bg-blue-900">Sync</Badge>
          <span className="text-sm">
            Status synchronization is active. When release status changes, linked items will be updated.
          </span>
        </div>
      )}
      
      <Tabs defaultValue="backlog" className="mt-6">
        <TabsList>
          <TabsTrigger value="backlog">Backlog Items</TabsTrigger>
          <TabsTrigger value="tests">Test Management</TabsTrigger>
        </TabsList>
        <TabsContent value="backlog" className="mt-4">
          <ReleaseDetailBacklogItems 
            releaseId={releaseId} 
            onAddItems={onAddItem}
            onViewItem={onViewBacklogItem}
          />
        </TabsContent>
        <TabsContent value="tests" className="mt-4">
          <ReleaseTestsTab releaseId={releaseId} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ReleaseDetailContent;
