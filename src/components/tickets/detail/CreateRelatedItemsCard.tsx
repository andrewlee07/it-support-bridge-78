
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, BugPlay, ClipboardList, FileText } from 'lucide-react';

interface CreateRelatedItemsCardProps {
  sourceId: string;
  sourceType: 'incident' | 'problem' | 'security-case' | 'service-request';
}

const CreateRelatedItemsCard: React.FC<CreateRelatedItemsCardProps> = ({ 
  sourceId, 
  sourceType 
}) => {
  const navigate = useNavigate();
  
  const handleCreateProblem = () => {
    navigate(`/problems/create?source=${sourceType}&sourceId=${sourceId}`);
  };
  
  const handleCreateBug = () => {
    navigate(`/bugs/create?source=${sourceType}&sourceId=${sourceId}`);
  };

  const handleCreateIncident = () => {
    navigate(`/incidents/create?source=${sourceType}&sourceId=${sourceId}`);
  };
  
  const handleCreateTask = () => {
    navigate(`/tasks/create?source=${sourceType}&sourceId=${sourceId}`);
  };

  const handleCreateBacklogItem = () => {
    navigate(`/backlog/create?source=${sourceType}&sourceId=${sourceId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Create Related Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {sourceType !== 'problem' && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center justify-center"
              onClick={handleCreateProblem}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Create Problem
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center justify-center"
            onClick={handleCreateBug}
          >
            <BugPlay className="h-4 w-4 mr-2" />
            Create Bug
          </Button>
          
          {sourceType !== 'incident' && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center justify-center"
              onClick={handleCreateIncident}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Create Incident
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center justify-center"
            onClick={handleCreateTask}
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Create Task
          </Button>
          
          {(sourceType === 'incident' || sourceType === 'service-request') && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center justify-center"
              onClick={handleCreateBacklogItem}
            >
              <FileText className="h-4 w-4 mr-2" />
              Create Backlog Item
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateRelatedItemsCard;
