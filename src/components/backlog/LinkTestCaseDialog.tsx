
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the correct props interface
export interface LinkTestCaseDialogProps {
  backlogItemId: string;
  open: boolean; // Changed from isOpen to open for consistency with Dialog
  onClose: () => void;
}

const LinkTestCaseDialog: React.FC<LinkTestCaseDialogProps> = ({
  backlogItemId,
  open, // Changed from isOpen to open
  onClose
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Link Test Cases</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-gray-500">
            Functionality to link test cases to backlog item {backlogItemId} goes here.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkTestCaseDialog;
