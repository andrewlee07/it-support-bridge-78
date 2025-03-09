
import React, { useState } from 'react';
import PageTransition from '@/components/shared/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Upload, Download, Users } from 'lucide-react';
import ServiceList from '@/components/services/ServiceList';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/contexts/AuthContext';
import CategoriesTab from '@/components/admin/service-catalogue/CategoriesTab';
import SettingsTab from '@/components/admin/service-catalogue/SettingsTab';
import AccessManagementTab from '@/components/admin/service-catalogue/AccessManagementTab';

const ServiceCatalogueConfiguration = () => {
  const { services, categories, isLoading, error } = useServices();
  const { userHasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('services');

  const hasConfigPermission = userHasPermission('manage_service_catalog_config');

  const handleAddService = () => {
    console.log('Add service clicked');
    // Implementation for adding a service will be added in future
  };

  const handleImportServices = () => {
    console.log('Import services clicked');
    // Implementation for importing services will be added in future
  };

  const handleExportServices = () => {
    console.log('Export services clicked');
    // Implementation for exporting services will be added in future
  };

  const handleEditService = (serviceId: string) => {
    console.log('Edit service clicked', serviceId);
    // Implementation for editing a service will be added in future
  };

  if (!hasConfigPermission) {
    return (
      <PageTransition>
        <div className="container mx-auto py-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access the Service Catalogue Configuration.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service Catalogue Configuration</h1>
            <p className="text-muted-foreground mt-1">
              Configure service categories, fields, and visibility settings
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="access">Access Management</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Manage Services</CardTitle>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddService}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Service
                      </Button>
                      <Button variant="outline" onClick={handleImportServices}>
                        <Upload className="mr-2 h-4 w-4" />
                        Import
                      </Button>
                      <Button variant="outline" onClick={handleExportServices}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {services && categories ? (
                    <ServiceList 
                      services={services} 
                      categories={categories}
                      onEdit={handleEditService}
                      isLoading={isLoading}
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      {isLoading ? "Loading services..." : "No services found."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <CategoriesTab />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <SettingsTab />
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <AccessManagementTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServiceCatalogueConfiguration;
