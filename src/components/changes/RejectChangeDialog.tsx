
import React from 'react';
import RejectDialog from './RejectDialog';

interface RejectChangeDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onConfirm: () => void;
}

const RejectChangeDialog: React.FC<RejectChangeDialogProps> = ({
  isOpen,
  setIsOpen,
  rejectionReason,
  setRejectionReason,
  onConfirm,
}) => {
  return (
    <RejectDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      rejectionReason={rejectionReason}
      setRejectionReason={setRejectionReason}
      onConfirm={onConfirm}
    />
  );
};

export default RejectChangeDialog;
