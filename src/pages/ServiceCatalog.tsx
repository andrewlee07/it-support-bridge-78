
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
import { FilePlus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ServiceCatalogProps {
  isAdmin?: boolean;
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ isAdmin = false }) => {
  const { services, categories, isLoading } = useServices();
  const [activeTab, setActiveTab] = useState('all');
  const { userHasPermission } = useAuth();
  const location = useLocation();
  
  // Determine if we're in the admin configuration view based on the URL or prop
  const isAdminView = isAdmin || location.pathname.includes('/admin/service-catalogue-configuration');
  
  const canManageContent = userHasPermission('Manage Service Catalog Content') || 
                          userHasPermission('Manage Service Catalog Config');

  const handleServiceSelect = (service: ServiceWithCategory) => {
    console.log('Service selected:', service);
    // In a real application, this would navigate to a service detail page
    // or open a modal with service details
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    toast.success(`Exporting service catalog as ${type.toUpperCase()}`);
  };

  // Sample statistics for dashboard cards
  const totalServices = services?.length || 0;
  const popularServices = 8;
  const newServices = 5;
  const myRequestedServices = 3;

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
            
            {canManageContent && !isAdminView && <ServiceManagement />}
          </div>
        </div>
        
        {/* Dashboard Stats Cards (Only show in non-admin view) */}
        {!isAdminView && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                  <div className="text-4xl font-bold">{totalServices}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <p className="text-sm font-medium text-muted-foreground">Popular Services</p>
                  <div className="text-4xl font-bold">{popularServices}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <p className="text-sm font-medium text-muted-foreground">New Services</p>
                  <div className="text-4xl font-bold">{newServices}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border border-border/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                  <p className="text-sm font-medium text-muted-foreground">My Requested</p>
                  <div className="text-4xl font-bold">{myRequestedServices}</div>
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
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="requested">My Requested</TabsTrigger>
            </TabsList>
            
            <Card className="bg-secondary/50 border border-border/20">
              <TabsContent value="all" className="mt-0">
                <CardHeader>
                  <CardTitle>Available Services</CardTitle>
                  <CardDescription>Browse all available IT services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceList 
                    services={services || []} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
                  />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                <CardHeader>
                  <CardTitle>Popular Services</CardTitle>
                  <CardDescription>Most frequently requested services</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* For demo purposes, we'll show the same service list */}
                  <ServiceList 
                    services={(services || []).slice(0, 3)} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
                  />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="new" className="mt-0">
                <CardHeader>
                  <CardTitle>New Services</CardTitle>
                  <CardDescription>Recently added services</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* For demo purposes, we'll show the same service list */}
                  <ServiceList 
                    services={(services || []).slice(0, 2)} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
                  />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="requested" className="mt-0">
                <CardHeader>
                  <CardTitle>My Requested Services</CardTitle>
                  <CardDescription>Services you have previously requested</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* For demo purposes, we'll show the same service list */}
                  <ServiceList 
                    services={(services || []).slice(0, 1)} 
                    categories={categories || []}
                    onSelect={handleServiceSelect}
                    isLoading={isLoading}
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
