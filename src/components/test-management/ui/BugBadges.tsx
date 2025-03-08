
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BugSeverity, BugStatus } from '@/utils/types/test/testStatus';

// Mapping of severities to display labels and styles
const severityConfig: Record<BugSeverity, { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-red-100 text-red-800 border-red-200' },
  high: { label: 'High', className: 'bg-orange-100 text-orange-800 border-orange-200' },
  medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  low: { label: 'Low', className: 'bg-green-100 text-green-800 border-green-200' },
  major: { label: 'Major', className: 'bg-red-100 text-red-800 border-red-200' },
  minor: { label: 'Minor', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  trivial: { label: 'Trivial', className: 'bg-blue-100 text-blue-800 border-blue-200' },
};

// Mapping of statuses to display labels and styles
const statusConfig: Record<string, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-red-100 text-red-800 border-red-200' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  fixed: { label: 'Fixed', className: 'bg-green-100 text-green-800 border-green-200' },
  closed: { label: 'Closed', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  verified: { label: 'Verified', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  rejected: { label: 'Rejected', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  reopened: { label: 'Reopened', className: 'bg-red-100 text-red-800 border-red-200' },
  deferred: { label: 'Deferred', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  resolved: { label: 'Resolved', className: 'bg-green-100 text-green-800 border-green-200' },
  new: { label: 'New', className: 'bg-blue-100 text-blue-800 border-blue-200' },
};

interface SeverityBadgeProps {
  severity: BugSeverity;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const config = severityConfig[severity] || { label: severity, className: 'bg-gray-100 text-gray-800 border-gray-200' };
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

interface StatusBadgeProps {
  status: BugStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800 border-gray-200' };
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};
