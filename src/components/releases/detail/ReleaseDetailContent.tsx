
import React from 'react';
import { Release } from '@/utils/types/release';
import ReleaseDetail from '@/components/releases/ReleaseDetail';
import ReleaseDetailBacklogItems from '@/components/releases/ReleaseDetailBacklogItems';
import { BacklogItem } from '@/utils/types/backlogTypes';

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
      
      <ReleaseDetailBacklogItems 
        releaseId={releaseId} 
        onAddItems={onAddItem}
        onViewItem={onViewBacklogItem}
      />
    </>
  );
};

export default ReleaseDetailContent;
