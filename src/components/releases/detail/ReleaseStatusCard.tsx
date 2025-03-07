
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStatusColor, getApprovalStatusColor, getTypeColor } from '../utils/releaseHelpers';

interface ReleaseStatusCardProps {
  status: string;
  approvalStatus: string;
  type: string;
}

const ReleaseStatusCard: React.FC<ReleaseStatusCardProps> = ({
  status,
  approvalStatus,
  type
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
          <Badge className={getApprovalStatusColor(approvalStatus)}>
            Approval: {approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}
          </Badge>
          <Badge className={getTypeColor(type)}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Release
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseStatusCard;
