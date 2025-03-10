
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { 
  CalendarDays, 
  Clock, 
  AlertTriangle, 
  User, 
  CheckCircle, 
  Edit, 
  UserPlus,
  Check,
  X,
  ChevronDown
} from 'lucide-react';
import { ChangeRequest, RiskLevel } from '@/utils/types';
import { getUserById } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import ChangeStatusDialog from './ChangeStatusDialog';
import RiskAssessmentDetails from './RiskAssessmentDetails';
import ApproversList from './ApproversList';

export interface ChangeRequestDetailProps {
  changeRequest: ChangeRequest;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onUpdateStatus?: (status: string) => void;
  onAddImplementor?: (userId: string) => void;
  onAddApprover?: (userId: string, role: string) => void;
}

const ChangeRequestDetail: React.FC<ChangeRequestDetailProps> = ({
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };
  
  const getRiskLevelColor = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };
  
  const createdBy = getUserById(changeRequest.createdBy);
  const assignedTo = changeRequest.assignedTo ? getUserById(changeRequest.assignedTo) : null;
  const approvedBy = changeRequest.approvedBy ? getUserById(changeRequest.approvedBy) : null;
  const implementor = changeRequest.implementor ? getUserById(changeRequest.implementor) : null;
  
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
                <span>{format(new Date(changeRequest.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {canUpdateStatus && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Badge className={getStatusColor(changeRequest.status)}>
                      {changeRequest.status.charAt(0).toUpperCase() + changeRequest.status.slice(1)}
                    </Badge>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsStatusDialogOpen(true)}>
                    Update Status
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!canUpdateStatus && (
              <Badge className={getStatusColor(changeRequest.status)}>
                {changeRequest.status.charAt(0).toUpperCase() + changeRequest.status.slice(1)}
              </Badge>
            )}
            <Badge className={getRiskLevelColor(changeRequest.riskLevel)}>
              {changeRequest.riskLevel.charAt(0).toUpperCase() + changeRequest.riskLevel.slice(1)} Risk
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Implementation Period</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(changeRequest.startDate), 'MMM d')} - {format(new Date(changeRequest.endDate), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div>
                <div className="text-sm font-medium">Risk Score</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  {changeRequest.riskScore} ({changeRequest.riskLevel.charAt(0).toUpperCase() + changeRequest.riskLevel.slice(1)})
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 p-1" 
                onClick={() => setShowRiskDetails(!showRiskDetails)}
              >
                {showRiskDetails ? 'Hide Details' : 'View Details'}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Created By</div>
              <div className="text-sm text-muted-foreground">
                {createdBy?.name || 'Unknown'}
              </div>
            </div>
          </div>

          {implementor ? (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Implementor</div>
                <div className="text-sm text-muted-foreground">
                  {implementor.name}
                </div>
              </div>
            </div>
          ) : (
            onAddImplementor && (
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-muted-foreground" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onAddImplementor('user-1')} // This would normally open a user selection dialog
                >
                  Add Implementor
                </Button>
              </div>
            )
          )}
        </div>
        
        {showRiskDetails && changeRequest.assessmentAnswers && changeRequest.assessmentAnswers.length > 0 && (
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="text-lg font-medium mb-3">Risk Assessment Details</h3>
            <RiskAssessmentDetails answers={changeRequest.assessmentAnswers} />
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-sm">{changeRequest.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Implementation Plan</h3>
            <p className="text-sm">{changeRequest.implementationPlan}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Rollback Plan</h3>
            <p className="text-sm">{changeRequest.rollbackPlan}</p>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-3">Approvals</h3>
          {approvedBy ? (
            <div className="flex items-center gap-3 p-3 border rounded">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-green-100 text-green-800 text-xs">
                  {approvedBy.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Approved by {approvedBy.name}</span>
                </div>
                {changeRequest.approvedAt && (
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(changeRequest.approvedAt), 'MMM d, yyyy HH:mm')}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <ApproversList 
              approverRoles={changeRequest.approverRoles || []}
              onAddApprover={onAddApprover}
            />
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap justify-end gap-2">
        {canEdit && onEdit && (
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
        
        {canReject && onReject && (
          <Button variant="outline" onClick={onReject}>
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        )}
        
        {canApprove && onApprove && (
          <Button onClick={onApprove}>
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
        )}
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

export default ChangeRequestDetail;
