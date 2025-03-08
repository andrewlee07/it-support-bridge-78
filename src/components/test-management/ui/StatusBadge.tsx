
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TestStatus } from '@/utils/types/test/testStatus';

interface StatusBadgeProps {
  status: TestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let badgeClass = '';
  let displayText = '';

  switch (status) {
    case 'pass':
    case 'passed':
      badgeClass = 'bg-green-100 text-green-800 border-green-200';
      displayText = 'Passed';
      break;
    case 'fail':
    case 'failed':
      badgeClass = 'bg-red-100 text-red-800 border-red-200';
      displayText = 'Failed';
      break;
    case 'blocked':
      badgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      displayText = 'Blocked';
      break;
    case 'in_progress':
    case 'in-progress':
      badgeClass = 'bg-blue-100 text-blue-800 border-blue-200';
      displayText = 'In Progress';
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-800 border-gray-200';
      displayText = 'Not Run';
  }

  return (
    <Badge variant="outline" className={badgeClass}>
      {displayText}
    </Badge>
  );
};

export default StatusBadge;
