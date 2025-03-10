import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ChangeRequest } from '@/utils/types/change';
import { useAuth } from '@/contexts/AuthContext';
import RiskAssessmentDetails from '../RiskAssessmentDetails';
import ChangeRequestBadges from './ChangeRequestBadges';
import ChangeRequestMetadata from './ChangeRequestMetadata';
import ChangeRequestDescription from './ChangeRequestDescription';
import ChangeRequestApprovals from './ChangeRequestApprovals';
import ChangeRequestActionButtons from './ChangeRequestActionButtons';
import ChangeRequestClosureDetails from './ChangeRequestClosureDetails';

export interface ChangeRequestContentProps {
  changeRequest: ChangeRequest;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onUpdateStatus?: (status: string, closureReason?: string) => void;
  onAddImplementor?: (userId: string) => void;
  onAddApprover?: (userId: string, role: string) => void;
  onClose?: () => void;
}

const ChangeRequestContent: React.FC<ChangeRequestContentProps> = ({
  changeRequest,
  onApprove,
  onReject,
  onEdit,
  onUpdateStatus,
  onAddImplementor,
  onAddApprover,
  onClose
}) => {
  const { user, hasPermission } = useAuth();
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  
  const canApprove = hasPermission(['admin', 'change-manager']) && 
                     changeRequest.status === 'submitted' &&
                     changeRequest.createdBy !== user?.id;
  
  const canReject = hasPermission(['admin', 'change-manager']) && 
                    changeRequest.status === 'submitted';
  
  const canEdit = (changeRequest.createdBy === user?.id && changeRequest.status === 'draft') ||
                  hasPermission(['admin', 'it']);

  const canClose = (changeRequest.createdBy === user?.id || 
                   hasPermission(['admin', 'it', 'change-manager'])) && 
                   changeRequest.status === 'in-progress';

  const canUpdateStatus = hasPermission(['admin', 'it', 'change-manager']) || 
                          changeRequest.createdBy === user?.id;

  const handleStatusChange = (newStatus: string, closureReason?: string) => {
    if (onUpdateStatus) {
      onUpdateStatus(newStatus, closureReason);
    }
  };

  const showRiskAssessment = changeRequest.riskScore > 0 && 
                            changeRequest.assessmentAnswers && 
                            changeRequest.assessmentAnswers.length > 0;

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
            closureReason={changeRequest.closureReason}
            canUpdateStatus={canUpdateStatus}
            onStatusChange={handleStatusChange}
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
        
        {changeRequest.status === 'completed' && (
          <ChangeRequestClosureDetails 
            closureReason={changeRequest.closureReason}
            closedAt={changeRequest.updatedAt}
          />
        )}
        
        {showRiskAssessment && (
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="text-lg font-medium mb-3">Risk Assessment Details</h3>
            <RiskAssessmentDetails 
              answers={changeRequest.assessmentAnswers || []}
              riskScore={changeRequest.riskScore}
              riskLevel={changeRequest.riskLevel}
            />
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
          canClose={canClose}
          onEdit={onEdit}
          onReject={onReject}
          onApprove={onApprove}
          onClose={onClose}
        />
      </CardFooter>
    </Card>
  );
};

export default ChangeRequestContent;
