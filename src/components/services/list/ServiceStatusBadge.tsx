
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/utils/types/service';

interface ServiceStatusBadgeProps {
  status: Service['status'];
}

const ServiceStatusBadge: React.FC<ServiceStatusBadgeProps> = ({ status }) => {
  return (
    <Badge 
      variant={status === 'active' ? 'default' : 'secondary'}
      className="capitalize"
    >
      <span 
        className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
          status === 'active' ? 'bg-green-500' : 'bg-gray-400'
        }`} 
      />
      {status}
    </Badge>
  );
};

export default ServiceStatusBadge;
