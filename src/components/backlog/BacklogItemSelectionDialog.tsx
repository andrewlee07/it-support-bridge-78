
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { Input } from '@/components/ui/input';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BacklogItemSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectItems: (items: BacklogItem[]) => Promise<void>;
  releaseId: string;
}

const BacklogItemSelectionDialog: React.FC<BacklogItemSelectionDialogProps> = ({
  open,
  onOpenChange,
  onSelectItems,
  releaseId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unassigned backlog items
  const { data: unassignedItemsResponse, isLoading } = useQuery({
    queryKey: ['backlogItems', 'unassigned', searchQuery],
    queryFn: () => fetchBacklogItems('unassigned', undefined, searchQuery),
    enabled: open, // Only fetch when dialog is open
  });

  const unassignedItems = unassignedItemsResponse?.data || [];

  const toggleSelection = (itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleSelectAll = () => {
    const allSelected = unassignedItems.every(item => selectedItems[item.id]);
    
    if (allSelected) {
      setSelectedItems({});
    } else {
      const newSelection = unassignedItems.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      setSelectedItems(newSelection);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const selectedBacklogItems = unassignedItems.filter(
        item => selectedItems[item.id]
      );
      
      await onSelectItems(selectedBacklogItems);
      setSelectedItems({});
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add items to release:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Backlog Items to Release</DialogTitle>
          <DialogDescription>
            Select backlog items to assign to this release.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            placeholder="Search backlog items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          
          {isLoading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : unassignedItems.length === 0 ? (
            <div className="text-center py-12 border rounded-md">
              <p className="text-muted-foreground">
                No unassigned backlog items found
              </p>
            </div>
          ) : (
            <ScrollArea className="h-96 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          unassignedItems.length > 0 &&
                          unassignedItems.every(item => selectedItems[item.id])
                        }
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unassignedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems[item.id] || false}
                          onCheckedChange={() => toggleSelection(item.id)}
                          aria-label={`Select ${item.title}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.storyPoints || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={
              isSubmitting || 
              Object.keys(selectedItems).length === 0 ||
              !Object.values(selectedItems).some(selected => selected)
            }
          >
            {isSubmitting ? 'Adding...' : 'Add Selected Items'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BacklogItemSelectionDialog;
