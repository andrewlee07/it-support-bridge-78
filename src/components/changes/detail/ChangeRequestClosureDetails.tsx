
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClosureReason } from '@/utils/types/change';
import { AlertCircle, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ChangeRequestClosureDetailsProps {
  closureReason?: ClosureReason;
  closedAt?: Date;
}

const ChangeRequestClosureDetails: React.FC<ChangeRequestClosureDetailsProps> = ({
  closureReason,
  closedAt
}) => {
  if (!closureReason) return null;

  const getClosureIcon = () => {
    switch (closureReason) {
      case 'successful':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'successful-with-issues':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'rolled-back':
        return <AlertCircle className="h-6 w-6 text-orange-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getClosureText = () => {
    switch (closureReason) {
      case 'successful':
        return 'Change was implemented successfully without any issues.';
      case 'successful-with-issues':
        return 'Change was implemented successfully but with some issues encountered.';
      case 'rolled-back':
        return 'Change implementation was attempted but had to be rolled back.';
      case 'failed':
        return 'Change implementation failed and was not completed.';
      default:
        return '';
    }
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {getClosureIcon()}
          <span>Change Closure</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className="font-medium text-primary">
              {closureReason.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
          </div>
          {closedAt && (
            <div className="flex justify-between">
              <span className="font-medium">Closed on:</span>
              <span>{new Date(closedAt).toLocaleString()}</span>
            </div>
          )}
          <p className="text-muted-foreground mt-2">{getClosureText()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangeRequestClosureDetails;
