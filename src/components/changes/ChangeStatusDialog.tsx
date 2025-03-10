
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.value === currentStatus}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
