
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChangeRequest } from '@/utils/types/change';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import RiskAssessmentDetails from '../RiskAssessmentDetails';
import ChangeRequestBadges from './ChangeRequestBadges';
import ChangeRequestMetadata from './ChangeRequestMetadata';
import ChangeRequestDescription from './ChangeRequestDescription';
import ChangeRequestApprovals from './ChangeRequestApprovals';
import ChangeRequestActionButtons from './ChangeRequestActionButtons';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, XCircle } from 'lucide-react';

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
  const [showRiskDetails, setShowRiskDetails] = useState(true); // Default to showing risk details
  const navigate = useNavigate();
  
  const canApprove = hasPermission(['admin', 'change-manager']) && 
                     changeRequest.status === 'submitted' &&
                     changeRequest.createdBy !== user?.id &&
                     changeRequest.assessmentAnswers &&
                     changeRequest.assessmentAnswers.length > 0; // Can only approve with completed risk assessment
  
  const canReject = hasPermission(['admin', 'change-manager']) && 
                    changeRequest.status === 'submitted';
  
  const canEdit = (changeRequest.createdBy === user?.id && changeRequest.status === 'draft') ||
                  hasPermission(['admin', 'it']);

  const canUpdateStatus = hasPermission(['admin', 'it', 'change-manager']) || 
                          changeRequest.createdBy === user?.id;
                          
  const canCloseChange = changeRequest.status === 'in-progress' &&
                         (changeRequest.createdBy === user?.id || 
                          hasPermission(['admin', 'it', 'change-manager']));

  const handleStatusChange = (newStatus: string) => {
    // Check if we're trying to submit without a risk assessment
    if (newStatus === 'submitted' && 
        (!changeRequest.assessmentAnswers || changeRequest.assessmentAnswers.length === 0)) {
      toast.error('Risk assessment must be completed before submitting for approval.');
      return;
    }
    
    if (onUpdateStatus) {
      onUpdateStatus(newStatus);
    }
  };
  
  const handleCloseChange = () => {
    navigate(`/changes/${changeRequest.id}/close`);
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
        
        {showRiskDetails && changeRequest.assessmentAnswers && changeRequest.assessmentAnswers.length > 0 && (
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="text-lg font-medium mb-3">Risk Assessment Details</h3>
            <RiskAssessmentDetails answers={changeRequest.assessmentAnswers} />
          </div>
        )}
        
        {(!changeRequest.assessmentAnswers || changeRequest.assessmentAnswers.length === 0) && (
          <div className="border border-yellow-300 rounded-md p-4 bg-yellow-50 text-yellow-800">
            <h3 className="text-md font-medium mb-2 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              Risk Assessment Required
            </h3>
            <p className="text-sm">
              A risk assessment must be completed before this change can be submitted for approval.
            </p>
            {canEdit && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={() => navigate(`/changes/${changeRequest.id}/edit`)}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Complete Risk Assessment
              </Button>
            )}
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
        
        {changeRequest.closureReason && (
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3">Closure Information</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Outcome:</span>
                <span className="ml-2 text-sm">
                  {changeRequest.closureReason.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
              {changeRequest.closureNotes && (
                <div>
                  <span className="text-sm font-medium">Notes:</span>
                  <p className="mt-1 text-sm">{changeRequest.closureNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div>
          {canCloseChange && (
            <Button 
              variant="outline" 
              onClick={handleCloseChange}
            >
              Close Change
            </Button>
          )}
        </div>
        <ChangeRequestActionButtons 
          canEdit={canEdit}
          canReject={canReject}
          canApprove={canApprove}
          onEdit={onEdit}
          onReject={onReject}
          onApprove={onApprove}
        />
      </CardFooter>
    </Card>
  );
};

export default ChangeRequestContent;
