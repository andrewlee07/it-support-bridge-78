
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Problem } from '@/utils/types/problem';
import { formatRelative } from 'date-fns';
import RelatedItemsList from '@/components/tickets/detail/RelatedItemsList';

interface ProblemDetailsProps {
  problem: Problem;
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ problem }) => {
  // Transform the related incidents to the format expected by RelatedItemsList
  const relatedIncidents = problem.relatedIncidents?.map(incidentId => ({
    id: incidentId,
    type: 'incident'
  })) || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Problem Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
            <p className="text-foreground">{problem.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <p className="text-foreground capitalize">
                {problem.status.split('-').join(' ')}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Priority</h3>
              <p className="text-foreground">{problem.priority}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
              <p className="text-foreground capitalize">{problem.category}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Created By</h3>
              <p className="text-foreground">{problem.createdBy}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Created At</h3>
              <p className="text-foreground">
                {formatRelative(new Date(problem.createdAt), new Date())}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Assigned To</h3>
              <p className="text-foreground">{problem.assignedTo || 'Unassigned'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Resolution Plan */}
      {problem.resolutionPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{problem.resolutionPlan}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Root Cause */}
      {problem.rootCause && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Root Cause</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{problem.rootCause}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Workaround */}
      {problem.workaround && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Workaround</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{problem.workaround}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Resolution Description */}
      {problem.resolutionDescription && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{problem.resolutionDescription}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Closure Notes */}
      {problem.closureNotes && problem.status === 'closed' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Closure Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{problem.closureNotes}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Related Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Related Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          {problem.relatedIncidents && problem.relatedIncidents.length > 0 ? (
            <RelatedItemsList items={relatedIncidents} type="incident" />
          ) : (
            <p className="text-muted-foreground">No related incidents have been linked to this problem.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemDetails;
