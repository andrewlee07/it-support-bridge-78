
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ServiceStatusToggle from './ServiceStatusToggle';

interface ServiceTableRowProps {
  service: ServiceWithCategory;
  onRowClick: (service: ServiceWithCategory) => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void;
  onToggleStatus?: (service: ServiceWithCategory) => void;
}

const ServiceTableRow: React.FC<ServiceTableRowProps> = ({
  service,
  onRowClick,
  onEditService,
  onEdit,
  onToggleStatus,
}) => {
  return (
    <TableRow 
      key={service.id}
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onRowClick(service)}
    >
      <TableCell>
        <div>
          <p className="font-medium">{service.name}</p>
          <p className="text-sm text-muted-foreground truncate max-w-xs">
            {service.description}
          </p>
        </div>
      </TableCell>
      <TableCell>{service.category.name}</TableCell>
      <TableCell>
        <ServiceStatusToggle 
          service={service} 
          onToggleStatus={onToggleStatus} 
        />
      </TableCell>
      <TableCell>
        {(onEditService || onEdit) && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onEditService) {
                onEditService(service);
              } else if (onEdit) {
                onEdit(service.id);
              }
            }}
          >
            Edit
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ServiceTableRow;
