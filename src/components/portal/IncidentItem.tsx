
import React from 'react';
import { Link } from 'react-router-dom';
import { PORTAL_INCIDENT_DETAIL } from '@/utils/routes/portalRouteConstants';

interface IncidentItemProps {
  title: string;
  date: string;
  time: string;
  id: string;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ title, date, time, id }) => {
  // Extract the incident number for URL - keeping only the numeric part
  const incidentId = id.replace(/INC0*/, '');
  
  return (
    <Link to={PORTAL_INCIDENT_DETAIL(incidentId)} className="block p-3 rounded-md hover:bg-accent transition-colors">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="text-xs text-muted-foreground">
          {id} • {time}
        </div>
      </div>
    </Link>
  );
};

export default IncidentItem;
