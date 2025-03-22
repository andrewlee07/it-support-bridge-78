
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ServiceTableProps {
  services: (ServiceWithCategory & { formattedId?: string })[];
  onSelect?: (service: ServiceWithCategory) => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void; // Adding this property to match what's being passed
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services, onSelect, onEditService, onEdit }) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Support Hours</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow 
              key={service.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onSelect && onSelect(service)}
            >
              <TableCell className="font-medium">{service.formattedId || service.id}</TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.category.name}</TableCell>
              <TableCell>
                <Badge 
                  className={
                    service.status === 'active' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                  }
                >
                  {service.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>{service.supportHours || 'Not specified'}</TableCell>
              <TableCell className="text-right">
                {(onEditService || onEdit) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEditService) {
                        onEditService(service);
                      } else if (onEdit) {
                        onEdit(service.id);
                      }
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceTable;
