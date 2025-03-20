
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ChangesTable from './ChangesTable';
import { ChangeRequest } from '@/utils/types/change';

interface ChangesListProps {
  filter: 'all' | 'pending' | 'upcoming' | 'completed';
  userId?: string;
  changes: ChangeRequest[];
  isLoading?: boolean;
  isError?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewChange?: (id: string) => void;
  activeTab?: string;
  userRole?: string;
}

const ChangesList: React.FC<ChangesListProps> = ({ 
  filter, 
  userId, 
  changes = [], 
  isLoading = false, 
  isError = false,
  onApprove,
  onReject,
  onViewChange,
  activeTab = 'all',
  userRole
}) => {
  if (isLoading) {
    return (
      <Card className="p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-8 w-full mb-4" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-4">
        <p className="text-red-500">Error loading changes</p>
      </Card>
    );
  }

  // Ensure we always pass a function for onViewChange
  const handleViewChange = onViewChange || (() => {
    console.warn('No view change handler provided');
  });

  return (
    <ChangesTable 
      changes={changes} 
      activeTab={activeTab}
      onApprove={onApprove}
      onReject={onReject}
      onViewChange={handleViewChange}
      userRole={userRole}
    />
  );
};

export default ChangesList;
