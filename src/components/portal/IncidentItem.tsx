import React from 'react';
import { Link } from 'react-router-dom';
import { PORTAL_INCIDENT_DETAIL } from '@/utils/routes/portalRouteConstants';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface IncidentItemProps {
  title: string;
  date: string;
  time: string;
  id: string;
  status?: string;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ 
  title, 
  date, 
  time, 
  id,
  status = 'open'
}) => {
  // Extract the incident number for URL - keeping only the numeric part
  const incidentId = id.replace(/INC0*/, '');
  
  return (
    <Link to={PORTAL_INCIDENT_DETAIL(incidentId)} className="block p-3 rounded-md hover:bg-accent transition-colors">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {id} • {time}
          </div>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            status === 'open' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" : 
            status === 'resolved' || status === 'closed' ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" :
            status === 'in-progress' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" :
            "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
          )}>
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default IncidentItem;
