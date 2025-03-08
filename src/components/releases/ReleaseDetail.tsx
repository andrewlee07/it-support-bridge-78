
import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Release } from '@/utils/types';
import ReleaseHeader from './detail/ReleaseHeader';
import ReleaseStatusCard from './detail/ReleaseStatusCard';
import ReleaseDetailsCard from './detail/ReleaseDetailsCard';
import ReleaseActionsCard from './detail/ReleaseActionsCard';
import ReleaseDescriptionCard from './detail/ReleaseDescriptionCard';
import ReleaseItems from './detail/ReleaseItems';
import ReleaseActivityLog from './detail/ReleaseActivityLog';

interface ReleaseDetailProps {
  release: Release;
  onEdit: () => void;
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onChangeStatus: (status: string) => void;
  isLoading: boolean;
  canApprove: boolean;
}

const ReleaseDetail: React.FC<ReleaseDetailProps> = ({
  release,
  onEdit,
  onAddItem,
  onRemoveItem,
  onApprove,
  onReject,
  onChangeStatus,
  isLoading,
  canApprove
}) => {
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-1/4" />
        <div className="h-24 bg-muted rounded w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReleaseHeader 
        id={release.id}
        title={release.title}
        version={release.version}
        onEdit={onEdit}
        onApprove={onApprove}
        onReject={onReject}
        approvalStatus={release.approvalStatus}
        canApprove={canApprove}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReleaseStatusCard 
          status={release.status}
          approvalStatus={release.approvalStatus}
          type={release.type}
        />

        <ReleaseDetailsCard 
          plannedDate={release.plannedDate}
          owner={release.owner}
          createdAt={release.createdAt}
          approvedAt={release.approvedAt}
        />

        <ReleaseActionsCard 
          releaseId={release.id}
          status={release.status}
          onChangeStatus={onChangeStatus}
        />
      </div>

      <ReleaseDescriptionCard description={release.description} />

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Release Items</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="mt-4">
          <ReleaseItems 
            items={release.items}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <ReleaseActivityLog auditEntries={release.audit} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReleaseDetail;
