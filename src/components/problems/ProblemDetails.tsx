
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Problem } from '@/utils/types/problem';
import { format } from 'date-fns';
import { getAssetById } from '@/utils/mockData/assets';
import { getServiceById } from '@/utils/mockData/services';

interface ProblemDetailsProps {
  problem: Problem;
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ problem }) => {
  // Format dates for display
  const createdDate = format(new Date(problem.createdAt), 'PPP p');
  const updatedDate = format(new Date(problem.updatedAt), 'PPP p');
  
  // Get associated assets
  const associatedAssets = (problem.associatedAssets || []).map(id => {
    const asset = getAssetById(id);
    return asset ? {
      id: asset.id,
      name: asset.name,
      model: asset.model,
      type: asset.type,
      status: asset.status
    } : { 
      id, 
      name: `Asset ${id}`,
      model: 'Unknown',
      type: 'unknown',
      status: 'unknown'
    };
  });
  
  // Get associated service
  const associatedService = problem.serviceId 
    ? getServiceById(problem.serviceId)
    : null;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Problem Details</CardTitle>
          <CardDescription>Details about this problem record</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Status</h3>
              <Badge 
                variant={problem.status === 'closed' ? 'secondary' : 'default'}
                className="mt-1"
              >
                {problem.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium">Priority</h3>
              <Badge 
                variant={
                  problem.priority === 'P1' 
                    ? 'destructive' 
                    : problem.priority === 'P2' 
                      ? 'default' 
                      : 'secondary'
                }
                className="mt-1"
              >
                {problem.priority}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium">Category</h3>
              <p className="text-sm">{problem.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Created By</h3>
              <p className="text-sm">{problem.createdBy}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Assigned To</h3>
              <p className="text-sm">{problem.assignedTo || 'Unassigned'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Created</h3>
              <p className="text-sm">{createdDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Last Updated</h3>
              <p className="text-sm">{updatedDate}</p>
            </div>
            {problem.resolvedAt && (
              <div>
                <h3 className="text-sm font-medium">Resolved</h3>
                <p className="text-sm">{format(new Date(problem.resolvedAt), 'PPP p')}</p>
              </div>
            )}
            {problem.closedAt && (
              <div>
                <h3 className="text-sm font-medium">Closed</h3>
                <p className="text-sm">{format(new Date(problem.closedAt), 'PPP p')}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium">Description</h3>
            <p className="text-sm mt-1">{problem.description}</p>
          </div>
          
          {problem.rootCause && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Root Cause</h3>
              <p className="text-sm mt-1">{problem.rootCause}</p>
            </div>
          )}
          
          {problem.workaround && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Workaround</h3>
              <p className="text-sm mt-1">{problem.workaround}</p>
            </div>
          )}
          
          {problem.resolutionPlan && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Resolution Plan</h3>
              <p className="text-sm mt-1">{problem.resolutionPlan}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Associated Assets Card */}
      {associatedAssets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Associated Assets</CardTitle>
            <CardDescription>Assets related to this problem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {associatedAssets.map(asset => (
                <div key={asset.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">{asset.model} - {asset.type}</p>
                  </div>
                  <Badge variant={asset.status === 'active' ? 'default' : 'secondary'}>
                    {asset.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Associated Service Card */}
      {associatedService && (
        <Card>
          <CardHeader>
            <CardTitle>Associated Service</CardTitle>
            <CardDescription>Service related to this problem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{associatedService.name}</p>
                <p className="text-sm text-muted-foreground">{associatedService.description}</p>
              </div>
              <Badge variant={associatedService.status === 'active' ? 'default' : 'secondary'}>
                {associatedService.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProblemDetails;
