
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, FolderOpen } from 'lucide-react';
import ServiceList from '@/components/services/ServiceList';
import ServiceDialog from '@/components/services/ServiceDialog';
import ServiceDetail from '@/components/services/ServiceDetail';
import { useServices } from '@/hooks/useServices';
import { ServiceWithCategory } from '@/utils/types/service';

const ServiceCatalog: React.FC = () => {
  const {
    services,
    categories,
    isLoading,
    isDialogOpen,
    isSubmitting,
    handleAddService,
    handleEditService,
    handleCloseDialog,
    handleSubmitService
  } = useServices();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectService = (service: ServiceWithCategory) => {
    setSelectedService(service);
  };
  
  const handleBack = () => {
    setSelectedService(null);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Service Catalog</h1>
        <Button onClick={handleAddService}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>
      
      {selectedService ? (
        <ServiceDetail 
          service={selectedService} 
          onBack={handleBack}
        />
      ) : (
        <>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {isLoading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-sm text-muted-foreground">Loading services...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : filteredServices.length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-8">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No services found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery ? 'Try adjusting your search filters' : 'There are no services defined yet'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={handleAddService} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add your first service
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <ServiceList 
              services={filteredServices} 
              onSelect={handleSelectService}
              onEdit={handleEditService}
            />
          )}
        </>
      )}
      
      <ServiceDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        categories={categories}
        onSubmit={handleSubmitService}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ServiceCatalog;
