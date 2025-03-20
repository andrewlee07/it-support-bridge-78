
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChangeRequest } from '@/utils/types/change';
import { Edit, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStatusColor } from '@/utils/changeUtils';

interface ChangeRequestHeaderProps {
  changeRequest: ChangeRequest;
  onEdit?: () => void;
  onUpdateStatus?: (status: string, closureReason?: string) => void;
}

const ChangeRequestHeader: React.FC<ChangeRequestHeaderProps> = ({
  changeRequest,
  onEdit,
  onUpdateStatus
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild className="p-0">
          <Link to="/changes" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to Changes</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight">{changeRequest.title}</h1>
            <Badge className={getStatusColor(changeRequest.status)}>
              {changeRequest.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {changeRequest.id} • Created on {new Date(changeRequest.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChangeRequestHeader;
