
import { formatDistanceToNow, isToday, isYesterday, format } from 'date-fns';

export const formatTimestamp = (timestamp: Date): string => {
  if (isToday(timestamp)) {
    return `Today, ${format(timestamp, 'h:mm a')}`;
  }
  
  if (isYesterday(timestamp)) {
    return `Yesterday, ${format(timestamp, 'h:mm a')}`;
  }
  
  if (new Date().getTime() - timestamp.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  }
  
  return format(timestamp, 'MMM d, yyyy');
};
