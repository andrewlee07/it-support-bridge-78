
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (itemType: string, itemId: string) => Promise<void>;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({
  isOpen,
  onClose,
  onAddItem
}) => {
  const [itemType, setItemType] = useState<string>('change');
  const [itemId, setItemId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemType || !itemId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onAddItem(itemType, itemId);
      toast({
        title: "Success",
        description: "Item added to release",
      });
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to release",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    setItemType('change');
    setItemId('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item to Release</DialogTitle>
          <DialogDescription>
            Add a change request, incident, or asset to this release.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemType">Item Type</Label>
            <Select 
              value={itemType} 
              onValueChange={setItemType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select item type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="change">Change Request</SelectItem>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="asset">Asset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="itemId">Item ID</Label>
            <Input 
              id="itemId" 
              placeholder={`Enter ${itemType} ID...`}
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
