
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BacklogItem, 
  Attachment, 
  Comment,
  HistoryEntry
} from '@/utils/types/backlogTypes';
import { 
  mapBacklogAttachmentsToAttachments, 
  mapAttachmentsToBacklogAttachments, 
  mapBacklogCommentsToComments,
  mapCommentsToBacklogComments
} from '@/utils/backlog/itemDetailUtils';

interface UseBacklogItemHandlersProps {
  item: BacklogItem;
  onUpdate?: (updatedItem: BacklogItem) => void;
}

export const useBacklogItemHandlers = ({ item, onUpdate }: UseBacklogItemHandlersProps) => {
  const { user } = useAuth();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [watchers, setWatchers] = useState<string[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  
  useEffect(() => {
    // Update component state when the item prop changes
    setAttachments(mapBacklogAttachmentsToAttachments(item.attachments || []));
    setComments(mapBacklogCommentsToComments(item.comments || []));
    setHistory(item.history || []);
    setWatchers(item.watchers || []);
    
    // Fetch available users
    const getUsers = async () => {
      try {
        const { getAllUsers } = await import('@/utils/mockData/users');
        const users = await getAllUsers();
        setAvailableUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    getUsers();
  }, [item]);
  
  // Handlers for attachments
  const handleAddAttachment = (attachment: Attachment) => {
    const updatedAttachments = [...attachments, attachment];
    setAttachments(updatedAttachments);
    updateItemWithHistory('attachments', `${attachments.length} files`, `${updatedAttachments.length} files`);
    toast.success('Attachment added');
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
    if (!user) return;
    
    const newComment: Comment = {
      id: uuidv4(),
      content: content,
      text: content, // Set both for compatibility
      author: user.id,
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
      updates.attachments = mapAttachmentsToBacklogAttachments(attachments);
    }
    
    updateItem(updates);
  };
  
  // Check if current user is watching
  const isCurrentUserWatching = user ? watchers.includes(user.id) : false;
  
  // Counters for badges
  const commentsCount = comments.length;
  const attachmentsCount = attachments.length;
  const watchersCount = watchers.length;
  
  // Check if item is in a completed state
  const isDone = item.status === 'completed' || item.status === 'deferred';

  return {
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
  };
};
