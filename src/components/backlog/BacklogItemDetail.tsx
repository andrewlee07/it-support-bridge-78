
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BacklogItem, Attachment, Comment, HistoryEntry } from '@/utils/types/backlogTypes';
import { format } from 'date-fns';
import { getReleases } from '@/utils/api/release/releaseQueries';
import { Paperclip, MessageSquare, History, Users, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createAuditEntry } from '@/utils/auditUtils';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { getAllUsers } from '@/utils/mockData/users';

// Import our new components
import AttachmentList from './attachments/AttachmentList';
import AttachmentUpload from './attachments/AttachmentUpload';
import CommentsList from './comments/CommentsList';
import HistoryList from './history/HistoryList';
import WatchersList from './watchers/WatchersList';

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
  const { user } = useAuth();
  const [releaseName, setReleaseName] = useState<string>('None');
  const [activeTab, setActiveTab] = useState<string>('details');
  
  // States for each feature
  const [attachments, setAttachments] = useState<Attachment[]>(item.attachments || []);
  const [comments, setComments] = useState<Comment[]>(item.comments || []);
  const [history, setHistory] = useState<HistoryEntry[]>(item.history || []);
  const [watchers, setWatchers] = useState<string[]>(item.watchers || []);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  
  // Check if current user is watching
  const isCurrentUserWatching = user ? watchers.includes(user.id) : false;

  useEffect(() => {
    // If the item has a releaseId, fetch the release name
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

    // Get available users for watchers
    const getUsers = async () => {
      try {
        const users = await getAllUsers();
        setAvailableUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchReleaseName();
    getUsers();
    
    // Update component state when the item prop changes
    setAttachments(item.attachments || []);
    setComments(item.comments || []);
    setHistory(item.history || []);
    setWatchers(item.watchers || []);
  }, [item]);

  const handleAddAttachment = (attachment: Attachment) => {
    const updatedAttachments = [...attachments, attachment];
    setAttachments(updatedAttachments);
    
    // Update the backlog item
    if (onUpdate && user) {
      const updatedItem = {
        ...item,
        attachments: updatedAttachments,
        updatedAt: new Date()
      };
      
      // Add history entry
      const historyEntry: HistoryEntry = {
        id: uuidv4(),
        field: 'attachments',
        previousValue: `${attachments.length} files`,
        newValue: `${updatedAttachments.length} files`,
        changedBy: user.id,
        changedAt: new Date()
      };
      
      const updatedHistory = [...history, historyEntry];
      updatedItem.history = updatedHistory;
      
      onUpdate(updatedItem);
      setActiveTab('attachments');
    }
  };
  
  const handleDeleteAttachment = (id: string) => {
    const updatedAttachments = attachments.filter(a => a.id !== id);
    setAttachments(updatedAttachments);
    
    // Update the backlog item
    if (onUpdate && user) {
      const deletedAttachment = attachments.find(a => a.id === id);
      
      const updatedItem = {
        ...item,
        attachments: updatedAttachments,
        updatedAt: new Date()
      };
      
      // Add history entry
      const historyEntry: HistoryEntry = {
        id: uuidv4(),
        field: 'attachments',
        previousValue: `Attachment: ${deletedAttachment?.fileName || 'file'}`,
        newValue: 'Removed',
        changedBy: user.id,
        changedAt: new Date()
      };
      
      const updatedHistory = [...history, historyEntry];
      updatedItem.history = updatedHistory;
      
      onUpdate(updatedItem);
      toast.success('Attachment deleted');
    }
  };
  
  const handleAddComment = (content: string, parentId?: string) => {
    if (!user) return;
    
    const newComment: Comment = {
      id: uuidv4(),
      content,
      author: user.id,
      createdAt: new Date(),
      parentId
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    
    // Update the backlog item
    if (onUpdate) {
      const updatedItem = {
        ...item,
        comments: updatedComments,
        updatedAt: new Date()
      };
      
      onUpdate(updatedItem);
      toast.success(parentId ? 'Reply added' : 'Comment added');
    }
  };
  
  const handleEditComment = (id: string, content: string) => {
    const updatedComments = comments.map(comment => 
      comment.id === id 
        ? { ...comment, content, updatedAt: new Date() } 
        : comment
    );
    
    setComments(updatedComments);
    
    // Update the backlog item
    if (onUpdate) {
      const updatedItem = {
        ...item,
        comments: updatedComments,
        updatedAt: new Date()
      };
      
      onUpdate(updatedItem);
      toast.success('Comment updated');
    }
  };
  
  const handleDeleteComment = (id: string) => {
    // Filter out the deleted comment and any replies to it
    const updatedComments = comments.filter(
      comment => comment.id !== id && comment.parentId !== id
    );
    
    setComments(updatedComments);
    
    // Update the backlog item
    if (onUpdate) {
      const updatedItem = {
        ...item,
        comments: updatedComments,
        updatedAt: new Date()
      };
      
      onUpdate(updatedItem);
      toast.success('Comment deleted');
    }
  };
  
  const handleToggleWatch = (isWatching: boolean) => {
    if (!user) return;
    
    let updatedWatchers: string[];
    
    if (isWatching) {
      updatedWatchers = [...watchers, user.id];
    } else {
      updatedWatchers = watchers.filter(id => id !== user.id);
    }
    
    setWatchers(updatedWatchers);
    
    // Update the backlog item
    if (onUpdate) {
      const updatedItem = {
        ...item,
        watchers: updatedWatchers,
        updatedAt: new Date()
      };
      
      // Add history entry
      const historyEntry: HistoryEntry = {
        id: uuidv4(),
        field: 'watchers',
        previousValue: isWatching ? 'Not watching' : 'Watching',
        newValue: isWatching ? 'Watching' : 'Not watching',
        changedBy: user.id,
        changedAt: new Date()
      };
      
      const updatedHistory = [...history, historyEntry];
      updatedItem.history = updatedHistory;
      
      onUpdate(updatedItem);
      toast.success(isWatching ? 'Now watching this item' : 'No longer watching this item');
    }
  };
  
  const handleAddWatcher = (userId: string) => {
    if (watchers.includes(userId)) return;
    
    const updatedWatchers = [...watchers, userId];
    setWatchers(updatedWatchers);
    
    // Update the backlog item
    if (onUpdate && user) {
      const updatedItem = {
        ...item,
        watchers: updatedWatchers,
        updatedAt: new Date()
      };
      
      // Add history entry if the current user made the change
      const historyEntry: HistoryEntry = {
        id: uuidv4(),
        field: 'watchers',
        previousValue: watchers.length.toString(),
        newValue: updatedWatchers.length.toString(),
        changedBy: user.id,
        changedAt: new Date()
      };
      
      const updatedHistory = [...history, historyEntry];
      updatedItem.history = updatedHistory;
      
      onUpdate(updatedItem);
      toast.success('Watcher added');
    }
  };
  
  const handleRemoveWatcher = (userId: string) => {
    const updatedWatchers = watchers.filter(id => id !== userId);
    setWatchers(updatedWatchers);
    
    // Update the backlog item
    if (onUpdate && user) {
      const updatedItem = {
        ...item,
        watchers: updatedWatchers,
        updatedAt: new Date()
      };
      
      // Add history entry
      const historyEntry: HistoryEntry = {
        id: uuidv4(),
        field: 'watchers',
        previousValue: watchers.length.toString(),
        newValue: updatedWatchers.length.toString(),
        changedBy: user.id,
        changedAt: new Date()
      };
      
      const updatedHistory = [...history, historyEntry];
      updatedItem.history = updatedHistory;
      
      onUpdate(updatedItem);
      toast.success('Watcher removed');
    }
  };
  
  const commentsCount = comments.length;
  const attachmentsCount = attachments.length;
  const watchersCount = watchers.length;

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
          <div className="flex space-x-2">
            <Badge variant={item.priority === 'critical' ? 'destructive' : 
                          item.priority === 'high' ? 'default' : 
                          item.priority === 'medium' ? 'secondary' : 'outline'}>
              {item.priority}
            </Badge>
            <Badge variant="outline">{item.type}</Badge>
            <Badge variant={
              item.status === 'completed' ? 'default' : 
              item.status === 'in-progress' ? 'secondary' : 
              item.status === 'blocked' ? 'destructive' : 'outline'
            }>
              {item.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold text-muted-foreground mb-1">Assignee</p>
                <p>{item.assignee || 'Unassigned'}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground mb-1">Release</p>
                <p>{releaseName}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground mb-1">Story Points</p>
                <p>{item.storyPoints || 'Not estimated'}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground mb-1">Due Date</p>
                <p>{item.dueDate ? format(new Date(item.dueDate), 'MMM d, yyyy') : 'No due date'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="font-semibold text-muted-foreground mb-1">Description</p>
              <p className="whitespace-pre-line">{item.description}</p>
            </div>
            
            {item.labels && item.labels.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-muted-foreground mb-1">Labels</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.labels.map((label, index) => (
                    <Badge key={index} variant="outline">{label}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Created: {format(new Date(item.createdAt), 'MMM d, yyyy')}</span>
              <span>•</span>
              <span>Last updated: {format(new Date(item.updatedAt), 'MMM d, yyyy')}</span>
            </div>
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
