
import React from 'react';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, Server, Briefcase } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceListProps {
  services: ServiceWithCategory[];
  categories: ServiceCategory[];
  onEditService?: (service: ServiceWithCategory) => void;
  onSelect?: (service: ServiceWithCategory) => void;
  onAddService?: () => void;
  isLoading?: boolean;
}

const ServiceList: React.FC<ServiceListProps> = ({ 
  services, 
  categories,
  onEditService,
  onSelect,
  onAddService,
  isLoading = false
}) => {
  const handleServiceAction = (action: 'view' | 'edit' | 'delete', service: ServiceWithCategory) => {
    if (action === 'edit' && onEditService) {
      onEditService(service);
    } else if (action === 'view' && onSelect) {
      onSelect(service);
    }
  };
  
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Uncategorized';
  };
  
  const getServiceTypeIcon = (serviceType?: string) => {
    if (serviceType === 'business') {
      return <Briefcase className="h-4 w-4 mr-2 text-amber-500" />;
    }
    return <Server className="h-4 w-4 mr-2 text-blue-500" />;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="rounded-md border">
          <div className="h-10 border-b px-4 bg-muted/50" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center p-4 border-b">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-32 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-muted/20">
        <h3 className="text-lg font-medium">No services found</h3>
        <p className="text-muted-foreground mb-4">
          There are no services in the catalog yet.
        </p>
        {onAddService && (
          <Button onClick={onAddService}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {onAddService && (
        <div className="flex justify-end">
          <Button onClick={onAddService}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell 
                  className="font-medium cursor-pointer"
                  onClick={() => {
                    if (onSelect) onSelect(service);
                    else if (onEditService) onEditService(service);
                  }}
                >
                  {service.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getServiceTypeIcon(service.serviceType)}
                    <span>{service.serviceType === 'business' ? 'Business' : 'Technical'}</span>
                  </div>
                </TableCell>
                <TableCell>{getCategoryName(service.categoryId)}</TableCell>
                <TableCell>
                  <Badge 
                    variant={service.status === 'active' ? 'default' : 
                      service.status === 'maintenance' ? 'warning' : 
                      service.status === 'deprecated' ? 'destructive' : 'secondary'}
                  >
                    {service.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleServiceAction('view', service)}>
                        View details
                      </DropdownMenuItem>
                      {onEditService && (
                        <DropdownMenuItem onClick={() => handleServiceAction('edit', service)}>
                          Edit service
                        </DropdownMenuItem>
                      )}
                      {onEditService && (
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleServiceAction('delete', service)}
                        >
                          Delete service
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ServiceList;
