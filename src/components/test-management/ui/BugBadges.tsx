
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BugSeverity, BugStatus } from '@/utils/types/testTypes';

// Status badge component
export const StatusBadge = ({ status }: { status: BugStatus }) => {
  const statusConfig = {
    'new': { label: 'New', className: 'bg-blue-100 text-blue-800' },
    'in-progress': { label: 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
    'fixed': { label: 'Fixed', className: 'bg-green-100 text-green-800' },
    'verified': { label: 'Verified', className: 'bg-purple-100 text-purple-800' },
    'closed': { label: 'Closed', className: 'bg-gray-100 text-gray-800' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

// Severity badge component
export const SeverityBadge = ({ severity }: { severity: BugSeverity }) => {
  const severityConfig = {
    'critical': { label: 'Critical', className: 'bg-red-100 text-red-800' },
    'high': { label: 'High', className: 'bg-orange-100 text-orange-800' },
    'medium': { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
    'low': { label: 'Low', className: 'bg-green-100 text-green-800' },
  };

  const config = severityConfig[severity];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};
