
import React from 'react';
import { Badge } from '@/components/ui/badge';

// Priority display helper
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'P1':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'P2':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'P3':
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'P4':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

// Status display helper
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'in-progress':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'resolved':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'closed':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    case 'approved':
    case 'fulfilled':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

export const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => (
  <Badge className={getPriorityColor(priority)}>
    {priority}
  </Badge>
);

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <Badge className={getStatusColor(status)}>
    {status}
  </Badge>
);
