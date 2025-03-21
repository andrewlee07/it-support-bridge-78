
import React, { useState, useEffect } from 'react';
import { Release } from '@/utils/types/release';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStatusSynchronization } from '@/hooks/useStatusSynchronization';
import { toast } from 'sonner';
import ReleaseHeader from '../detail/ReleaseHeader';
import ReleaseStatusCard from '../detail/ReleaseStatusCard';
import ReleaseDetailsCard from '../detail/ReleaseDetailsCard';
import ReleaseActionsCard from '../detail/ReleaseActionsCard';
import ReleaseDescriptionCard from '../detail/ReleaseDescriptionCard';
import ReleaseItems from '../detail/ReleaseItems';
import ReleaseActivityLog from '../detail/ReleaseActivityLog';
import ReleaseTestsTab from '../test-integration/ReleaseTestsTab';
import ReleaseTabs from './ReleaseTabs';

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
  const [activeTab, setActiveTab] = useState('details');
  const isDeployed = release.status === 'Deployed' || release.status === 'Cancelled';

  // Handle tab actions
  useEffect(() => {
    if (activeTab === 'edit') {
      onEdit();
      setActiveTab('details');
    } else if (activeTab === 'add-items') {
      onAddItem();
      setActiveTab('details');
    }
  }, [activeTab, onEdit, onAddItem]);
  
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
      <Card className="p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center mb-1">
              <h1 className="text-2xl font-bold">{release.title}</h1>
            </div>
            <div className="flex items-center">
              <p className="text-muted-foreground">Version: {release.version}</p>
              <div className="ml-4 flex items-center space-x-2">
                {/* Approval status badge */}
                {release.approvalStatus === 'approved' && (
                  <Badge variant="default" className="bg-green-500">
                    Approved
                  </Badge>
                )}
                {release.approvalStatus === 'rejected' && (
                  <Badge variant="default" className="bg-red-500">
                    Rejected
                  </Badge>
                )}
                {release.approvalStatus === 'pending' && (
                  <Badge variant="default" className="bg-yellow-500">
                    Pending Approval
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {canApprove && release.approvalStatus === 'pending' && (
              <>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
                  Approve
                </Button>
                <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700" onClick={onReject}>
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            onChangeStatus={handleStatusChangeWithSync}
          />
        </div>

        {settings.enableCascadingUpdates && (
          <div className="my-2 p-2 rounded-md bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800 flex items-center mb-6">
            <Badge variant="outline" className="mr-2 bg-blue-100 dark:bg-blue-900">Sync</Badge>
            <span className="text-sm">
              Status synchronization is active. When release status changes, linked items will be updated.
            </span>
          </div>
        )}

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ReleaseTabs 
            activeTab={activeTab}
            isDeployed={isDeployed}
          />
          
          {/* Tab Content */}
          <TabsContent value="details" className="mt-0">
            <ReleaseDescriptionCard description={release.description} />
          </TabsContent>
          
          <TabsContent value="items" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Release Items</CardTitle>
              </CardHeader>
              <CardContent>
                <ReleaseItems 
                  items={release.items}
                  onAddItem={onAddItem}
                  onRemoveItem={onRemoveItem}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <ReleaseActivityLog auditEntries={release.audit} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tests" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Test Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ReleaseTestsTab releaseId={releaseId} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ReleaseDetailContent;
