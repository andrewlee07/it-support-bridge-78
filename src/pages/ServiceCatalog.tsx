
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

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isAdminView ? 'Service Catalog Configuration' : 'Service Catalog'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAdminView 
                ? 'Configure and manage service catalog settings' 
                : 'Browse and request available IT services'}
            </p>
          </div>
          
          {canManageContent && !isAdminView && <ServiceManagement />}
        </div>

        {isAdminView ? (
          <ServiceManagement inServiceCatalog={false} />
        ) : (
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <Card>
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
              </Card>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <Card>
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
              </Card>
            </TabsContent>
            
            <TabsContent value="new" className="mt-6">
              <Card>
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
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </PageTransition>
  );
};

export default ServiceCatalog;
