
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket } from '@/utils/types/ticket';

interface DetailsTabProps {
  ticket: Ticket;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ ticket }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Description</h3>
            <p className="mt-2 whitespace-pre-line">{ticket.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
              <p>{ticket.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
              <p>{ticket.priority}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Reported By</h4>
              <p>{ticket.reportedBy || 'Unknown'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Assignee</h4>
              <p>{ticket.assignedTo || 'Unassigned'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsTab;
