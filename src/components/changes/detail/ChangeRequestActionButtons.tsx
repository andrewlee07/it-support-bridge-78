
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, X, Check } from 'lucide-react';

interface ChangeRequestActionButtonsProps {
  canEdit: boolean;
  canReject: boolean;
  canApprove: boolean;
  onEdit?: () => void;
  onReject?: () => void;
  onApprove?: () => void;
}

const ChangeRequestActionButtons: React.FC<ChangeRequestActionButtonsProps> = ({
  canEdit,
  canReject,
  canApprove,
  onEdit,
  onReject,
  onApprove
}) => {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {canEdit && onEdit && (
        <Button variant="outline" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      )}
      
      {canReject && onReject && (
        <Button variant="outline" onClick={onReject}>
          <X className="h-4 w-4 mr-2" />
          Reject
        </Button>
      )}
      
      {canApprove && onApprove && (
        <Button onClick={onApprove}>
          <Check className="h-4 w-4 mr-2" />
          Approve
        </Button>
      )}
    </div>
  );
};

export default ChangeRequestActionButtons;
