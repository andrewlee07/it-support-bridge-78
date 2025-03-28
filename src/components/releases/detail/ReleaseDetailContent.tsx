
import React, { useState } from 'react';
import { Release } from '@/utils/types/release';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import ReleaseHeader from './ReleaseHeader';
import ReleaseStatusCard from './ReleaseStatusCard';
import ReleaseDetailsCard from './ReleaseDetailsCard';
import ReleaseActionsCard from './ReleaseActionsCard';
import ReleaseDescriptionCard from './ReleaseDescriptionCard';
import ReleaseItems from './ReleaseItems';
import ReleaseActivityLog from './ReleaseActivityLog';
import RelatedItemsCard from '@/components/shared/RelatedItemsCard';

interface ReleaseDetailContentProps {
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

const ReleaseDetailContent: React.FC<ReleaseDetailContentProps> = ({
  release,
  isLoading,
  isPending,
  canApprove,
  releaseId,
  onEdit,
  onAddItem,
  onRemoveItem,
  onApprove,
  onReject,
  onChangeStatus,
  onViewBacklogItem
}) => {
  const [activeTab, setActiveTab] = useState('items');
  
  // In a real application, these would be fetched from an API
  const relatedItems = [
    {
      id: 'BUG-1001',
      title: 'API returns 500 error on large payloads',
      type: 'bug' as const,
      status: 'fixed',
      url: '/bugs/BUG-1001'
    },
    {
      id: 'STORY-201',
      title: 'Add sorting to user table',
      type: 'backlogItem' as const,
      status: 'completed',
      url: '/backlog/STORY-201'
    },
    {
      id: 'TASK-301',
      title: 'Deploy database changes',
      type: 'task' as const,
      status: 'in-progress',
      url: '/tasks/TASK-301'
    }
  ];

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReleaseDescriptionCard description={release.description} />

          <Tabs defaultValue="items" value={activeTab} onValueChange={setActiveTab} className="mt-6">
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
        
        <div>
          <RelatedItemsCard
            items={relatedItems}
            title="Related Work Items"
            description="Bugs, tasks and backlog items in this release"
          />
        </div>
      </div>
    </div>
  );
};

export default ReleaseDetailContent;
