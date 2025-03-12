
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceRequestItemProps {
  title: string;
  date: string;
  time: string;
  id: string;
  status?: string;
}

const ServiceRequestItem: React.FC<ServiceRequestItemProps> = ({ 
  title, 
  date, 
  time, 
  id,
  status = 'open'
}) => {
  // Extract the service request number without the "SR" prefix
  const requestId = id.replace('SR', '');
  
  return (
    <Link to={`/service-requests/${requestId}`} className="block">
      <div className="flex justify-between items-start border-b pb-3 hover:bg-muted/20 -mx-2 px-2 pt-2 rounded">
        <div className="space-y-1">
          <div className="font-medium text-sm">{title}</div>
          <div className="text-xs text-muted-foreground">
            {date} · {time}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-muted-foreground">{id}</span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full mt-1",
            status === 'open' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" : 
            status === 'fulfilled' ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" :
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
          )}>
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceRequestItem;
