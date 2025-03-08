
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  isServiceRequest: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isServiceRequest }) => {
  // Custom status classes for service requests vs incidents
  const getStatusBadgeClass = (status: string) => {
    if (isServiceRequest) {
      switch(status) {
        case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'in-progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        case 'fulfilled': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      }
    } else {
      // Original incident status styling
      return status === 'open' 
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        : status === 'in-progress'
        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        : status === 'resolved' || status === 'fulfilled'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <Badge className={getStatusBadgeClass(status)}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
