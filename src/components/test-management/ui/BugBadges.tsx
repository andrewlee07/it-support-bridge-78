
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BugSeverity, BugStatus } from '@/utils/types/test/testStatus';
import { cn } from '@/lib/utils';

// Severity badge configurations
const severityConfig: Record<BugSeverity, { label: string, className: string }> = {
  critical: { label: 'Critical', className: 'bg-red-600 hover:bg-red-700' },
  high: { label: 'High', className: 'bg-orange-500 hover:bg-orange-600' },
  medium: { label: 'Medium', className: 'bg-yellow-500 hover:bg-yellow-600' },
  low: { label: 'Low', className: 'bg-blue-500 hover:bg-blue-600' },
};

// Status badge configurations
const statusConfig: Record<string, { label: string, className: string }> = {
  'new': { label: 'New', className: 'bg-purple-500 hover:bg-purple-600' },
  'open': { label: 'Open', className: 'bg-purple-500 hover:bg-purple-600' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-500 hover:bg-blue-600' },
  'in_progress': { label: 'In Progress', className: 'bg-blue-500 hover:bg-blue-600' },
  'fixed': { label: 'Fixed', className: 'bg-green-500 hover:bg-green-600' },
  'verified': { label: 'Verified', className: 'bg-teal-500 hover:bg-teal-600' },
  'closed': { label: 'Closed', className: 'bg-gray-500 hover:bg-gray-600' },
  'resolved': { label: 'Resolved', className: 'bg-green-500 hover:bg-green-600' },
};

// Severity Badge Component
export const SeverityBadge: React.FC<{ severity: BugSeverity }> = ({ severity }) => {
  const config = severityConfig[severity] || { 
    label: severity, 
    className: 'bg-gray-500 hover:bg-gray-600' 
  };
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

// Status Badge Component
export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  // Handle undefined or missing status with a fallback
  const safeStatus = status || 'unknown';
  
  // Get config or use fallback
  const config = statusConfig[safeStatus] || { 
    label: safeStatus, 
    className: 'bg-gray-500 hover:bg-gray-600' 
  };
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};
