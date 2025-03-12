
import React from 'react';
import { Link } from 'react-router-dom';

interface IncidentItemProps {
  title: string;
  date: string;
  time: string;
  id: string;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ title, date, time, id }) => {
  return (
    <Link to={`/tickets/${id}`} className="block p-3 rounded-md hover:bg-accent transition-colors">
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
