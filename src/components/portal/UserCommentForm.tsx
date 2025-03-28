
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserCommentFormProps {
  ticketId: string;
  onAddComment: (ticketId: string, comment: string) => void;
  placeholder?: string;
}

const UserCommentForm: React.FC<UserCommentFormProps> = ({ 
  ticketId, 
  onAddComment,
  placeholder = "Add a comment..."
}) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an async call
    setTimeout(() => {
      onAddComment(ticketId, comment);
      setComment('');
      setIsSubmitting(false);
      
      toast({
        title: "Comment added",
        description: "Your comment has been successfully added."
      });
    }, 500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={placeholder}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-24 resize-none"
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!comment.trim() || isSubmitting}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Send Comment"}
        </Button>
      </div>
    </form>
  );
};

export default UserCommentForm;
