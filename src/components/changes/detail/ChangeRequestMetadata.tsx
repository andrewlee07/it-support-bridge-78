
import React from 'react';
import { format } from 'date-fns';
import { CalendarDays, AlertTriangle, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserById } from '@/utils/mockData';

interface ChangeRequestMetadataProps {
  startDate: Date;
  endDate: Date;
  riskScore: number;
  riskLevel: string;
  createdBy: string;
  implementor?: string;
  onRiskDetailsToggle: () => void;
  showRiskDetails: boolean;
  onAddImplementor?: (userId: string) => void;
}

const ChangeRequestMetadata: React.FC<ChangeRequestMetadataProps> = ({
  startDate,
  endDate,
  riskScore,
  riskLevel,
  createdBy,
  implementor,
  onRiskDetailsToggle,
  showRiskDetails,
  onAddImplementor
}) => {
  const createdByUser = getUserById(createdBy);
  const implementorUser = implementor ? getUserById(implementor) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
        <div>
          <div className="text-sm font-medium">Implementation Period</div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(startDate), 'MMM d')} - {format(new Date(endDate), 'MMM d, yyyy')}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-2">
          <div>
            <div className="text-sm font-medium">Risk Score</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              {riskScore} ({riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)})
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 p-1" 
            onClick={onRiskDetailsToggle}
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
            {createdByUser?.name || 'Unknown'}
          </div>
        </div>
      </div>

      {implementorUser ? (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Implementor</div>
            <div className="text-sm text-muted-foreground">
              {implementorUser.name}
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
  );
};

export default ChangeRequestMetadata;
