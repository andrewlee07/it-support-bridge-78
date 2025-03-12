
import React from 'react';
import { Link } from 'react-router-dom';

interface PortalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const PortalCard: React.FC<PortalCardProps> = ({ title, description, icon, to }) => {
  return (
    <Link to={to} className="block">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/30 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default PortalCard;
