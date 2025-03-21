
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { getReleases } from '@/utils/api/release';
import { toast } from 'sonner';

// Import refactored components
import ItemHeaderWithStatus from './detail/ItemHeaderWithStatus';
import BacklogItemDetailTabs from './BacklogItemDetailTabs';
import BacklogItemTabContent from './detail/BacklogItemTabContent';
import { useBacklogItemHandlers } from './detail/useBacklogItemHandlers';

interface BacklogItemDetailProps {
  item: BacklogItem;
  onEdit: (item: BacklogItem) => void;
  onDelete?: (id: string) => void;
  onUpdate?: (updatedItem: BacklogItem) => void;
}

const BacklogItemDetail: React.FC<BacklogItemDetailProps> = ({ 
  item, 
  onEdit, 
  onDelete,
  onUpdate
}) => {
  const [releaseName, setReleaseName] = useState<string>('None');
  const [activeTab, setActiveTab] = useState<string>('details');
  
  const { 
    attachments,
    comments,
    history,
    watchers,
    availableUsers,
    isCurrentUserWatching,
    commentsCount,
    attachmentsCount,
    watchersCount,
    isDone,
    handleAddAttachment,
    handleDeleteAttachment,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    handleToggleWatch,
    handleAddWatcher,
    handleRemoveWatcher
  } = useBacklogItemHandlers({ item, onUpdate });
  
  // Get release name
  useEffect(() => {
    const fetchReleaseName = async () => {
      if (item.releaseId) {
        try {
          const releasesResponse = await getReleases();
          const release = releasesResponse.data?.find(r => r.id === item.releaseId);
          if (release) {
            setReleaseName(release.title);
          }
        } catch (error) {
          console.error('Error fetching release:', error);
        }
      }
    };

    fetchReleaseName();
  }, [item.releaseId]);

  return (
    <Card className="w-full shadow-sm">
      <ItemHeaderWithStatus item={item} />
      
      <CardContent className="pt-4">
        <Tabs value={activeTab} defaultValue="details" className="w-full">
          <BacklogItemDetailTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            attachmentsCount={attachmentsCount}
            commentsCount={commentsCount}
            watchersCount={watchersCount}
            isDone={isDone}
          />
          
          <BacklogItemTabContent 
            activeTab={activeTab}
            item={item}
            releaseName={releaseName}
            attachments={attachments}
            comments={comments}
            watchers={watchers}
            history={history}
            isCurrentUserWatching={isCurrentUserWatching}
            availableUsers={availableUsers}
            onAddAttachment={handleAddAttachment}
            onDeleteAttachment={onUpdate ? handleDeleteAttachment : undefined}
            onAddComment={handleAddComment}
            onEditComment={onUpdate ? handleEditComment : undefined}
            onDeleteComment={onUpdate ? handleDeleteComment : undefined}
            onToggleWatch={handleToggleWatch}
            onAddWatcher={handleAddWatcher}
            onRemoveWatcher={handleRemoveWatcher}
          />
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={() => onEdit(item)}>Edit</Button>
        {onDelete && (
          <Button variant="destructive" onClick={() => onDelete(item.id)}>Delete</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BacklogItemDetail;
