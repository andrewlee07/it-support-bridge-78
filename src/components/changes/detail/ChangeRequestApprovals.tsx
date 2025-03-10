
import React from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';
import ApproversList from '../ApproversList';
import { getUserById } from '@/utils/mockData';
import { ApproverRole } from '@/utils/types/change';

interface ChangeRequestApprovalsProps {
  approvedBy?: string;
  approvedAt?: Date;
  approverRoles?: ApproverRole[];
  onAddApprover?: (userId: string, role: string) => void;
}

const ChangeRequestApprovals: React.FC<ChangeRequestApprovalsProps> = ({
  approvedBy,
  approvedAt,
  approverRoles = [],
  onAddApprover
}) => {
  const approvedByUser = approvedBy ? getUserById(approvedBy) : null;

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-lg font-medium mb-3">Approvals</h3>
      {approvedByUser ? (
        <div className="flex items-center gap-3 p-3 border rounded">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-green-100 text-green-800 text-xs">
              {approvedByUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Approved by {approvedByUser.name}</span>
            </div>
            {approvedAt && (
              <div className="text-xs text-muted-foreground">
                {format(new Date(approvedAt), 'MMM d, yyyy HH:mm')}
              </div>
            )}
          </div>
        </div>
      ) : (
        <ApproversList 
          approverRoles={approverRoles}
          onAddApprover={onAddApprover}
        />
      )}
    </div>
  );
};

export default ChangeRequestApprovals;
