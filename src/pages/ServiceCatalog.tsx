
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { useServices } from '@/hooks/useServices';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceList from '@/components/services/ServiceList';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import ServiceCatalogManagerModal from '@/components/services/ServiceCatalogManagerModal';

const ServiceCatalog = () => {
  const { services, categories, isLoading, error } = useServices();
  const { userHasPermission } = useAuth();
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  
  const hasContentPermission = userHasPermission('manage_service_catalog_content');

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Service Catalog</h1>
              <p className="text-muted-foreground mt-1">
                Browse and request available services
              </p>
            </div>
            
            {hasContentPermission && (
              <Button variant="outline" onClick={() => setIsManagerModalOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Manage Services
              </Button>
            )}
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Services</TabsTrigger>
              {categories?.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Services</CardTitle>
                  <CardDescription>Browse all available services</CardDescription>
                </CardHeader>
                <CardContent>
                  {services ? (
                    <ServiceList services={services} isLoading={isLoading} />
                  ) : (
                    <p className="text-muted-foreground">
                      {isLoading ? "Loading services..." : "No services found."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {categories?.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {services ? (
                      <ServiceList 
                        services={services.filter(service => service.categoryId === category.id)} 
                        isLoading={isLoading} 
                      />
                    ) : (
                      <p className="text-muted-foreground">
                        {isLoading ? "Loading services..." : "No services found in this category."}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {hasContentPermission && (
          <ServiceCatalogManagerModal 
            isOpen={isManagerModalOpen} 
            setIsOpen={setIsManagerModalOpen} 
            services={services || []}
            categories={categories || []}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default ServiceCatalog;
