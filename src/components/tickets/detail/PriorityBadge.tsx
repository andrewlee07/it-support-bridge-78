
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PriorityBadgeProps {
  priority: string;
  isServiceRequest: boolean;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, isServiceRequest }) => {
  const formatPriority = (priority: string) => {
    // For service requests, show Low/Medium/High rather than P1-P4
    if (isServiceRequest) {
      switch(priority) {
        case 'P1': return 'High';
        case 'P2': return 'High';
        case 'P3': return 'Medium';
        case 'P4': return 'Low';
        default: return priority;
      }
    }
    return priority;
  };

  const priorityClass = priority === 'P1' 
    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    : priority === 'P2'
    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    : priority === 'P3'
    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';

  return (
    <Badge className={priorityClass}>
      {formatPriority(priority)}
    </Badge>
  );
};

export default PriorityBadge;
