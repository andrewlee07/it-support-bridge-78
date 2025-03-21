
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SecurityCase } from '@/utils/types/security';
import { getUserNameById } from '@/utils/userUtils';

interface AssignmentCardProps {
  securityCase: SecurityCase;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  securityCase
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        {securityCase.assignedTo ? (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {getUserNameById(securityCase.assignedTo).charAt(0)}
            </div>
            <div>
              <p className="font-medium">{getUserNameById(securityCase.assignedTo)}</p>
              <p className="text-sm text-muted-foreground">Security analyst</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Unassigned</span>
            <Button variant="outline" size="sm">Assign</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
