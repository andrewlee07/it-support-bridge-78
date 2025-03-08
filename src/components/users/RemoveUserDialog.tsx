
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RemoveUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRemoveUser: () => void;
}

const RemoveUserDialog: React.FC<RemoveUserDialogProps> = ({
  open,
  onOpenChange,
  onRemoveUser
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove User</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={onRemoveUser}
          >
            Remove User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveUserDialog;
