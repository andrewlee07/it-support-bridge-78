
import React, { useState } from 'react';
import { Release } from '@/utils/types/release';
import { BacklogItem } from '@/utils/types/backlogTypes';
import ReleaseDetailContent from './detail/ReleaseDetailContent';

interface ReleaseDetailViewProps {
  release: Release;
  isLoading: boolean;
  isPending: boolean;
  canApprove: boolean;
  releaseId: string;
  onEdit: () => void;
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onChangeStatus: (status: string) => void;
  onViewBacklogItem: (item: BacklogItem) => void;
}

const ReleaseDetailView: React.FC<ReleaseDetailViewProps> = (props) => {
  return <ReleaseDetailContent {...props} />;
};

export default ReleaseDetailView;
