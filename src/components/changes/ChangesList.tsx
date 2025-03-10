
import React from 'react';
import { useChangeRequests } from '@/hooks/useChangeRequests';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ChangesTable from './ChangesTable';

interface ChangesListProps {
  filter: 'all' | 'pending' | 'upcoming' | 'completed';
  userId?: string;
}

const ChangesList: React.FC<ChangesListProps> = ({ filter, userId }) => {
  const { changes, loading, error } = useChangeRequests({ filter, userId });

  if (loading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-8 w-full mb-4" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-red-500">Error loading changes: {error.message}</p>
      </Card>
    );
  }

  return <ChangesTable changes={changes} />;
};

export default ChangesList;
