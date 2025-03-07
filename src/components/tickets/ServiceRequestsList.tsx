
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PaginatedResponse, Ticket } from '@/utils/types';
import { api } from '@/utils/apiService';
import TicketList from './TicketList';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const ServiceRequestsList: React.FC = () => {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useQuery<PaginatedResponse<Ticket>>({
    queryKey: ['serviceRequests', page],
    queryFn: () => api.tickets.getTicketsByType('service', page, 10),
  });
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load service requests. Please try again.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div>
      {data?.items && data.items.length > 0 ? (
        <TicketList tickets={data.items} type="service" />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No service requests found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create a new service request to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestsList;
