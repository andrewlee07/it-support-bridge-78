
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import DetailBreadcrumb from '@/components/tickets/detail/DetailBreadcrumb';
import { ChangeRequest } from '@/utils/types/change';

interface ChangeRequestHeaderProps {
  changeRequest: ChangeRequest;
}

const ChangeRequestHeader: React.FC<ChangeRequestHeaderProps> = ({ changeRequest }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <DetailBreadcrumb 
        entityName="Change Request"
        entityId={changeRequest.id}
        parentRoute="/changes"
        parentName="Changes"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/changes')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Changes
          </Button>
          <h1 className="text-2xl font-bold">Change Request: {changeRequest.id}</h1>
        </div>
        
        {changeRequest.status === 'draft' && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/changes/${changeRequest.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
    </>
  );
};

export default ChangeRequestHeader;
