
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { TestCase, Bug, BugSeverity, BugPriority } from '@/utils/types/testTypes';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { useQuery } from '@tanstack/react-query';
import { 
  createBugFromTestExecution, 
  createBacklogItemFromBug 
} from '@/utils/api/testBacklogIntegrationApi';
import { useToast } from '@/hooks/use-toast';

interface BugCreationDialogProps {
  testCase: TestCase;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (bug: Bug, backlogItem?: BacklogItem) => void;
}

const BugCreationDialog: React.FC<BugCreationDialogProps> = ({
  testCase,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { toast } = useToast();
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<BugSeverity>('medium');
  const [priority, setPriority] = useState<BugPriority>('medium');
  const [createBacklogItem, setCreateBacklogItem] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!description) {
      toast({
        title: "Description required",
        description: "Please provide a description of the bug",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the bug
      const bugResponse = await createBugFromTestExecution(testCase.id, {
        description,
        severity,
        priority
      });
      
      if (!bugResponse.success) {
        throw new Error(bugResponse.error || "Failed to create bug");
      }
      
      const bug = bugResponse.data;
      let backlogItem;
      
      // Create backlog item if requested
      if (createBacklogItem) {
        const backlogResponse = await createBacklogItemFromBug(bug.id);
        
        if (backlogResponse.success) {
          backlogItem = backlogResponse.data;
          toast({
            title: "Bug and backlog item created",
            description: `Bug ${bug.id} and backlog item ${backlogItem.id} created successfully.`,
          });
        } else {
          toast({
            title: "Bug created, backlog item failed",
            description: backlogResponse.error || "Failed to create backlog item",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Bug created",
          description: `Bug ${bug.id} created successfully.`,
        });
      }
      
      if (onSuccess) {
        onSuccess(bug, backlogItem);
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Bug from Test Failure</DialogTitle>
          <DialogDescription>
            Report a bug based on this failed test case and optionally create a backlog item.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="testCase">Test Case</Label>
            <div className="p-3 border rounded-md bg-muted/30">
              <div className="font-medium">{testCase.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{testCase.id}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Bug Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the bug..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select
                value={severity}
                onValueChange={(value) => setSeverity(value as BugSeverity)}
              >
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as BugPriority)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="createBacklogItem"
              checked={createBacklogItem}
              onCheckedChange={(checked) => setCreateBacklogItem(!!checked)}
            />
            <Label htmlFor="createBacklogItem" className="cursor-pointer">
              Automatically create backlog item from this bug
            </Label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Bug"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BugCreationDialog;
