
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/hooks/useServices';
import ServiceManagement from '@/components/services/ServiceManagement';
import ServiceTopologyView from '@/components/services/topology/ServiceTopologyView';
import ClientContractList from '@/components/services/contracts/ClientContractList';
import { ServiceWithCategory } from '@/utils/types/service';
import { getBusinessServices } from '@/utils/mockData/services/servicesData';

const ServiceCatalogManagementPage: React.FC = () => {
  const { userHasPermission } = useAuth();
  const { services, isLoading } = useServices();
  const [selectedService, setSelectedService] = useState<ServiceWithCategory | null>(null);
  
  const canManageServiceCatalog = userHasPermission('Manage Service Catalog Content');
  const businessServices = services ? getBusinessServices() : [];
  
  if (!canManageServiceCatalog) {
    return (
      <PageTransition>
        <div className="container mx-auto py-6">
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-md">
            <h2 className="text-lg font-medium text-destructive">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have permission to manage the service catalog.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  const handleSelectService = (service: ServiceWithCategory) => {
    setSelectedService(service);
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Catalog Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage services, relationships, and client contracts
            </p>
          </div>
          
          <Tabs defaultValue="services">
            <TabsList className="mb-4">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="topology">Service Topology</TabsTrigger>
              <TabsTrigger value="contracts">Client Contracts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services">
              <ServiceManagement inServiceCatalog={false} />
            </TabsContent>
            
            <TabsContent value="topology">
              {services && services.length > 0 ? (
                <div className="h-[700px]">
                  <ServiceTopologyView 
                    services={services} 
                    onSelectService={handleSelectService}
                  />
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    {isLoading ? 'Loading service topology...' : 'No services available to visualize.'}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="contracts">
              <ClientContractList businessServices={businessServices} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceCatalogManagementPage;
