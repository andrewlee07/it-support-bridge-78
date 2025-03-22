
import React from 'react';
import { ServiceWithCategory } from '@/utils/types/service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, MoreHorizontal } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border/10">
            <TableHead>Service Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                No services found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow 
                key={service.id}
                className="cursor-pointer hover:bg-muted/20 border-b border-border/10"
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
                    className={`capitalize ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
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
                  <div className="flex justify-end space-x-1">
                    {(onEditService || onEdit) && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
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
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelect) {
                          onSelect(service);
                        }
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {(onEditService || onEdit) && (
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onEditService) {
                                onEditService(service);
                              } else if (onEdit) {
                                onEdit(service.id);
                              }
                            }}
                          >
                            Edit Service
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelect) {
                              onSelect(service);
                            }
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceTable;
