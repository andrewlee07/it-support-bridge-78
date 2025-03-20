
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChangeRequest } from '@/utils/types/change';
import { Check, X, CheckSquare } from 'lucide-react';

interface ChangeRequestDetailsProps {
  changeRequest: ChangeRequest;
  onApprove?: () => void;
  onReject?: () => void;
  onClose?: () => void;
  canApprove: boolean;
  canReject: boolean;
  canClose: boolean;
}

const ChangeRequestDetails: React.FC<ChangeRequestDetailsProps> = ({
  changeRequest,
  onApprove,
  onReject,
  onClose,
  canApprove,
  canReject,
  canClose
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Request Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-sm font-medium">{changeRequest.category}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Priority</p>
            <p className="text-sm font-medium">{changeRequest.priority}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Created By</p>
            <p className="text-sm font-medium">{changeRequest.createdBy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Implementor</p>
            <p className="text-sm font-medium">{changeRequest.implementor || 'Not assigned'}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Description</p>
          <div className="text-sm p-3 bg-gray-50 rounded-md min-h-24">
            {changeRequest.description}
          </div>
        </div>
        
        {changeRequest.closureReason && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Closure Reason</p>
            <div className="text-sm p-3 bg-gray-50 rounded-md">
              {changeRequest.closureReason}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="justify-end space-x-2">
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
        
        {canClose && onClose && (
          <Button variant="secondary" onClick={onClose}>
            <CheckSquare className="h-4 w-4 mr-2" />
            Close Change
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChangeRequestDetails;
