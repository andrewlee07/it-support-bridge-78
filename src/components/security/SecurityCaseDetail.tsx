
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { X, ExternalLink, AlertCircle, ClipboardList, Bug } from 'lucide-react';
import { getUserNameById } from '@/utils/userUtils';
import { Link } from 'react-router-dom';
import CreateRelatedItemsCard from '@/components/tickets/detail/CreateRelatedItemsCard';

export interface SecurityCaseDetailProps {
  securityCase: {
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    priority: string;
    reportedBy: string;
    reportedAt: string;
    affectedSystems: string[];
    investigationSteps: { date: string; text: string }[];
    impactedUsers: number;
    remediationPlan: string;
  };
  open?: boolean;
  onClose?: () => void;
  isInline?: boolean;
}

const SecurityCaseDetail: React.FC<SecurityCaseDetailProps> = ({ 
  securityCase, 
  open = false, 
  onClose = () => {}, 
  isInline = false 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Resolved': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const detailContent = (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{securityCase.title}</h3>
          <p className="text-sm text-muted-foreground">
            <Link to={`/security/case/${securityCase.id}`} className="text-blue-600 hover:underline font-mono">
              {securityCase.id}
            </Link>
          </p>
          <p className="text-sm text-muted-foreground mt-2">{securityCase.description}</p>
        </div>
        <Badge className={getStatusColor(securityCase.status)}>
          {securityCase.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Reported By</h4>
            <p>{getUserNameById(securityCase.reportedBy)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Reported On</h4>
            <p>{formatDate(securityCase.reportedAt)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Impacted Users</h4>
            <p>{securityCase.impactedUsers}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Affected Systems</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {securityCase.affectedSystems.map(system => (
                <Badge key={system} variant="outline" className="bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100">
                  {system}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Related Items */}
      {!isInline && (
        <CreateRelatedItemsCard 
          sourceId={securityCase.id}
          sourceType="security-case"
        />
      )}
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Investigation Steps</h4>
        <div className="space-y-2 border rounded-md p-3 bg-muted/30">
          {securityCase.investigationSteps.map((step, index) => (
            <div key={index} className="flex gap-2">
              <div className="text-xs text-muted-foreground w-24 flex-shrink-0">
                {formatDate(step.date)}
              </div>
              <div className="text-sm">{step.text}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Remediation Plan</h4>
        <p className="text-sm">{securityCase.remediationPlan}</p>
      </div>
    </div>
  );

  if (isInline) {
    return detailContent;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Security Case: {securityCase.id}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            Viewing detailed information about this security case
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {detailContent}
        <div className="mt-4 text-right">
          <Link to={`/security/case/${securityCase.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <span>View Full Details</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityCaseDetail;
