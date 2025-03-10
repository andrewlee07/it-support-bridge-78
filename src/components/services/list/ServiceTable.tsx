
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, ExternalLink } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface ServiceTableProps {
  services: ServiceWithCategory[];
  onSelect?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void;
  onEditService?: (service: ServiceWithCategory) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onSelect,
  onEdit,
  onEditService
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
          <TableHead className="w-24 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow 
            key={service.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleRowClick(service)}
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
              <Badge 
                variant={service.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                <span 
                  className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                    service.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`} 
                />
                {service.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                {(onEditService || onEdit) && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEditService) {
                        onEditService(service);
                      } else if (onEdit) {
                        onEdit(service.id);
                      }
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelect) {
                      onSelect(service);
                    }
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceTable;
