
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface ChangeImplementationDetailsProps {
  implementationPlan: string;
  rollbackPlan: string;
  implementor?: string;
  onAddImplementor?: (userId: string) => void;
}

const ChangeImplementationDetails: React.FC<ChangeImplementationDetailsProps> = ({
  implementationPlan,
  rollbackPlan,
  implementor,
  onAddImplementor
}) => {
  const handleAssignToMe = () => {
    if (onAddImplementor) {
      // In a real app, you'd get the current user's ID
      onAddImplementor('current-user');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Implementation Plan</CardTitle>
          {!implementor && onAddImplementor && (
            <Button variant="outline" size="sm" onClick={handleAssignToMe}>
              <UserPlus className="h-4 w-4 mr-2" />
              Assign to me
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-sm p-3 bg-gray-50 rounded-md min-h-24">
            {implementationPlan || 'No implementation plan provided.'}
          </div>
          
          {implementor && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Implementor</p>
              <p className="text-sm font-medium">{implementor}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Rollback Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm p-3 bg-gray-50 rounded-md min-h-24">
            {rollbackPlan || 'No rollback plan provided.'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeImplementationDetails;
