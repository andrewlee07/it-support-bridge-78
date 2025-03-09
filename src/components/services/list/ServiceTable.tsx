
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import ServiceTableRow from './ServiceTableRow';

interface ServiceTableProps {
  services: ServiceWithCategory[];
  onSelect?: (service: ServiceWithCategory) => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void;
  onToggleStatus?: (service: ServiceWithCategory) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onSelect,
  onEditService,
  onEdit,
  onToggleStatus
}) => {
  const handleRowClick = (service: ServiceWithCategory) => {
    if (onSelect) {
      onSelect(service);
    } else if (onEditService) {
      onEditService(service);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <ServiceTableRow
            key={service.id}
            service={service}
            onRowClick={handleRowClick}
            onEditService={onEditService}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceTable;
