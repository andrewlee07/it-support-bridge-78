
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { TestStatus } from '@/utils/types/test/testStatus';

interface StatusBadgeProps {
  status: TestStatus;
  size?: 'xs' | 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  // Map status values to normalized ones
  let normalizedStatus = status;
  if (status === 'passed') normalizedStatus = 'pass';
  if (status === 'failed') normalizedStatus = 'fail';
  if (status === 'in_progress' || status === 'in-progress') normalizedStatus = 'not-run';
  
  // Set icon size based on the size prop
  const iconSize = size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  
  // Base styles for the badge
  let className = 'gap-1 ';
  
  // Font size based on size prop
  className += size === 'xs' ? 'text-xs px-1.5 py-0.5 ' : 
               size === 'sm' ? 'text-sm px-2 py-1 ' : 
               'px-2.5 py-1.5 ';

  switch (normalizedStatus) {
    case 'pass':
      return (
        <Badge variant="outline" className={`${className} bg-green-50 text-green-700 border-green-200`}>
          <CheckCircle className={iconSize} />
          Passed
        </Badge>
      );
    case 'fail':
      return (
        <Badge variant="outline" className={`${className} bg-red-50 text-red-700 border-red-200`}>
          <XCircle className={iconSize} />
          Failed
        </Badge>
      );
    case 'blocked':
      return (
        <Badge variant="outline" className={`${className} bg-yellow-50 text-yellow-700 border-yellow-200`}>
          <AlertCircle className={iconSize} />
          Blocked
        </Badge>
      );
    case 'draft':
    case 'not-run':
    case 'ready':
    default:
      return (
        <Badge variant="outline" className={`${className} bg-gray-50 text-gray-700 border-gray-200`}>
          <Clock className={iconSize} />
          Not Run
        </Badge>
      );
  }
};

export default StatusBadge;
