
import React from 'react';
import { ChangeRequest } from '@/utils/types/change';
import ChangeRequestContent from './detail/ChangeRequestContent';

export interface ChangeRequestDetailProps {
  changeRequest: ChangeRequest;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onUpdateStatus?: (status: string) => void;
  onAddImplementor?: (userId: string) => void;
  onAddApprover?: (userId: string, role: string) => void;
}

const ChangeRequestDetail: React.FC<ChangeRequestDetailProps> = (props) => {
  return <ChangeRequestContent {...props} />;
};

export default ChangeRequestDetail;
