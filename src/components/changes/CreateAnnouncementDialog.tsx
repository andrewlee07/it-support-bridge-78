
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeRequest } from '@/utils/types/change';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CreateAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  changeRequest: ChangeRequest;
  onSuccess?: () => void;
}

const CreateAnnouncementDialog: React.FC<CreateAnnouncementDialogProps> = ({
  open,
  onOpenChange,
  changeRequest,
  onSuccess
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [title, setTitle] = useState(`Change Notification: ${changeRequest.title}`);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a title and content",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Here you would integrate with your announcement API
    // For now, we'll just simulate success
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Announcement has been created and published",
      });
      setIsSubmitting(false);
      onOpenChange(false);
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Announcement from Change</DialogTitle>
          <DialogDescription>
            Create a public announcement based on this change request.
            This will be visible on status pages and notifications.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Announcement Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Announcement Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`A change is scheduled to be implemented (${changeRequest.id}).\n\nDetails: ${changeRequest.description}\n\nImpact: [Describe the impact to users/services]\n\nScheduled Time: ${new Date(changeRequest.startDate).toLocaleString()} to ${new Date(changeRequest.endDate).toLocaleString()}`}
              className="min-h-[150px]"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Announcement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementDialog;
