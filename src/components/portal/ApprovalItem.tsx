
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ApprovalItemProps {
  title: string;
  requestType: 'change' | 'release' | 'service-request';
  date: string;
  time: string;
  id: string;
  status?: string;
}

const ApprovalItem: React.FC<ApprovalItemProps> = ({ 
  title, 
  requestType, 
  date, 
  time, 
  id,
  status = 'pending'
}) => {
  // Determine the URL based on request type
  const getUrl = () => {
    switch (requestType) {
      case 'change':
        return `/changes/${id}`;
      case 'release':
        return `/releases/${id}`;
      case 'service-request':
        return `/service-requests/${id.replace('SR', '')}`;
      default:
        return `/${requestType}s/${id}`;
    }
  };
  
  // Get appropriate type label
  const getTypeLabel = () => {
    switch (requestType) {
      case 'change':
        return 'Change Request';
      case 'release':
        return 'Release';
      case 'service-request':
        return 'Service Request';
      default:
        return requestType;
    }
  };
  
  return (
    <Link to={getUrl()} className="block">
      <div className="flex justify-between items-start border-b pb-3 hover:bg-muted/20 -mx-2 px-2 pt-2 rounded">
        <div className="space-y-1">
          <div className="font-medium text-sm">{title}</div>
          <div className="text-xs text-muted-foreground">
            {getTypeLabel()} · {date} · {time}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-muted-foreground">{id}</span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full mt-1",
            status === 'pending' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" : 
            status === 'approved' ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" :
            "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
          )}>
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ApprovalItem;
