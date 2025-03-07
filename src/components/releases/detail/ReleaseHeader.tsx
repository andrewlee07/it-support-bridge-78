
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Check, X, ShieldCheck, ShieldX, Shield } from 'lucide-react';
import { useTestReleaseCoverage } from '@/hooks/useTestReleaseCoverage';

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
  const { testCoverage } = useTestReleaseCoverage(id);
  
  const getApprovalBadge = () => {
    switch (approvalStatus) {
      case 'approved':
        return (
          <Badge variant="default" className="bg-green-500">
            <Check className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="default" className="bg-red-500">
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="bg-yellow-500">
            Pending Approval
          </Badge>
        );
    }
  };
  
  const getReadinessBadge = () => {
    if (!testCoverage) return null;
    
    switch (testCoverage.readiness) {
      case 'go':
        return (
          <Badge className="bg-green-500 ml-2">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Ready for Release
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-yellow-500 ml-2">
            <Shield className="h-3 w-3 mr-1" />
            Caution
          </Badge>
        );
      case 'no-go':
        return (
          <Badge className="bg-red-500 ml-2">
            <ShieldX className="h-3 w-3 mr-1" />
            Not Ready
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <div className="flex items-center mb-1">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center">
          <p className="text-muted-foreground">Version: {version}</p>
          <div className="ml-4 flex items-center space-x-2">
            {getApprovalBadge()}
            {getReadinessBadge()}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4 md:mt-0">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        
        {canApprove && approvalStatus === 'pending' && (
          <>
            <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700" onClick={onReject}>
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReleaseHeader;
