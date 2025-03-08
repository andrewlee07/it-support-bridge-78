
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TestStatus } from '@/utils/types/test/testStatus';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: TestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Normalize status to handle different formats
  const normalizedStatus = status?.toString().toLowerCase().replace('_', '-') || 'unknown';
  
  // Badge styling based on status
  const getBadgeStyle = () => {
    switch (normalizedStatus) {
      case 'pass':
      case 'passed':
        return 'bg-green-500 hover:bg-green-600';
      case 'fail':
      case 'failed':
        return 'bg-red-500 hover:bg-red-600';
      case 'blocked':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'not-run':
      case 'draft':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'ready':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'in-progress':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Status display text
  const getStatusText = () => {
    switch (normalizedStatus) {
      case 'pass':
      case 'passed':
        return 'Passed';
      case 'fail':
      case 'failed':
        return 'Failed';
      case 'blocked':
        return 'Blocked';
      case 'not-run':
        return 'Not Run';
      case 'draft':
        return 'Draft';
      case 'ready':
        return 'Ready';
      case 'in-progress':
        return 'In Progress';
      default:
        return status || 'Unknown';
    }
  };

  return (
    <Badge className={getBadgeStyle()}>
      {getStatusText()}
    </Badge>
  );
};

export default StatusBadge;
