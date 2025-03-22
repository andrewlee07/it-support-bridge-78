
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageTransition from '@/components/shared/PageTransition';
import ServiceList from '@/components/services/ServiceList';
import ServiceManagement from '@/components/services/ServiceManagement';
import { ServiceWithCategory } from '@/utils/types/service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/contexts/AuthContext';
import { FilePlus, Download, PlusCircle, Server, Code, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ServiceCatalogProps {
  isAdmin?: boolean;
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ isAdmin = false }) => {
  const { services, categories, isLoading } = useServices();
  const [activeTab, setActiveTab] = useState('all');
  const [filteredServices, setFilteredServices] = useState<ServiceWithCategory[]>([]);
  const { userHasPermission } = useAuth();
  const location = useLocation();
  
  // Determine if we're in the admin configuration view based on the URL or prop
  const isAdminView = isAdmin || location.pathname.includes('/admin/service-catalogue-configuration');
  
  const canManageContent = userHasPermission('Manage Service Catalog Content') || 
                          userHasPermission('Manage Service Catalog Config');

  useEffect(() => {
    if (services) {
      if (activeTab === 'all') {
        setFilteredServices(services);
      } else if (activeTab === 'hardware') {
        setFilteredServices(services.filter(service => 
          service.category.name.toLowerCase().includes('hardware') ||
          service.category.name.toLowerCase().includes('equipment')
        ));
      } else if (activeTab === 'software') {
        setFilteredServices(services.filter(service => 
          service.category.name.toLowerCase().includes('software') ||
          service.category.name.toLowerCase().includes('application')
        ));
      } else if (activeTab === 'business') {
        setFilteredServices(services.filter(service => 
          service.category.name.toLowerCase().includes('business') ||
          service.category.name.toLowerCase().includes('service')
        ));
      }
    }
  }, [services, activeTab]);

  const handleServiceSelect = (service: ServiceWithCategory) => {
    console.log('Service selected:', service);
    // In a real application, this would navigate to a service detail page
    // or open a modal with service details
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    toast.success(`Exporting service catalog as ${type.toUpperCase()}`);
  };

  const handleAddService = () => {
    toast.info("Creating new service...");
    // In a real application, this would open a modal or navigate to a form
  };

  // Sample statistics for dashboard cards
  const totalServices = services?.length || 0;
  const hardwareServices = services?.filter(s => 
    s.category.name.toLowerCase().includes('hardware') || 
    s.category.name.toLowerCase().includes('equipment')
  ).length || 0;
  const softwareServices = services?.filter(s => 
    s.category.name.toLowerCase().includes('software') || 
    s.category.name.toLowerCase().includes('application')
  ).length || 0;
  const businessServices = services?.filter(s => 
    s.category.name.toLowerCase().includes('business') || 
    s.category.name.toLowerCase().includes('service')
  ).length || 0;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header with export and create buttons */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isAdminView ? 'Service Catalog Configuration' : 'Service Catalog'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAdminView 
                ? 'Configure and manage service catalog settings' 
                : 'Browse and request available IT services'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-secondary/50 border border-border/20 hover:bg-muted">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  Export to CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  Export to PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {canManageContent && (
              <Button onClick={handleAddService} className="bg-primary hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            )}
            
            {canManageContent && !isAdminView && <ServiceManagement />}
          </div>
        </div>
        
        {/* Dashboard Stats Cards (Only show in non-admin view) */}
        {!isAdminView && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <p className="text-sm font-medium text-muted-foreground">All Services</p>
                  <div className="text-4xl font-bold">{totalServices}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 mr-2 text-blue-500" />
                    <p className="text-sm font-medium text-muted-foreground">Hardware Services</p>
                  </div>
                  <div className="text-4xl font-bold">{hardwareServices}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <div className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-purple-500" />
                    <p className="text-sm font-medium text-muted-foreground">Software Services</p>
                  </div>
                  <div className="text-4xl font-bold">{softwareServices}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-amber-500" />
                    <p className="text-sm font-medium text-muted-foreground">Business Services</p>
                  </div>
                  <div className="text-4xl font-bold">{businessServices}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isAdminView ? (
          <ServiceManagement inServiceCatalog={false} />
        ) : (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="hardware">Hardware Services</TabsTrigger>
              <TabsTrigger value="software">Software Services</TabsTrigger>
              <TabsTrigger value="business">Business Services</TabsTrigger>
            </TabsList>
            
            <Card className="bg-secondary/50 border border-border/20">
              <TabsContent value="all" className="mt-0">
                <CardHeader>
                  <CardTitle>All Services</CardTitle>
                  <CardDescription>Browse all available IT services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceList 
                    services={filteredServices || []} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
                    onAddService={canManageContent ? handleAddService : undefined}
                  />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="hardware" className="mt-0">
                <CardHeader>
                  <CardTitle>Hardware Services</CardTitle>
                  <CardDescription>Browse all hardware and equipment services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceList 
                    services={filteredServices || []} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
                    onAddService={canManageContent ? handleAddService : undefined}
                  />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="software" className="mt-0">
                <CardHeader>
                  <CardTitle>Software Services</CardTitle>
                  <CardDescription>Browse all software and application services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceList 
                    services={filteredServices || []} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
                    onAddService={canManageContent ? handleAddService : undefined}
                  />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="business" className="mt-0">
                <CardHeader>
                  <CardTitle>Business Services</CardTitle>
                  <CardDescription>Browse all business-related services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceList 
                    services={filteredServices || []} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
                    onAddService={canManageContent ? handleAddService : undefined}
                  />
                </CardContent>
              </TabsContent>
            </Card>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default ServiceCatalog;
