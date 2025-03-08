
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface ReleaseActionsCardProps {
  status: string;
  onChangeStatus: (status: string) => void;
}

const ReleaseActionsCard: React.FC<ReleaseActionsCardProps> = ({
  status,
  onChangeStatus
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {status !== 'Deployed' && status !== 'Cancelled' && (
            <>
              {status === 'Planned' && (
                <Button 
                  variant="outline" 
                  onClick={() => onChangeStatus('In Progress')}
                  className="justify-start"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Start Implementation
                </Button>
              )}
              {status === 'In Progress' && (
                <Button 
                  variant="outline" 
                  onClick={() => onChangeStatus('Deployed')}
                  className="justify-start"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Deployed
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => onChangeStatus('Cancelled')}
                className="justify-start text-destructive hover:text-destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Release
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseActionsCard;
