
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { BacklogItem, Comment, Attachment, HistoryEntry } from '@/utils/types/backlogTypes';

// Import necessary components
import AttachmentList from '../attachments/AttachmentList';
import AttachmentUpload from '../attachments/AttachmentUpload';
import CommentsList from '../comments/CommentsList';
import HistoryList from '../history/HistoryList';
import WatchersList from '../watchers/WatchersList';
import BacklogItemBasicDetails from './BacklogItemBasicDetails';

interface BacklogItemTabContentProps {
  activeTab: string;
  item: BacklogItem;
  releaseName: string;
  attachments: Attachment[];
  comments: Comment[];
  watchers: string[];
  history: HistoryEntry[];
  isCurrentUserWatching: boolean;
  availableUsers: any[];
  onAddAttachment: (attachment: Attachment) => void;
  onDeleteAttachment?: (id: string) => void;
  onAddComment: (content: string, parentId?: string) => void;
  onEditComment?: (id: string, content: string) => void;
  onDeleteComment?: (id: string) => void;
  onToggleWatch: (isWatching: boolean) => void;
  onAddWatcher: (userId: string) => void;
  onRemoveWatcher: (userId: string) => void;
}

const BacklogItemTabContent: React.FC<BacklogItemTabContentProps> = ({
  activeTab,
  item,
  releaseName,
  attachments,
  comments,
  watchers,
  history,
  isCurrentUserWatching,
  availableUsers,
  onAddAttachment,
  onDeleteAttachment,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onToggleWatch,
  onAddWatcher,
  onRemoveWatcher
}) => {
  return (
    <>
      <TabsContent value="details" className="m-0">
        <BacklogItemBasicDetails 
          item={item}
          releaseName={releaseName}
        />
      </TabsContent>
      
      <TabsContent value="attachments" className="m-0">
        <div className="space-y-4">
          <AttachmentUpload onUpload={onAddAttachment} />
          <AttachmentList 
            attachments={attachments} 
            onDelete={onDeleteAttachment} 
          />
        </div>
      </TabsContent>
      
      <TabsContent value="comments" className="m-0">
        <CommentsList 
          comments={comments}
          onAddComment={onAddComment}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
        />
      </TabsContent>
      
      <TabsContent value="history" className="m-0">
        <HistoryList history={history} />
      </TabsContent>
      
      <TabsContent value="watchers" className="m-0">
        <WatchersList 
          watcherIds={watchers}
          onToggleWatch={onToggleWatch}
          onAddWatcher={onAddWatcher}
          onRemoveWatcher={onRemoveWatcher}
          isCurrentUserWatching={isCurrentUserWatching}
          availableUsers={availableUsers}
        />
      </TabsContent>
    </>
  );
};

export default BacklogItemTabContent;
