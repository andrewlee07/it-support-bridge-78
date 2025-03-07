
import React, { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RejectReleaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title?: string;
}

const RejectReleaseDialog: React.FC<RejectReleaseDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Reject Release'
}) => {
  const [reason, setReason] = useState('');
  
  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
    onClose();
  };
  
  const handleCancel = () => {
    setReason('');
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The release will be marked as rejected 
            and the release owner will be notified.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <Label htmlFor="reason">Rejection Reason</Label>
          <Textarea
            id="reason"
            placeholder="Please provide a reason for rejection..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2"
            rows={3}
          />
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            Reject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RejectReleaseDialog;
