
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
