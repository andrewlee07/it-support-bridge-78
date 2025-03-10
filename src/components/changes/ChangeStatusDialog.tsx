
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChangeStatus } from '@/utils/types/change';

interface ChangeStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

const ChangeStatusDialog: React.FC<ChangeStatusDialogProps> = ({
  isOpen,
  onOpenChange,
  currentStatus,
  onStatusChange
}) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string>(currentStatus);

  // Reset selected status when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedStatus(currentStatus);
    }
  }, [isOpen, currentStatus]);

  const statusOptions: { value: ChangeStatus; label: string }[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'approved', label: 'Approved' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleSubmit = () => {
    onStatusChange(selectedStatus);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Change Status</DialogTitle>
          <DialogDescription>
            Select the new status for this change request
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            value={selectedStatus} 
            onValueChange={setSelectedStatus}
            className="space-y-3"
          >
            {statusOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={option.value}
                  disabled={option.value === currentStatus}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatusDialog;
