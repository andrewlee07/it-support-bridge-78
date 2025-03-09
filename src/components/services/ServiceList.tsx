
import React, { useState } from 'react';
import { Service, ServiceCategory, ServiceWithCategory } from '@/utils/types/service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

interface ServiceListProps {
  services: ServiceWithCategory[];
  categories?: ServiceCategory[];
  onAddService?: () => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onToggleStatus?: (service: ServiceWithCategory) => void;
  onSelect?: (service: ServiceWithCategory) => void;
  onEdit?: (serviceId: string) => void;
  isLoading?: boolean;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  categories = [],
  onAddService,
  onEditService,
  onToggleStatus,
  onSelect,
  onEdit,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter services based on search query and category filter
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      categoryFilter === 'all' || service.categoryId === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });

  const handleRowClick = (service: ServiceWithCategory) => {
    if (onSelect) {
      onSelect(service);
    } else if (onEditService) {
      onEditService(service);
    }
  };

  const handleStatusToggle = (service: ServiceWithCategory, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    if (onToggleStatus) {
      onToggleStatus(service);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {categories.length > 0 && (
            <Select 
              value={categoryFilter} 
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-full md:w-52">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {onAddService && (
          <Button onClick={onAddService}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Loading services...</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/10">
          <p className="text-muted-foreground">
            {searchQuery
              ? "No services match your search"
              : "No services found. Add your first service to get started."}
          </p>
        </div>
      ) : (
        <div className="border rounded-md">
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
              {filteredServices.map((service) => (
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
                    {onToggleStatus ? (
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Switch 
                          checked={service.status === 'active'} 
                          onClick={(e) => handleStatusToggle(service, e)}
                        />
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
                      </div>
                    ) : (
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
                    )}
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
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
