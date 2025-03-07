
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TestStatus } from '@/utils/types/testTypes';

interface StatusBadgeProps {
  status: TestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    'not-run': { label: 'Not Run', className: 'bg-gray-200 text-gray-800' },
    'pass': { label: 'Pass', className: 'bg-green-100 text-green-800' },
    'fail': { label: 'Fail', className: 'bg-red-100 text-red-800' },
    'blocked': { label: 'Blocked', className: 'bg-yellow-100 text-yellow-800' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
