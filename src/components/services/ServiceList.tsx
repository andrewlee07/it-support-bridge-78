
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceWithCategory, ServiceCategory } from '@/utils/types/service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, PlusCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceListProps {
  services: ServiceWithCategory[];
  categories?: ServiceCategory[] | null;
  onSelect?: (service: ServiceWithCategory) => void;
  onEditService?: (service: ServiceWithCategory) => void;
  onAddService?: () => void;
  isLoading?: boolean;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  categories,
  onSelect,
  onEditService,
  onAddService,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();
  
  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.categoryId === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle clicking on a service card
  const handleServiceClick = (service: ServiceWithCategory) => {
    if (onSelect) {
      onSelect(service);
    }
    navigate(`/service-catalog/${service.id}`);
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
            <CardFooter>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {categories && categories.length > 0 && (
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {onAddService && (
          <Button onClick={onAddService}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        )}
      </div>
      
      {filteredServices.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No services found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(service => (
            <Card 
              key={service.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                service.status === 'inactive' ? 'opacity-70' : ''
              }`}
              onClick={() => service.status === 'active' && handleServiceClick(service)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.category.name}</CardDescription>
                  </div>
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
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
                {service.supportHours && (
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{service.supportHours}</span>
                  </div>
                )}
                {service.serviceType && (
                  <div className="mt-2">
                    <Badge variant="outline" className="capitalize text-xs">
                      {service.serviceType} service
                    </Badge>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button 
                  size="sm" 
                  disabled={service.status === 'inactive'}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleServiceClick(service);
                  }}
                >
                  View Details
                </Button>
                
                {onEditService && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditService(service);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
