
import React from 'react';
import ActionButton from '@/components/shared/ActionButton';
import { Edit, X, Check, CheckSquare } from 'lucide-react';

interface ChangeRequestActionButtonsProps {
  canEdit: boolean;
  canReject: boolean;
  canApprove: boolean;
  canClose?: boolean;
  onEdit?: () => void;
  onReject?: () => void;
  onApprove?: () => void;
  onClose?: () => void;
  changeId: string;
}

const ChangeRequestActionButtons: React.FC<ChangeRequestActionButtonsProps> = ({
  canEdit,
  canReject,
  canApprove,
  canClose,
  onEdit,
  onReject,
  onApprove,
  onClose,
  changeId
}) => {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {canEdit && onEdit && (
        <ActionButton 
          action={{ 
            type: 'function',
            handler: onEdit,
            errorMessage: 'Failed to enter edit mode'
          }}
          variant="outline"
          icon={Edit}
        >
          Edit
        </ActionButton>
      )}
      
      {canReject && onReject && (
        <ActionButton 
          action={{ 
            type: 'function',
            handler: onReject,
            errorMessage: 'Failed to reject the change request'
          }}
          variant="outline"
          icon={X}
        >
          Reject
        </ActionButton>
      )}
      
      {canApprove && onApprove && (
        <ActionButton 
          action={{ 
            type: 'function',
            handler: onApprove,
            successMessage: 'Change request approved successfully',
            errorMessage: 'Failed to approve the change request'
          }}
          icon={Check}
        >
          Approve
        </ActionButton>
      )}

      {canClose && onClose && (
        <ActionButton 
          action={{ 
            type: 'function',
            handler: onClose,
            successMessage: 'Change request closed successfully',
            errorMessage: 'Failed to close the change request'
          }}
          variant="secondary"
          icon={CheckSquare}
        >
          Close Change
        </ActionButton>
      )}
    </div>
  );
};

export default ChangeRequestActionButtons;
