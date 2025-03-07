
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, CheckCircle, XCircle, Package, Tag } from 'lucide-react';

interface ReleaseHeaderProps {
  id: string;
  title: string;
  version: string;
  onEdit: () => void;
  onApprove: () => void;
  onReject: () => void;
  approvalStatus: string;
  canApprove: boolean;
}

const ReleaseHeader: React.FC<ReleaseHeaderProps> = ({
  id,
  title,
  version,
  onEdit,
  onApprove,
  onReject,
  approvalStatus,
  canApprove
}) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <Package className="mr-2 h-6 w-6 text-primary" />
          {title}
        </h1>
        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
          <span>{id}</span>
          <span>•</span>
          <Tag className="h-4 w-4" />
          <span>{version}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        {approvalStatus === 'pending' && canApprove && (
          <>
            <Button variant="outline" size="sm" onClick={onReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button size="sm" onClick={onApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReleaseHeader;
