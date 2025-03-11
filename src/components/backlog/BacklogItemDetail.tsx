
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BacklogItem, Attachment, Comment, BacklogItemComment } from '@/utils/types/backlogTypes';
import { format } from 'date-fns';
import { getReleases } from '@/utils/api/release';
import { Paperclip, MessageSquare, History, Users, Clock } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Import refactored components
import AttachmentList from './attachments/AttachmentList';
import AttachmentUpload from './attachments/AttachmentUpload';
import CommentsList from './comments/CommentsList';
import HistoryList from './history/HistoryList';
import WatchersList from './watchers/WatchersList';
import BacklogItemBasicDetails from './detail/BacklogItemBasicDetails';
import ItemHeaderWithStatus from './detail/ItemHeaderWithStatus';

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
  
  // States for each feature
  const [attachments, setAttachments] = useState<Attachment[]>(mapBacklogAttachmentsToAttachments(item.attachments || []));
  const [comments, setComments] = useState<Comment[]>(mapBacklogCommentsToComments(item.comments || []));
  const [history, setHistory] = useState(item.history || []);
  const [watchers, setWatchers] = useState(item.watchers || []);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);

  // Function to convert BacklogItemAttachment to Attachment
  function mapBacklogAttachmentsToAttachments(backlogAttachments: BacklogItemAttachment[]): Attachment[] {
    return backlogAttachments.map(att => ({
      id: att.id,
      filename: att.filename || att.fileName || '',
      fileUrl: att.fileUrl || att.url || '',
      fileType: 'unknown', // Default value as it's not in the old type
      fileSize: 0, // Default value as it's not in the old type
      uploadedBy: att.uploadedBy,
      uploadedAt: att.uploadedAt,
      // Backward compatibility fields
      fileName: att.filename || att.fileName,
      name: att.filename || att.fileName,
      url: att.fileUrl || att.url
    }));
  }

  // Function to convert BacklogItemComment to Comment
  function mapBacklogCommentsToComments(backlogComments: BacklogItemComment[]): Comment[] {
    return backlogComments.map(comment => ({
      id: comment.id,
      content: comment.content || comment.text || '',
      text: comment.text || comment.content || '',
      author: comment.author,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      parentId: comment.parentId
    }));
  }

  // Function to convert Comments back to BacklogItemComments
  function mapCommentsToBacklogComments(comments: Comment[]): BacklogItemComment[] {
    return comments.map(comment => ({
      id: comment.id,
      text: comment.text || comment.content || '',
      content: comment.content || comment.text || '',
      author: comment.author,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      parentId: comment.parentId
    }));
  }
  
  // Get release name and available users
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

    const getUsers = async () => {
      try {
        const { getAllUsers } = await import('@/utils/mockData/users');
        const users = await getAllUsers();
        setAvailableUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchReleaseName();
    getUsers();
    
    // Update component state when the item prop changes
    setAttachments(mapBacklogAttachmentsToAttachments(item.attachments || []));
    setComments(mapBacklogCommentsToComments(item.comments || []));
    setHistory(item.history || []);
    setWatchers(item.watchers || []);
  }, [item]);

  // Handlers for attachments
  const handleAddAttachment = (attachment: Attachment) => {
    const updatedAttachments = [...attachments, attachment];
    setAttachments(updatedAttachments);
    updateItemWithHistory('attachments', `${attachments.length} files`, `${updatedAttachments.length} files`);
    setActiveTab('attachments');
  };
  
  const handleDeleteAttachment = (id: string) => {
    const deletedAttachment = attachments.find(a => a.id === id);
    const updatedAttachments = attachments.filter(a => a.id !== id);
    setAttachments(updatedAttachments);
    
    updateItemWithHistory(
      'attachments', 
      `Attachment: ${deletedAttachment?.filename || 'file'}`, 
      'Removed'
    );
    toast.success('Attachment deleted');
  };
  
  // Handlers for comments
  const handleAddComment = (content: string, parentId?: string) => {
    if (!item.creator) return;
    
    const { user } = require('@/contexts/AuthContext');
    const newComment: Comment = {
      id: uuidv4(),
      content,
      text: content, // Set both for compatibility
      author: user?.id,
      createdAt: new Date(),
      parentId
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    
    if (onUpdate) {
      const updatedItem = {
        ...item,
        comments: mapCommentsToBacklogComments(updatedComments),
        updatedAt: new Date()
      };
      
      onUpdate(updatedItem);
      toast.success(parentId ? 'Reply added' : 'Comment added');
    }
  };
  
  const handleEditComment = (id: string, content: string) => {
    const updatedComments = comments.map(comment => 
      comment.id === id 
        ? { ...comment, content, text: content, updatedAt: new Date() } 
        : comment
    );
    
    setComments(updatedComments);
    updateItem({ comments: mapCommentsToBacklogComments(updatedComments) });
    toast.success('Comment updated');
  };
  
  const handleDeleteComment = (id: string) => {
    const updatedComments = comments.filter(
      comment => comment.id !== id && comment.parentId !== id
    );
    
    setComments(updatedComments);
    updateItem({ comments: mapCommentsToBacklogComments(updatedComments) });
    toast.success('Comment deleted');
  };
  
  // Handlers for watchers
  const handleToggleWatch = (isWatching: boolean) => {
    const { user } = require('@/contexts/AuthContext');
    if (!user) return;
    
    let updatedWatchers;
    
    if (isWatching) {
      updatedWatchers = [...watchers, user.id];
    } else {
      updatedWatchers = watchers.filter(id => id !== user.id);
    }
    
    setWatchers(updatedWatchers);
    updateItemWithHistory(
      'watchers',
      isWatching ? 'Not watching' : 'Watching',
      isWatching ? 'Watching' : 'Not watching'
    );
    
    toast.success(isWatching ? 'Now watching this item' : 'No longer watching this item');
  };
  
  const handleAddWatcher = (userId: string) => {
    if (watchers.includes(userId)) return;
    
    const updatedWatchers = [...watchers, userId];
    setWatchers(updatedWatchers);
    
    updateItemWithHistory('watchers', watchers.length.toString(), updatedWatchers.length.toString());
    toast.success('Watcher added');
  };
  
  const handleRemoveWatcher = (userId: string) => {
    const updatedWatchers = watchers.filter(id => id !== userId);
    setWatchers(updatedWatchers);
    
    updateItemWithHistory('watchers', watchers.length.toString(), updatedWatchers.length.toString());
    toast.success('Watcher removed');
  };
  
  // Helper functions
  const updateItem = (partialUpdate: Partial<BacklogItem>) => {
    if (onUpdate) {
      const updatedItem = {
        ...item,
        ...partialUpdate,
        updatedAt: new Date()
      };
      
      onUpdate(updatedItem);
    }
  };
  
  const updateItemWithHistory = (field: string, previousValue: any, newValue: any) => {
    const { user } = require('@/contexts/AuthContext');
    if (!user || !onUpdate) return;
    
    const historyEntry = {
      id: uuidv4(),
      field,
      previousValue,
      newValue,
      changedBy: user.id,
      changedAt: new Date()
    };
    
    const updatedHistory = [...history, historyEntry];
    setHistory(updatedHistory);
    
    const updates: Partial<BacklogItem> = {
      history: updatedHistory,
      updatedAt: new Date()
    };
    
    if (field === 'watchers') {
      updates.watchers = watchers;
    } else if (field === 'attachments') {
      // Convert Attachment[] back to BacklogItemAttachment[]
      const backlogAttachments = attachments.map(att => ({
        id: att.id,
        filename: att.filename || att.fileName || '',
        url: att.fileUrl || att.url || '',
        uploadedBy: att.uploadedBy,
        uploadedAt: att.uploadedAt
      }));
      updates.attachments = backlogAttachments;
    }
    
    updateItem(updates);
  };
  
  // Check if current user is watching
  const { useAuth } = require('@/contexts/AuthContext');
  const { user } = useAuth();
  const isCurrentUserWatching = user ? watchers.includes(user.id) : false;
  
  // Counters for badges
  const commentsCount = comments.length;
  const attachmentsCount = attachments.length;
  const watchersCount = watchers.length;

  return (
    <Card className="w-full shadow-sm">
      <ItemHeaderWithStatus item={item} />
      
      <CardContent className="pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mt-2 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="attachments" className="flex items-center gap-1">
              <Paperclip className="h-4 w-4" />
              Attachments
              {attachmentsCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
                  {attachmentsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Comments
              {commentsCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
                  {commentsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-1" />
              History
            </TabsTrigger>
            <TabsTrigger value="watchers" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Watchers
              {watchersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
                  {watchersCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="m-0">
            <BacklogItemBasicDetails 
              item={item}
              releaseName={releaseName}
            />
          </TabsContent>
          
          <TabsContent value="attachments" className="m-0">
            <div className="space-y-4">
              <AttachmentUpload onUpload={handleAddAttachment} />
              <AttachmentList 
                attachments={attachments} 
                onDelete={onUpdate ? handleDeleteAttachment : undefined} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="m-0">
            <CommentsList 
              comments={comments}
              onAddComment={handleAddComment}
              onEditComment={onUpdate ? handleEditComment : undefined}
              onDeleteComment={onUpdate ? handleDeleteComment : undefined}
            />
          </TabsContent>
          
          <TabsContent value="history" className="m-0">
            <HistoryList history={history} />
          </TabsContent>
          
          <TabsContent value="watchers" className="m-0">
            <WatchersList 
              watcherIds={watchers}
              onToggleWatch={handleToggleWatch}
              onAddWatcher={handleAddWatcher}
              onRemoveWatcher={handleRemoveWatcher}
              isCurrentUserWatching={isCurrentUserWatching}
              availableUsers={availableUsers}
            />
          </TabsContent>
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
