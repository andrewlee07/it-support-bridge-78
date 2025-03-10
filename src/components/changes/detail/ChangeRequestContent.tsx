
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ChangeRequest } from '@/utils/types/change';
import { useAuth } from '@/contexts/AuthContext';
import ChangeStatusDialog from '../ChangeStatusDialog';
import RiskAssessmentDetails from '../RiskAssessmentDetails';
import ChangeRequestBadges from './ChangeRequestBadges';
import ChangeRequestMetadata from './ChangeRequestMetadata';
import ChangeRequestDescription from './ChangeRequestDescription';
import ChangeRequestApprovals from './ChangeRequestApprovals';
import ChangeRequestActionButtons from './ChangeRequestActionButtons';

export interface ChangeRequestContentProps {
  changeRequest: ChangeRequest;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onUpdateStatus?: (status: string) => void;
  onAddImplementor?: (userId: string) => void;
  onAddApprover?: (userId: string, role: string) => void;
}

const ChangeRequestContent: React.FC<ChangeRequestContentProps> = ({
  changeRequest,
  onApprove,
  onReject,
  onEdit,
  onUpdateStatus,
  onAddImplementor,
  onAddApprover
}) => {
  const { user, hasPermission } = useAuth();
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  
  const canApprove = hasPermission(['admin', 'change-manager']) && 
                     changeRequest.status === 'submitted' &&
                     changeRequest.createdBy !== user?.id;
  
  const canReject = hasPermission(['admin', 'change-manager']) && 
                    changeRequest.status === 'submitted';
  
  const canEdit = (changeRequest.createdBy === user?.id && changeRequest.status === 'draft') ||
                  hasPermission(['admin', 'it']);

  const canUpdateStatus = hasPermission(['admin', 'it', 'change-manager']) || 
                          changeRequest.createdBy === user?.id;

  const handleStatusChange = (newStatus: string) => {
    if (onUpdateStatus) {
      onUpdateStatus(newStatus);
      setIsStatusDialogOpen(false);
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{changeRequest.title}</CardTitle>
            <CardDescription>
              <div className="mt-1 flex items-center gap-2">
                <span>{changeRequest.id}</span>
                <span>•</span>
                <span>{new Date(changeRequest.createdAt).toLocaleDateString()}</span>
              </div>
            </CardDescription>
          </div>
          <ChangeRequestBadges 
            status={changeRequest.status}
            riskLevel={changeRequest.riskLevel}
            canUpdateStatus={canUpdateStatus}
            onStatusDialogOpen={() => setIsStatusDialogOpen(true)}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ChangeRequestMetadata 
          startDate={changeRequest.startDate}
          endDate={changeRequest.endDate}
          riskScore={changeRequest.riskScore}
          riskLevel={changeRequest.riskLevel}
          createdBy={changeRequest.createdBy}
          implementor={changeRequest.implementor}
          onRiskDetailsToggle={() => setShowRiskDetails(!showRiskDetails)}
          showRiskDetails={showRiskDetails}
          onAddImplementor={onAddImplementor}
        />
        
        {showRiskDetails && changeRequest.assessmentAnswers && changeRequest.assessmentAnswers.length > 0 && (
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="text-lg font-medium mb-3">Risk Assessment Details</h3>
            <RiskAssessmentDetails answers={changeRequest.assessmentAnswers} />
          </div>
        )}
        
        <ChangeRequestDescription 
          description={changeRequest.description}
          implementationPlan={changeRequest.implementationPlan}
          rollbackPlan={changeRequest.rollbackPlan}
        />
        
        <ChangeRequestApprovals 
          approvedBy={changeRequest.approvedBy}
          approvedAt={changeRequest.approvedAt}
          approverRoles={changeRequest.approverRoles}
          onAddApprover={onAddApprover}
        />
      </CardContent>
      
      <CardFooter>
        <ChangeRequestActionButtons 
          canEdit={canEdit}
          canReject={canReject}
          canApprove={canApprove}
          onEdit={onEdit}
          onReject={onReject}
          onApprove={onApprove}
        />
      </CardFooter>

      <ChangeStatusDialog
        isOpen={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        currentStatus={changeRequest.status}
        onStatusChange={handleStatusChange}
      />
    </Card>
  );
};

export default ChangeRequestContent;
