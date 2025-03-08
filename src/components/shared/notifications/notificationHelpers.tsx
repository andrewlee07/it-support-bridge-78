
import React from 'react';
import { 
  AlertCircle, 
  Bug, 
  ClipboardList, 
  FileText, 
  Package, 
  Search, 
  Box, 
  Calendar 
} from 'lucide-react';

// Helper function to get the appropriate icon based on entity type
export const getIconForResultType = (type: string) => {
  switch (type) {
    case 'incident':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case 'bug':
      return <Bug className="h-4 w-4 text-red-500" />;
    case 'testCase':
      return <FileText className="h-4 w-4 text-purple-500" />;
    case 'backlogItem':
      return <ClipboardList className="h-4 w-4 text-orange-500" />;
    case 'release':
      return <Package className="h-4 w-4 text-green-500" />;
    case 'asset':
      return <Box className="h-4 w-4 text-blue-500" />;
    case 'change':
      return <Calendar className="h-4 w-4 text-cyan-500" />;
    default:
      return <Search className="h-4 w-4" />;
  }
};

// Format a timestamp relative to current time
export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffDay > 0) {
    return diffDay === 1 ? 'Yesterday' : `${diffDay} days ago`;
  } else if (diffHour > 0) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
};

// Priority colors
export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'critical':
      return 'text-red-500';
    case 'high':
      return 'text-orange-500';
    case 'medium':
      return 'text-amber-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-muted-foreground';
  }
};

// Status colors
export const getStatusColor = (status?: string) => {
  switch (status) {
    case 'active':
    case 'open':
      return 'text-green-500';
    case 'in-progress':
      return 'text-blue-500';
    case 'pending':
    case 'blocked':
      return 'text-amber-500';
    case 'closed':
    case 'resolved':
      return 'text-gray-500';
    case 'failed':
      return 'text-red-500';
    default:
      return 'text-muted-foreground';
  }
};
