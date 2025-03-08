
import React from 'react';

interface TicketEmptyStateProps {
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
  type: 'incident' | 'service';
}

const TicketEmptyState: React.FC<TicketEmptyStateProps> = ({
  searchQuery,
  statusFilter,
  priorityFilter,
  type
}) => {
  return (
    <div className="text-center py-10">
      <h3 className="text-lg font-medium">No tickets found</h3>
      <p className="text-muted-foreground mt-1">
        {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
          ? 'Try changing your search filters'
          : `No ${type === 'incident' ? 'incidents' : 'service requests'} have been created yet`}
      </p>
    </div>
  );
};

export default TicketEmptyState;
