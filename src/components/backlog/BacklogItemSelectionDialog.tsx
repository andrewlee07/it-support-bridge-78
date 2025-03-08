
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BacklogItem, BacklogItemStatus } from '@/utils/types/backlogTypes';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface BacklogItemSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectItems: (items: BacklogItem[]) => Promise<void>;
  releaseId?: string;
}

const BacklogItemSelectionDialog: React.FC<BacklogItemSelectionDialogProps> = ({
  open,
  onOpenChange,
  onSelectItems,
  releaseId
}) => {
  const [selectedItems, setSelectedItems] = useState<BacklogItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch unassigned backlog items - using array of statuses to fix type error
  const { data: unassignedItemsResponse, isLoading } = useQuery({
    queryKey: ['unassignedBacklogItems', releaseId],
    queryFn: () => fetchBacklogItems('', ['open', 'ready'] as BacklogItemStatus[]),
    enabled: open,
  });

  const unassignedItems = (unassignedItemsResponse?.data || unassignedItemsResponse?.items || [])
    .filter(item => !item.releaseId || item.releaseId !== releaseId);

  const handleItemToggle = (item: BacklogItem) => {
    setSelectedItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) return;

    setIsSubmitting(true);
    try {
      await onSelectItems(selectedItems);
      setSelectedItems([]);
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning items to release:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Backlog Items to Release</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center">Loading available backlog items...</div>
        ) : unassignedItems.length === 0 ? (
          <div className="py-8 text-center">No available backlog items to add</div>
        ) : (
          <>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {unassignedItems.map(item => (
                  <div 
                    key={item.id} 
                    className="flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/30 transition-colors"
                  >
                    <Checkbox 
                      id={`item-${item.id}`}
                      checked={selectedItems.some(i => i.id === item.id)}
                      onCheckedChange={() => handleItemToggle(item)}
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`item-${item.id}`}
                        className="text-sm font-medium cursor-pointer hover:underline"
                      >
                        {item.title}
                      </label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge 
                          className="text-xs"
                          variant={item.priority === 'critical' ? 'destructive' : 'outline'}
                        >
                          {item.priority}
                        </Badge>
                        {item.storyPoints && (
                          <Badge variant="secondary" className="text-xs">
                            {item.storyPoints} points
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={selectedItems.length === 0 || isSubmitting}
              >
                {isSubmitting ? 'Adding...' : `Add ${selectedItems.length} Items`}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BacklogItemSelectionDialog;
