import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select as ClosureSelect,
  SelectContent as ClosureSelectContent,
  SelectItem as ClosureSelectItem,
  SelectTrigger as ClosureSelectTrigger,
  SelectValue as ClosureSelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RiskLevel, ChangeStatus } from '@/utils/types/change';

interface ChangeRequestBadgesProps {
  status: ChangeStatus;
  riskLevel: RiskLevel;
  canUpdateStatus: boolean;
  onStatusChange?: (status: string) => void;
}

const ChangeRequestBadges: React.FC<ChangeRequestBadgesProps> = ({
  status,
  riskLevel,
  canUpdateStatus,
  onStatusChange
}) => {
  const [showClosureDialog, setShowClosureDialog] = useState(false);
  const [selectedClosureReason, setSelectedClosureReason] = useState<string>('');

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === 'completed') {
      setShowClosureDialog(true);
    } else {
      onStatusChange?.(newStatus);
    }
  };

  const handleClosureSubmit = () => {
    if (selectedClosureReason) {
      onStatusChange?.('completed');
      setShowClosureDialog(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };
  
  const getRiskLevelColor = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {canUpdateStatus ? (
          <Select defaultValue={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <Badge className={getStatusColor(status)}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )}
        <Badge className={getRiskLevelColor(riskLevel)}>
          {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
        </Badge>
      </div>

      <Dialog open={showClosureDialog} onOpenChange={setShowClosureDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Closure</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ClosureSelect onValueChange={setSelectedClosureReason} value={selectedClosureReason}>
              <ClosureSelectTrigger className="w-full">
                <ClosureSelectValue placeholder="Select closure reason" />
              </ClosureSelectTrigger>
              <ClosureSelectContent>
                <ClosureSelectItem value="successful">Successful</ClosureSelectItem>
                <ClosureSelectItem value="successful-with-issues">Successful with Issues</ClosureSelectItem>
                <ClosureSelectItem value="rolled-back">Rolled Back</ClosureSelectItem>
                <ClosureSelectItem value="failed">Failed</ClosureSelectItem>
              </ClosureSelectContent>
            </ClosureSelect>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClosureDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleClosureSubmit} disabled={!selectedClosureReason}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeRequestBadges;
