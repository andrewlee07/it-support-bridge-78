
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Switch } from '@/components/ui/switch';
import ServiceStatusBadge from './ServiceStatusBadge';

interface ServiceStatusToggleProps {
  service: ServiceWithCategory;
  onToggleStatus?: (service: ServiceWithCategory) => void;
}

const ServiceStatusToggle: React.FC<ServiceStatusToggleProps> = ({ 
  service, 
  onToggleStatus 
}) => {
  const handleStatusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleStatus) {
      onToggleStatus(service);
    }
  };

  if (!onToggleStatus) {
    return <ServiceStatusBadge status={service.status} />;
  }

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <Switch 
        checked={service.status === 'active'} 
        onClick={handleStatusToggle}
      />
      <ServiceStatusBadge status={service.status} />
    </div>
  );
};

export default ServiceStatusToggle;
