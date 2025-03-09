
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PenLine } from 'lucide-react';
import ServiceTabsDetail from './ServiceTabsDetail';

interface ServiceDetailProps {
  service: ServiceWithCategory;
  onBack: () => void;
  onEdit: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{service.name}</h1>
          <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
            {service.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <Button onClick={onEdit}>
          <PenLine className="h-4 w-4 mr-2" />
          Edit Service
        </Button>
      </div>
      
      <ServiceTabsDetail service={service} />
    </div>
  );
};

export default ServiceDetail;
