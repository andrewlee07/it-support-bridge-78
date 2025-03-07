
import React from 'react';
import { Release } from '@/utils/types/release';
import ReleaseDetail from '@/components/releases/ReleaseDetail';
import ReleaseDetailBacklogItems from '@/components/releases/ReleaseDetailBacklogItems';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReleaseTestsTab from '../test-integration/ReleaseTestsTab';

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
  return (
    <>
      <ReleaseDetail
        release={release}
        onEdit={onEdit}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        onApprove={onApprove}
        onReject={onReject}
        onChangeStatus={onChangeStatus}
        isLoading={isPending}
        canApprove={canApprove}
      />
      
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
