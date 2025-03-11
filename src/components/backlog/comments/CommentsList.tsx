
import React, { useState } from 'react';
import { Comment } from '@/utils/types/backlogTypes';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { Reply, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { getUserById } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface CommentsListProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
  onEditComment?: (id: string, content: string) => void;
  onDeleteComment?: (id: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment
}) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    onAddComment(newComment, replyToId || undefined);
    setNewComment('');
    setReplyToId(null);
  };
  
  const handleStartEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content || comment.text || '');
  };
  
  const handleSaveEdit = (id: string) => {
    if (!editContent.trim() || !onEditComment) return;
    
    onEditComment(id, editContent);
    setEditingId(null);
    setEditContent('');
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };
  
  // Filter top-level comments (those without parent)
  const topLevelComments = comments.filter(c => !c.parentId);
  
  const renderCommentItem = (comment: Comment, isReply = false) => {
    const author = getUserById(comment.author);
    const isCurrentUser = user && author && user.id === author.id;
    
    // Find replies to this comment
    const replies = comments.filter(c => c.parentId === comment.id);
    
    return (
      <div 
        key={comment.id} 
        className={`pt-4 ${isReply ? 'pl-8 border-l' : 'border-t first:border-t-0'}`}
      >
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {author?.name.split(' ').map(n => n[0]).join('') || '?'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{author?.name || 'Unknown User'}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              
              {isCurrentUser && (
                <div className="flex items-center gap-1">
                  {onEditComment && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => handleStartEdit(comment)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  
                  {onDeleteComment && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => onDeleteComment(comment.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            {editingId === comment.id ? (
              <div className="mt-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleSaveEdit(comment.id)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm mt-1">{comment.content || comment.text}</p>
                
                <div className="mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-3.5 w-3.5 mr-1" />
                    Reply
                  </Button>
                </div>
                
                {replyToId === comment.id && (
                  <div className="mt-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setReplyToId(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleAddComment}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Render replies */}
        {replies.length > 0 && (
          <div className="mt-2">
            {replies.map(reply => renderCommentItem(reply, true))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      {topLevelComments.length === 0 && !replyToId && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="mx-auto h-8 w-8 opacity-50 mb-2" />
          <p>No comments yet</p>
        </div>
      )}
      
      {/* Comment form (only show if not replying to a specific comment) */}
      {!replyToId && (
        <div className="flex gap-3 pb-4">
          {user && (
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-end mt-2">
              <Button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Comments list */}
      <div className="space-y-2">
        {topLevelComments.map(comment => renderCommentItem(comment))}
      </div>
    </div>
  );
};

export default CommentsList;
